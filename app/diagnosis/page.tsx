'use client';

import { useState } from 'react';
import { supabase } from '../lib/supabase'; //Ensure this points to your supabase client setup
import { fetchWeather } from "@/utils/weatherApi";
import { analyzeCropHealth } from "../actions/analyze"; // Import Server Action directly
import { 
  Camera, MapPin, CheckCircle, AlertTriangle, 
  Loader2, Leaf, Beaker, Sprout 
} from "lucide-react";

// Zone options for the dropdown
const ZONES = [
  { id: "dhaka-savar", name: "Savar (Industrial Hub)" },
  { id: "sylhet-region", name: "Sylhet (Tea/Stone Zone)" },
  { id: "cumilla-burichang", name: "Burichang (Floodplain)" },
  { id: "khulna-coastal", name: "Khulna (Saline Zone)" },
  { id: "bogura-agro", name: "Bogura (Vegetable Hub)" }
];

export default function DiagnosisPage() {
  // --- STATE MANAGEMENT ---
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");
  
  // Data States
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  
  // Default location (Savar)
  const [location, setLocation] = useState({ 
    lat: 23.78, 
    lon: 90.27, 
    zone_key: "dhaka-savar" 
  }); 

  const [manualInputs, setManualInputs] = useState({
    sprayed_recently: "no",
    fertilizer_used: "none",
    soil_smell: "normal"
  });
  
  const [result, setResult] = useState<any>(null);

  // --- HANDLERS ---

  // 1. File Selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  // 2. GPS Auto-Detect
  const handleGPS = () => {
    setStatusMsg("Detecting location...");
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition((pos) => {
      // In a real app, you would use a function to find the nearest zone_key based on these coords
      // For now, we update lat/lon but keep the selected zone or default to Savar
      setLocation(prev => ({
        ...prev,
        lat: pos.coords.latitude,
        lon: pos.coords.longitude
      }));
      setStatusMsg("");
      alert(`Location updated: ${pos.coords.latitude.toFixed(8)}, ${pos.coords.longitude.toFixed(8)}`);
    }, (err) => {
      console.error(err);
      alert("GPS access denied. Using default location.");
      setStatusMsg("");
    });
  };

  // 3. The Main Analysis Function
  const runAnalysis = async () => {
    if (!imageFile) return;
    setLoading(true);

    try {
      // A. Upload to Supabase Storage
      setStatusMsg("Uploading Image... ☁️");
      
      // Generate unique filename
      const fileName = `${Date.now()}_${imageFile.name.replace(/[^a-zA-Z0-9.]/g, '')}`;
      
      const { error: uploadError } = await supabase.storage
        .from('uploads') // Ensure this bucket exists and is Public
        .upload(fileName, imageFile);

      if (uploadError) throw new Error("Upload Failed: " + uploadError.message);

      // Get Public URL
      const { data: { publicUrl } } = supabase.storage
        .from('uploads')
        .getPublicUrl(fileName);

      if (!publicUrl) throw new Error("Could not get public image URL");

      // B. Get Real-time Weather
      setStatusMsg("Fetching Weather Data... 🌦️");
      const weather = await fetchWeather(location.lat, location.lon);
      
      // Fallback if weather API fails
      const weatherContext = weather || {
        temperature: 30,
        humidity: 80, // High humidity default (safer for disease check)
        windSpeed: 5,
        windDirection: 0,
        rain: 0,
        soilMoisture: 0
      };

      // C. Call Server Action (The "Brain")
      setStatusMsg("AI Diagnosing... 🧠");
      
      const response = await analyzeCropHealth({
        imageUrl: publicUrl,
        lat: location.lat,
        lon: location.lon,
        manualInputs: {
          ...manualInputs,
          zone_key: location.zone_key
        },
        weatherContext: {
          humidity: weatherContext.humidity,
          windSpeed: weatherContext.windSpeed
        }
      });

      if (response.success) {
        setResult(response.data);
        setStep(3); // Move to Result View
      } else {
        throw new Error(response.error || "Analysis failed");
      }

    } catch (error: any) {
      console.error(error);
      alert("Error: " + error.message);
    } finally {
      setLoading(false);
      setStatusMsg("");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 font-sans flex flex-col items-center">
      
      {/* HEADER */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-green-800 flex items-center justify-center gap-2">
          <Sprout className="w-8 h-8" /> AgroSentinel AI
        </h1>
        <p className="text-slate-500">Intelligent Crop Disease & Pollution Detector</p>
      </div>

      {/* --- STEP 1: UPLOAD & LOCATION --- */}
      {step === 1 && (
        <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md border-t-4 border-green-500 animate-in fade-in zoom-in duration-300">
          <h2 className="text-xl font-bold mb-4 text-slate-800">1. Upload Evidence</h2>
          
          {/* Image Input */}
          <div className="border-2 border-dashed border-green-200 rounded-lg p-6 flex flex-col items-center justify-center mb-4 bg-green-50 hover:bg-green-100 transition cursor-pointer relative overflow-hidden group">
            <input type="file" accept="image/*" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer z-10" />
            {previewUrl ? (
              <img src={previewUrl} alt="Preview" className="h-48 w-full object-cover rounded" />
            ) : (
              <>
                <div className="bg-white p-4 rounded-full shadow-sm mb-3 group-hover:scale-110 transition">
                  <Camera className="w-8 h-8 text-green-600" />
                </div>
                <span className="text-sm text-green-700 font-medium">Tap to take photo</span>
              </>
            )}
          </div>

          {/* Location Selection */}
          <div className="mb-6">
            <label className="text-sm font-semibold text-slate-600 mb-1 block">Select Your Region</label>
            <div className="flex gap-2">
              <select 
                className="flex-1 p-2.5 border border-slate-300 rounded-lg bg-white text-sm focus:ring-2 focus:ring-green-500 outline-none"
                value={location.zone_key}
                onChange={(e) => setLocation({...location, zone_key: e.target.value})}
              >
                {ZONES.map((zone) => (
                  <option key={zone.id} value={zone.id}>{zone.name}</option>
                ))}
              </select>
              <button 
                onClick={handleGPS} 
                className="p-2.5 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition" 
                title="Detect GPS"
              >
                <MapPin className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-slate-400 mt-1 pl-1">
              Current Coords: {location.lat.toFixed(2)}, {location.lon.toFixed(2)}
            </p>
          </div>

          <button 
            onClick={() => setStep(2)} 
            disabled={!imageFile}
            className="w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition shadow-md"
          >
            Next: Verify Details
          </button>
        </div>
      )}

      {/* --- STEP 2: MANUAL INPUT (The "Ground Truth") --- */}
      {step === 2 && (
        <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md border-t-4 border-blue-500 animate-in slide-in-from-right duration-300">
          <h2 className="text-xl font-bold mb-2 text-slate-800">2. Verify History</h2>
          <p className="text-sm text-slate-500 mb-6">Help the AI filter out wrong guesses.</p>

          {/* Q1: Spray History */}
          <div className="mb-5">
            <label className="block font-semibold text-slate-700 mb-2 flex items-center gap-2 text-sm">
              <Beaker className="w-4 h-4 text-purple-500" /> Did you spray recently?
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={() => setManualInputs({...manualInputs, sprayed_recently: "yes"})}
                className={`p-3 rounded-lg border text-sm font-medium transition ${manualInputs.sprayed_recently === "yes" ? "bg-purple-100 border-purple-500 text-purple-700 shadow-sm" : "bg-slate-50 border-slate-200 hover:bg-slate-100"}`}
              >
                Yes (Last 48h)
              </button>
              <button 
                onClick={() => setManualInputs({...manualInputs, sprayed_recently: "no"})}
                className={`p-3 rounded-lg border text-sm font-medium transition ${manualInputs.sprayed_recently === "no" ? "bg-purple-100 border-purple-500 text-purple-700 shadow-sm" : "bg-slate-50 border-slate-200 hover:bg-slate-100"}`}
              >
                No
              </button>
            </div>
          </div>

          {/* Q2: Fertilizer */}
          <div className="mb-5">
            <label className="block font-semibold text-slate-700 mb-2 flex items-center gap-2 text-sm">
              <Leaf className="w-4 h-4 text-green-500" /> Last Fertilizer?
            </label>
            <select 
              className="w-full p-2.5 border border-slate-300 rounded-lg bg-white text-sm focus:ring-2 focus:ring-green-500 outline-none"
              value={manualInputs.fertilizer_used}
              onChange={(e) => setManualInputs({...manualInputs, fertilizer_used: e.target.value})}
            >
              <option value="none">More than 10 days ago</option>
              <option value="urea_yesterday">Urea (Yesterday)</option>
              <option value="potash">Potash/Zinc</option>
            </select>
          </div>

          {/* Q3: Soil Smell */}
          <div className="mb-6">
            <label className="block font-semibold text-slate-700 mb-2 flex items-center gap-2 text-sm">
              <AlertTriangle className="w-4 h-4 text-orange-500" /> Soil/Water Smell?
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={() => setManualInputs({...manualInputs, soil_smell: "rotten"})}
                className={`p-3 rounded-lg border text-sm font-medium transition ${manualInputs.soil_smell === "rotten" ? "bg-orange-100 border-orange-500 text-orange-700 shadow-sm" : "bg-slate-50 border-slate-200 hover:bg-slate-100"}`}
              >
                Rotten/Sulfur
              </button>
              <button 
                onClick={() => setManualInputs({...manualInputs, soil_smell: "normal"})}
                className={`p-3 rounded-lg border text-sm font-medium transition ${manualInputs.soil_smell === "normal" ? "bg-orange-100 border-orange-500 text-orange-700 shadow-sm" : "bg-slate-50 border-slate-200 hover:bg-slate-100"}`}
              >
                Normal
              </button>
            </div>
          </div>

          <button 
            onClick={runAnalysis} 
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition flex justify-center items-center gap-2 shadow-md disabled:opacity-70 disabled:cursor-wait"
          >
            {loading ? <><Loader2 className="animate-spin w-5 h-5"/> {statusMsg}</> : "Run Diagnosis"}
          </button>
        </div>
      )}

      {/* --- STEP 3: RESULT DISPLAY --- */}
      {step === 3 && result && (
        <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in duration-300">
          
          {/* Diagnosis Header */}
          <div className={`p-6 text-white text-center ${result.type?.includes("Abiotic") ? "bg-orange-600" : "bg-red-600"}`}>
            <div className="uppercase text-xs font-bold tracking-wider opacity-80 mb-1">AI Diagnosis</div>
            <h2 className="text-2xl font-bold">{result.diagnosis_id.replace(/_/g, " ").toUpperCase()}</h2>
            <div className="flex justify-center items-center gap-2 mt-3">
              <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm border border-white/30">
                Confidence: {result.confidence}%
              </span>
              <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm border border-white/30">
                {result.type || "Analysed"}
              </span>
            </div>
          </div>

          <div className="p-6">
            {/* Reasoning Box */}
            <div className="mb-6 bg-slate-50 p-4 rounded-lg border border-slate-200">
              <h3 className="font-bold text-slate-800 text-sm mb-2 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" /> AI Reasoning
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed italic">
                "{result.visual_reasoning}"
              </p>
            </div>

            {/* Smart Remedy */}
            {result.remedy ? (
              <div className="bg-green-50 p-5 rounded-lg border border-green-200 shadow-sm">
                <h3 className="font-bold text-green-800 mb-3 flex items-center gap-2">
                  <Sprout className="w-5 h-5" /> Recommended Action
                </h3>
                
                {/* Headline */}
                <div className="font-bold text-slate-800 mb-3 text-sm">{result.remedy.smart_script.headline}</div>
                
                {/* Steps */}
                <ul className="space-y-3">
                  {result.remedy.smart_script.action_steps.map((step: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-slate-700 bg-white p-3 rounded border border-green-100 shadow-sm">
                      <span className="bg-green-100 text-green-800 w-5 h-5 flex items-center justify-center rounded-full text-xs font-bold shrink-0 border border-green-200">
                        {idx + 1}
                      </span>
                      <span className="leading-tight">{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="p-4 bg-yellow-50 text-yellow-800 text-sm rounded border border-yellow-200">
                ⚠️ No specific remedy found in database. Please consult a local expert.
              </div>
            )}

            <button 
              onClick={() => { setStep(1); setResult(null); setImageFile(null); setPreviewUrl(null); }}
              className="w-full mt-6 py-3 border-2 border-slate-200 rounded-lg text-slate-600 font-bold hover:bg-slate-50 transition"
            >
              Analyze Another Crop
            </button>
          </div>
        </div>
      )}

    </div>
  );
}