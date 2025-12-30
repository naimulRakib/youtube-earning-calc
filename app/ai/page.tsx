'use client';

import { useState } from 'react';
import Image from 'next/image';
import { analyzeCropHealth } from "../actions/analyze";
import { remedies } from "../data/remedies";
import { zoneData } from "../data/zones";
import { supabase } from "../lib/supabase"; // Supabase Client ইমপোর্ট

export default function AnalysisPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [location, setLocation] = useState<string>("dhaka-savar");
  const [isLoading, setIsLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState(""); // লোডিং স্ট্যাটাস দেখানোর জন্য
  const [result, setResult] = useState<any>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setResult(null);
    }
  };

  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve((reader.result as string).split(',')[1]);
      reader.onerror = error => reject(error);
    });
  };

  const handleScan = async () => {
    if (!selectedFile) {
      alert("⚠️ দয়া করে আগে পাতার একটি ছবি দিন।");
      return;
    }

    setIsLoading(true);
    setResult(null);

    try {
      // ---------------------------------------------------------
      // ধাপ ১: SUPABASE STORAGE-এ ছবি আপলোড করা
      // ---------------------------------------------------------
      setStatusMsg("Uploading Image to Cloud... ☁️");
      
      const fileName = `${Date.now()}_${selectedFile.name}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('crop_scans') // তোমার বাকেটের নাম
        .upload(fileName, selectedFile);

      if (uploadError) throw new Error("Upload Failed: " + uploadError.message);

      // ছবির পাবলিক লিংক বের করা
      const { data: { publicUrl } } = supabase.storage
        .from('crop_scans')
        .getPublicUrl(fileName);

      console.log("Image Uploaded:", publicUrl);

      // ---------------------------------------------------------
      // ধাপ ২: GEMINI AI বিশ্লেষণ (Base64 + URL পাঠানো)
      // ---------------------------------------------------------
      setStatusMsg("AI analyzing disease... 🤖");
      
      const base64Image = await convertFileToBase64(selectedFile);

      const apiResponse = await analyzeCropHealth(
        base64Image,
        location,
        "High dust reported",
        publicUrl // ✅ নতুন: আমরা ছবির লিংকও পাঠাচ্ছি ডাটাবেসে সেভ করার জন্য
      );

      // ---------------------------------------------------------
      // ধাপ ৩: রেজাল্ট দেখানো
      // ---------------------------------------------------------
      if (apiResponse.success) {
        const aiData = apiResponse.data;
        // @ts-ignore
        const matchedRemedy = remedies.find((r: any) => r.id === aiData.diagnosis_id);

        setResult({
          title: matchedRemedy ? matchedRemedy.title : "অজানা সমস্যা",
          type: matchedRemedy ? "Verified Solution ✅" : "AI Suggestion 🤖",
          action: matchedRemedy ? matchedRemedy.action : "কৃষি অফিসে যোগাযোগ করুন।",
          confidence: aiData.confidence || 85,
          reasoning: aiData.visual_reasoning,
          isRemedyFound: !!matchedRemedy
        });
      } else {
        alert("Server Error: বিশ্লেষণ করা সম্ভব হয়নি।");
      }

    } catch (error: any) {
      console.error("Error:", error);
      alert("Error: " + error.message);
    } finally {
      setIsLoading(false);
      setStatusMsg("");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-green-700 mb-4">AgroSentinel AI</h1>
      
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
        {/* লোকেশন সিলেক্ট */}
        <select 
          value={location} 
          onChange={(e) => setLocation(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
        >
          {Object.keys(zoneData).map((k) => <option key={k} value={k}>{k}</option>)}
        </select>

        {/* ইমেজ আপলোড */}
        <input type="file" accept="image/*" onChange={handleFileChange} className="mb-4" />
        
        {/* প্রিভিউ */}
        {previewUrl && (
          <img src={previewUrl} alt="Preview" className="w-full h-48 object-cover rounded mb-4" />
        )}

        {/* বাটন + লোডিং টেক্সট */}
        <button 
          onClick={handleScan} 
          disabled={isLoading}
          className="w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 disabled:bg-gray-400"
        >
          {isLoading ? statusMsg : "Scan & Analyze"}
        </button>
      </div>

      {/* রেজাল্ট কার্ড */}
      {result && (
        <div className="mt-6 w-full max-w-md bg-white p-5 rounded-xl border-l-4 border-green-500 shadow">
          <h2 className="text-xl font-bold">{result.title}</h2>
          <p className="text-sm text-gray-500 mt-1">Diagnosis Confidence: {result.confidence}%</p>
          <div className="bg-gray-100 p-2 rounded mt-2 text-sm italic">"{result.reasoning}"</div>
          <div className="mt-3 text-green-800 font-semibold">💡 পরামর্শ: {result.action}</div>
        </div>
      )}
    </div>
  );
}