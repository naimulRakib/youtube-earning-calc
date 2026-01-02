'use server';

import { supabase } from "../lib/supabase";
import zoneData from "../data/zones.json";
import diseaseList from "../data/diseases.json";
import remedyList from "../data/remedies.json";
import suitabilityData from "../data/crop_suitability.json";

// ---------------------------------------------------------
// HELPER: DETERMINE BANGLADESH CROP SEASON
// ---------------------------------------------------------
function getCurrentSeason(): string {
  const month = new Date().getMonth() + 1; // Returns 1-12
  
  // Boro Season (Winter/Dry): November to March
  if (month >= 11 || month <= 3) return "Boro";
  
  // Aus Season (Pre-Monsoon): April to June
  if (month >= 4 && month <= 6) return "Aus";
  
  // Aman Season (Monsoon/Rainy): July to October
  if (month >= 7 && month <= 10) return "Aman";
  
  return "Unknown";
}

// ---------------------------------------------------------
// TYPE DEFINITIONS
// ---------------------------------------------------------
interface AnalysisInput {
  imageUrl: string;
  lat: number;
  lon: number;
  manualInputs: {
    sprayed_recently?: string;  // "yes" | "no"
    fertilizer_used?: string;   // "urea" | "potash" | "none"
    soil_smell?: string;        // "rotten" | "normal"
    zone_key?: string;          // "dhaka-savar" etc.
    crop_stage?: string;        // "seedling" | "vegetative" | "flowering" | "ripening"
  };
  weatherContext: {
    humidity: number;
    windSpeed: number;
    temp?: number;
  };
}

