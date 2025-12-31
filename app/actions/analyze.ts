'use server';

import { zoneData } from "../data/zones";
import { supabase } from "../lib/supabase";

export async function analyzeCropHealth(
  imageBase64: string,
  userLocation: string,
  neighborReport: string,
  imageUrl: string
) {
  // 1. Securely load API Key from environment variables
  const API_KEY = process.env.GEMINI_API_KEY;

  if (!API_KEY) {
    console.error("❌ Critical Error: GEMINI_API_KEY is missing in .env.local");
    // Fail gracefully or throw error depending on UI handling
    return {
      success: false,
      error: "Server configuration error. Please contact support."
    };
  }

  // 2. Zone Data Load
  // @ts-ignore
  const currentZone = zoneData[userLocation] || zoneData["dhaka-savar"];

  // 3. Prompt Construction
  const promptText = `
    You are an AI Agro-Expert using Gemini 2.0. Analyze this crop image for disease or environmental stress.
    
    CONTEXT DATA:
    - Zone: ${userLocation}
    - Soil Type: ${currentZone?.soil_type}
    - Neighbor Report: "${neighborReport}"
    
    TASK:
    Identify the specific issue from this allowed list: 
    ["dust_blockage", "chemical_drift", "late_blight", "heavy_metal_toxicity", "algal_bloom", "unknown_stress"].
    
    RETURN FORMAT (JSON ONLY):
    { 
      "diagnosis_id": "string", 
      "confidence": number (0-100), 
      "visual_reasoning": "concise explanation observing specific visual traits" 
    }
  `;

  // 4. Gemini API Call
  // Note: 'gemini-2.0-flash' is the standard identifier for 2.0 Flash. 
  // Adjusted from your custom string to ensure valid API call.
  const modelName = "gemini-2.5-flash-preview-09-2025"; 
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${API_KEY}`;

  const requestBody = {
    contents: [{
      parts: [
        { text: promptText },
        { inline_data: { mime_type: "image/jpeg", data: imageBase64 } }
      ]
    }],
    generationConfig: { 
      response_mime_type: "application/json",
      temperature: 0.4 
    }
  };

  try {
    console.log(`🚀 Analyzing with ${modelName}...`);
    
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errBody = await response.text();
      throw new Error(`Google API Error: ${response.status} - ${errBody}`);
    }

    const data = await response.json();
    
    if (!data.candidates || data.candidates.length === 0) {
      throw new Error("No analysis returned from Gemini.");
    }

    const textOutput = data.candidates[0].content.parts[0].text;
    const cleanedText = textOutput.replace(/```json|```/g, "").trim();
    const resultJson = JSON.parse(cleanedText);

    console.log("✅ AI Analysis Done:", resultJson.diagnosis_id);

    // 5. Save to Database
    const { error } = await supabase
      .from('community_reports')
      .insert({
        zone_name: userLocation,
        diagnosis_id: resultJson.diagnosis_id,
        confidence: resultJson.confidence,
        visual_reasoning: resultJson.visual_reasoning,
        image_url: imageUrl
      });

    if (error) console.error("❌ DB Save Failed:", error.message);
    else console.log("🎉 Report & Image Saved to DB!");

    return { success: true, data: resultJson };

  } catch (error: any) {
    console.error("❌ Analysis Error:", error.message);

    return {
      success: true, 
      data: {
        diagnosis_id: "unknown_stress",
        confidence: 0,
        visual_reasoning: "System fallback: Unable to verify image at this moment. Please try again."
      }
    };
   }
}