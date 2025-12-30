'use server';

import { zoneData } from "../data/zones";
import { supabase } from "../lib/supabase";

// ⚠️ মনে রাখবেন: প্রোডাকশনে API Key এনভায়রনমেন্ট ভেরিয়েবল (process.env) থেকে নেওয়া উচিত
const API_KEY = "AIzaSyAzCodtoOtWYlU7kUCPU-BWHf4qOZUylLE"; 

export async function analyzeCropHealth(
  imageBase64: string,
  userLocation: string,
  neighborReport: string,
  imageUrl: string // ✅ ছবির পাবলিক লিংক
) {
  // ১. জোন ডাটা লোড
  // @ts-ignore
  const currentZone = zoneData[userLocation] || zoneData["dhaka-savar"];

  // ২. প্রম্পট তৈরি (Gemini 2.0 এর জন্য অপটিমাইজড)
  const promptText = `
    You are an AI Agro-Expert using Gemini 2.0 Pro. Analyze this crop image for disease or environmental stress.
    
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

  // ৩. Gemini 2.0 API কল
  // 🔄 মডেল পরিবর্তন: gemini-1.5-flash -> gemini-2.0-pro-exp-02-05 (অথবা gemini-2.0-flash-exp)
  const modelName = "gemini-2.5-flash-preview-09-2025"; 
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${API_KEY}`;

  const requestBody = {
    contents: [{
      parts: [
        { text: promptText },
        { inline_data: { mime_type: "image/jpeg", data: imageBase64 } }
      ]
    }],
    // Gemini 2.0 JSON মোড আরও ভালো সাপোর্ট করে
    generationConfig: { 
      response_mime_type: "application/json",
      temperature: 0.4 // একটু কম টেম্পারেচার একুরেসি বাড়ায়
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
    
    // সেফটি চেক: ক্যান্ডিডেট আছে কিনা দেখা
    if (!data.candidates || data.candidates.length === 0) {
      throw new Error("No analysis returned from Gemini.");
    }

    const textOutput = data.candidates[0].content.parts[0].text;
    
    // ক্লিনআপ (মাঝেমধ্যে মডেল ```json ব্লক দেয়)
    const cleanedText = textOutput.replace(/```json|```/g, "").trim();
    const resultJson = JSON.parse(cleanedText);

    console.log("✅ AI Analysis Done:", resultJson.diagnosis_id);

    // ৪. ডাটাবেসে সেভ করা (ছবির লিংক সহ)
    const { error } = await supabase
      .from('community_reports')
      .insert({
        zone_name: userLocation,
        diagnosis_id: resultJson.diagnosis_id,
        confidence: resultJson.confidence,
        visual_reasoning: resultJson.visual_reasoning,
        image_url: imageUrl // ✅ ছবির লিংক ডাটাবেসে যাচ্ছে
      });

    if (error) console.error("❌ DB Save Failed:", error.message);
    else console.log("🎉 Report & Image Saved to DB!");

    return { success: true, data: resultJson };

  } catch (error: any) {
    console.error("❌ Analysis Error:", error.message);

    // ফলব্যাক/ডেমো মোড (নেটওয়ার্ক বা কোটা এরর হলে)
    return {
      success: true, // ইউজার এক্সপেরিয়েন্স ঠিক রাখতে true রাখা হলো
      data: {
        diagnosis_id: "unknown_stress",
        confidence: 0,
        visual_reasoning: "System fallback: Unable to verify image at this moment. Please try again."
      }
    };
  }
}