"use client";

import { useState } from "react";
import { fetchWeather, WeatherData } from "@/utils/weatherApi";
import { 
  MapPin, 
  Search, 
  Loader2, 
  Thermometer, 
  Wind, 
  Droplets, 
  CloudRain, 
  Sun, 
  Sprout, 
  AlertTriangle 
} from "lucide-react";

export default function WeatherTestPage() {
  // Default coordinates (Burichang, Comilla)
  const [lat, setLat] = useState<string>("23.55");
  const [lon, setLon] = useState<string>("91.12");
  const [loading, setLoading] = useState(false);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string>("");

  // Handler: Manual Fetch
  const handleFetch = async () => {
    if (!lat || !lon) {
      setError("Please enter valid coordinates.");
      return;
    }
    setError("");
    setLoading(true);
    const data = await fetchWeather(parseFloat(lat), parseFloat(lon));
    if (data) {
      setWeather(data);
    } else {
      setError("Failed to fetch weather data. Check your connection.");
    }
    setLoading(false);
  };

  // Handler: GPS Auto-Detect
  const handleGPS = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }
    setLoading(true);
    setError("");
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const uLat: any = position.coords.latitude;
        const uLon : any= position.coords.longitude;
        setLat(uLat);
        setLon(uLon);
        const data = await fetchWeather(position.coords.latitude, position.coords.longitude);
        setWeather(data);
        setLoading(false);
      },
      (err) => {
        console.error(err);
        setError("Unable to retrieve location. Allow GPS access.");
        setLoading(false);
      }
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 font-sans flex flex-col items-center">
      <div className="max-w-3xl w-full space-y-6">
        
        {/* --- Header & Controls --- */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h1 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
            🌾 AgroSentinel Live Weather
          </h1>
          
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex gap-2 flex-1">
              <input 
                type="number" 
                value={lat} 
                onChange={(e) => setLat(e.target.value)} 
                className="flex-1 p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none transition" 
                placeholder="Latitude" 
              />
              <input 
                type="number" 
                value={lon} 
                onChange={(e) => setLon(e.target.value)} 
                className="flex-1 p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none transition" 
                placeholder="Longitude" 
              />
            </div>
            
            <div className="flex gap-2">
              <button 
                onClick={handleFetch} 
                disabled={loading}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition flex items-center justify-center gap-2 min-w-[120px]"
              >
                {loading ? <Loader2 className="animate-spin w-4 h-4" /> : <Search className="w-4 h-4" />} 
                Analyze
              </button>
              
              <button 
                onClick={handleGPS} 
                disabled={loading}
                className="bg-blue-100 text-blue-700 hover:bg-blue-200 px-4 py-2 rounded-lg transition"
                title="Use My Location"
              >
                <MapPin className="w-5 h-5" />
              </button>
            </div>
          </div>

          {error && (
            <div className="mt-4 p-3 bg-red-50 text-red-700 text-sm rounded-lg flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" /> {error}
            </div>
          )}
        </div>

        {/* --- Data Dashboard --- */}
        {weather && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            
            {/* Card 1: Atmospheric Conditions */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-blue-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <CloudRain className="w-24 h-24 text-blue-500" />
              </div>
              <h3 className="text-sm font-bold text-blue-800 uppercase mb-5 flex items-center gap-2 relative z-10">
                <Wind className="w-4 h-4" /> Atmosphere
              </h3>
              
              <div className="space-y-4 relative z-10">
                <div className="flex justify-between items-center border-b border-blue-50 pb-2">
                  <span className="text-slate-500 text-sm flex items-center gap-2">
                    <Thermometer className="w-4 h-4 text-orange-400" /> Temperature
                  </span>
                  <span className="font-bold text-slate-800 text-lg">{weather.temperature}°C</span>
                </div>
                
                <div className="flex justify-between items-center border-b border-blue-50 pb-2">
                  <span className="text-slate-500 text-sm flex items-center gap-2">
                    <Droplets className="w-4 h-4 text-blue-400" /> Humidity
                  </span>
                  <span className="font-bold text-slate-800 text-lg">{weather.humidity}%</span>
                </div>

                <div className="flex justify-between items-center border-b border-blue-50 pb-2">
                  <span className="text-slate-500 text-sm flex items-center gap-2">
                    <CloudRain className="w-4 h-4 text-gray-400" /> Dew Point
                  </span>
                  <span className="font-semibold text-purple-600">{weather.dewPoint}°C</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-slate-500 text-sm">Wind Speed</span>
                  <span className="font-semibold text-slate-800">{weather.windSpeed} km/h</span>
                </div>
              </div>
            </div>

            {/* Card 2: Soil & Crop Health */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-green-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Sprout className="w-24 h-24 text-green-500" />
              </div>
              <h3 className="text-sm font-bold text-green-800 uppercase mb-5 flex items-center gap-2 relative z-10">
                <Sprout className="w-4 h-4" /> Soil & Water
              </h3>

              <div className="space-y-4 relative z-10">
                <div className="flex justify-between items-center border-b border-green-50 pb-2">
                  <span className="text-slate-500 text-sm">Surface Moisture (0-1cm)</span>
                  <span className="font-bold text-slate-800 text-lg">{weather.soilMoistureSurface} <span className="text-xs text-gray-400">m³/m³</span></span>
                </div>

                <div className="flex justify-between items-center border-b border-green-50 pb-2">
                  <span className="text-slate-500 text-sm">Root Zone (3-9cm)</span>
                  <span className={`font-bold text-lg ${weather.soilMoistureRoot < 0.2 ? 'text-red-500' : 'text-green-600'}`}>
                    {weather.soilMoistureRoot} <span className="text-xs text-gray-400">m³/m³</span>
                  </span>
                </div>

                <div className="flex justify-between items-center border-b border-green-50 pb-2">
                  <span className="text-slate-500 text-sm">Soil Temperature</span>
                  <span className="font-semibold text-slate-800">{weather.soilTemp}°C</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-slate-500 text-sm flex items-center gap-2">
                    <Sun className="w-4 h-4 text-orange-500" /> Evapotranspiration
                  </span>
                  <span className="font-bold text-orange-600">{weather.evapotranspiration} mm</span>
                </div>
              </div>
            </div>

            {/* Card 3: AI Insights / Logic Box */}
            <div className="col-span-1 md:col-span-2 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 p-5 rounded-xl">
              <h4 className="font-bold text-yellow-900 mb-3 flex items-center gap-2">
                🤖 Agro-Logic Diagnostics
              </h4>
              <ul className="text-sm space-y-2 text-slate-700">
                
                {/* Logic 1: Fungal Risk */}
                {weather.humidity > 85 && weather.temperature > 20 ? (
                  <li className="flex items-start gap-2 text-red-600 font-medium">
                    <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
                    <span><strong>High Fungal Risk:</strong> High humidity ({weather.humidity}%) + Warmth creates ideal conditions for Blight.</span>
                  </li>
                ) : (
                  <li className="flex items-start gap-2 text-green-700">
                    <span className="w-4 h-4 text-center">✓</span>
                    <span>Humidity levels are safe from immediate fungal outbreaks.</span>
                  </li>
                )}

                {/* Logic 2: Drought / Irrigation */}
                {weather.evapotranspiration > 0.4 && weather.soilMoistureRoot < 0.25 ? (
                  <li className="flex items-start gap-2 text-orange-600 font-medium">
                    <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
                    <span><strong>Irrigation Needed:</strong> High water loss (ET₀ {weather.evapotranspiration}) & low root moisture.</span>
                  </li>
                ) : (
                  <li className="flex items-start gap-2 text-green-700">
                    <span className="w-4 h-4 text-center">✓</span>
                    <span>Soil moisture is adequate for now.</span>
                  </li>
                )}

                {/* Logic 3: Spray Drift */}
                {weather.windSpeed > 12 ? (
                  <li className="flex items-start gap-2 text-red-600 font-medium">
                    <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
                    <span><strong>Spray Warning:</strong> High wind ({weather.windSpeed} km/h). Pesticides will drift to neighbors. Do not spray.</span>
                  </li>
                ) : (
                  <li className="flex items-start gap-2 text-green-700">
                    <span className="w-4 h-4 text-center">✓</span>
                    <span>Wind conditions are safe for spraying.</span>
                  </li>
                )}

              </ul>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}