// ---------------------------------------------------------
// MAIN ANALYSIS ACTION
// ---------------------------------------------------------
export async function analyzeCropHealth({ 
  imageUrl, 
  lat, 
  lon, 
  manualInputs, 
  weatherContext 
}: AnalysisInput) {
  
  const API_KEY = process.env.GEMINI_API_KEY;
  if (!API_KEY) {
    return { success: false, error: "Server Configuration Error: Missing API Key" };
  }

  try {
    // 1. CONTEXT CONSTRUCTION
    // -----------------------------------------------------
    // Get Static Data (Zone Info)
    const userZoneKey = manualInputs.zone_key || "dhaka-savar";
    // @ts-ignore
    const zoneInfo = zoneData[userZoneKey];
    
    // Get Temporal Data (Season)
    const currentSeason = getCurrentSeason();

    // 2. GET UNSUITABLE CROPS FOR THIS ZONE
    // -----------------------------------------------------
    // @ts-ignore
    const zoneSuitability = suitabilityData[userZoneKey];
    const unsuitableCropsText = zoneSuitability 
      ? zoneSuitability.unsuitable_crops.map((c: any) => c.crop_names.join(", ")).join(", ")
      : "None";

    // 3. THE "OMNI-FILTER" LOGIC ENGINE
    // -----------------------------------------------------
    
    let possibleCauses = diseaseList.filter((disease: any) => {
      let isPossible = true;
      const reqs = disease.required_conditions || {};

      // A. SEASON CHECK 📅
      if (reqs.season && Array.isArray(reqs.season) && !reqs.season.includes(currentSeason)) {
        isPossible = false;
      }

      // B. WEATHER CHECK (HUMIDITY) ☁️
      if (reqs.humidity_min && weatherContext.humidity < (reqs.humidity_min - 15)) {
        isPossible = false;
      }

      // C. ZONE & INDUSTRY CHECK 🏭
      if (disease.id === "abiotic_so2_injury") {
        const hasBrickKiln = zoneInfo?.industrial_hotspots?.some((h: any) => h.type.includes("Brick"));
        if (!hasBrickKiln) isPossible = false;
      }

      // D. CROP STAGE CHECK 🌱
      if (disease.id === "biotic_false_smut" && manualInputs.crop_stage === "seedling") {
        isPossible = false;
      }

      // E. MANUAL HISTORY OVERRIDE 🚜
      if (manualInputs.sprayed_recently === "yes" && disease.type.includes("Biotic")) {
        isPossible = false; 
      }

      return isPossible;
    });

    // FALLBACK
    if (possibleCauses.length === 0) {
      console.warn("⚠️ All diseases filtered out by logic. Falling back to full list.");
      possibleCauses = diseaseList;
    }

    // 4. ADVANCED PROMPT ENGINEERING
    // -----------------------------------------------------
    
    // Pre-calculate risk string to force AI to see "None" clearly
    const industrialRisks = zoneInfo?.industrial_hotspots?.map((h: any) => h.type).join(", ") || "None";

    // Construct Visual Hints
    const visualGuides = possibleCauses.map((c: any) => 
      `- ${c.name} (ID: ${c.id}): Look for [Shape: ${c.visual_signature?.shape}, Color: ${c.visual_signature?.color}, Location: ${c.visual_signature?.location}]`
    ).join("\n");

    const promptText = `
      ACT AS: Expert Agro-Pathologist (PhD level).
      
      --- 1. ENVIRONMENTAL CONTEXT ---
      - Zone: ${zoneInfo?.zone_name} 
      - Season: ${currentSeason}
      - Weather: Humidity ${weatherContext.humidity}%, Wind ${weatherContext.windSpeed}km/h
      - Industrial Risks (Factories/Kilns): "${industrialRisks}" 
        (CRITICAL NOTE: If Industrial Risks is "None", you CANNOT diagnose Industrial Pollution/SO2 Injury).
      
      --- 2. CROP SUITABILITY WARNING ---
      The following crops CANNOT grow here: [${unsuitableCropsText}].
      
      --- 3. FARMER'S GROUND TRUTH ---
      - Sprayed Chemicals Recently: ${manualInputs.sprayed_recently}
      - Fertilizer History: ${manualInputs.fertilizer_used} 
        (Note: 'urea_yesterday' implies huge spike in Nitrogen, leading to chemical burn).
      - Soil Smell: ${manualInputs.soil_smell}

      --- 4. VISUAL GUIDES ---
      ${visualGuides}

      --- 5. STRICT DEDUCTION LOGIC (Follow this Order) ---
      1. **CROP CHECK:** If image shows a crop listed in "Unsuitable Crops", immediately return diagnosis_id: "wrong_crop_choice".
      2. **FERTILIZER RULE:** IF Fertilizer History is 'urea_yesterday' AND visual shows Tip Burn/Yellowing -> DIAGNOSE "Nitrogen Fertilizer Burn" (abiotic_nitrogen_burn).
      3. **POLLUTION RULE:** IF Industrial Risks is "None" -> DO NOT choose "SO2 Injury" or "Industrial Pollution", even if visuals look similar.
      4. **SMELL RULE:** IF Soil Smell is Rotten -> Bias strongly towards "Root Rot".
      5. **SPRAY RULE:** IF Farmer Sprayed Recently -> Bias towards "Chemical Burn" (over Biotic diseases).
      6. **DEFAULT:** Match remaining symptoms to the Visual Guides.

      --- 6. OUTPUT ---
      Return ONLY valid JSON.
      { 
        "diagnosis_id": "Exact ID from list OR 'wrong_crop_choice'", 
        "confidence": number (0-100), 
        "visual_reasoning": "Explain your decision based on the Rules above." 
      }
    `;

    // 5. EXECUTION (GEMINI API)
    // -----------------------------------------------------
    
    // Fetch image from Supabase public URL
    const imageResp = await fetch(imageUrl);
    if (!imageResp.ok) throw new Error("Failed to fetch image from URL");
    const arrayBuffer = await imageResp.arrayBuffer();
    const base64Image = Buffer.from(arrayBuffer).toString("base64");

    // ✅ NOTE: Using 2.5-flash as requested
    const modelName = "gemini-2.5-flash"; 
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${API_KEY}`;

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{
          parts: [
            { text: promptText },
            { inline_data: { mime_type: "image/jpeg", data: base64Image } }
          ]
        }],
        generationConfig: { 
          response_mime_type: "application/json",
          maxOutputTokens: 4000 // ✅ High limit to prevent JSON cutoff
        }
      })
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`Gemini API Error: ${response.status} - ${errorBody}`);
    }

    const aiData = await response.json();
    
    if (!aiData.candidates || aiData.candidates.length === 0) {
      throw new Error("AI returned empty data.");
    }

    const textOutput = aiData.candidates[0].content.parts[0].text;

    // ✅ ROBUST JSON PARSING (Fixes "Unexpected token" errors)
    let resultJson;
    try {
      // Find the JSON object inside the text
      const jsonMatch = textOutput.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        resultJson = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("No JSON found in response");
      }
    } catch (e) {
      console.error("JSON Parse Failed. Raw Text:", textOutput);
      throw new Error("AI response format failed.");
    }

    console.log("✅ Diagnosis:", resultJson.diagnosis_id);

    // 6. DATA MERGING & SAVE
    // -----------------------------------------------------
    
    // ✅ FIX APPLIED HERE: Added ': any' to prevent implicit type error
    let diseaseDetails: any, remedyDetails: any;

    if (resultJson.diagnosis_id === "wrong_crop_choice") {
      diseaseDetails = { name: "Unsuitable Crop Selection", type: "Management Error" };
      remedyDetails = {
        title: "⛔ Wrong Crop for this Zone",
        smart_script: {
          headline: `This crop is not suitable for ${zoneInfo?.zone_name}.`,
          action_steps: ["Harvest immediately.", "Check Crop Calendar.", "Switch to suitable crops."]
        }
      };
    } else {
      // @ts-ignore
      diseaseDetails = diseaseList.find(d => d.id === resultJson.diagnosis_id);
      // @ts-ignore
      remedyDetails = remedyList.find(r => r.id === diseaseDetails?.remedy_id);
    }

    // Async Save to Supabase (Logging)
    supabase.from('community_reports').insert({
      zone_name: zoneInfo?.zone_name || "Unknown",
      diagnosis_id: resultJson.diagnosis_id,
      confidence: resultJson.confidence,
      visual_reasoning: resultJson.visual_reasoning,
      image_url: imageUrl,
      created_at: new Date()
    }).then(({ error }) => {
      if (error) console.error("DB Save Error:", error.message);
    });

    return {
      success: true,
      data: {
        ...resultJson,
        disease_info: diseaseDetails,
        remedy: remedyDetails
      }
    };

  } catch (error: any) {
    console.error("Analysis Error:", error);
    return { 
      success: false, 
      error: error.message || "Unknown analysis error occurred." 
    };
  }
}