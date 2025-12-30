'use client';

import React, { useState } from 'react';
import { 
  Leaf, 
  Wind, 
  Droplets, 
  MapPin, 
  ShieldAlert, 
  Users, 
  Database, 
  Cpu, 
  TrendingUp, 
  AlertTriangle,
  Factory,
  Sprout,
  Activity,
  Globe,
  Smartphone,
  ChevronRight,
  ChevronLeft,
  Search,
  CloudRain,
  TestTube,
  DollarSign
} from 'lucide-react';

// স্লাইড ডাটা স্ট্রাকচার
const slides = [
  // --- SECTION 1: INTRO & PROBLEM ---
  {
    id: 1,
    section: "Introduction",
    title: "AgroSentinel: AI-Driven Eco-System & Crop Manager",
    subtitle: "AI for a Sustainable Tomorrow",
    icon: <Leaf className="w-16 h-16 text-green-500" />,
    content: (
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold text-gray-800">The Context-Aware Expert System</h2>
        <p className="text-xl text-gray-600">
          আমরা শুধু রোগ ধরি না, আমরা <span className="text-red-600 font-bold">দূষণ (Pollution)</span> এবং <span className="text-green-600 font-bold">রোগ (Disease)</span> এর পার্থক্য বুঝি।
        </p>
        <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200 inline-block">
          <p className="text-blue-800 font-medium">Tagline: "বিষ নয়, বিজ্ঞান দিয়ে সমাধান।"</p>
        </div>
      </div>
    )
  },
  {
    id: 2,
    section: "The Problem",
    title: "The Great Confusion: Biotic vs. Abiotic",
    icon: <AlertTriangle className="w-12 h-12 text-red-500" />,
    content: (
      <div className="space-y-4">
        <div className="bg-red-50 p-6 rounded-lg border-l-4 border-red-500">
          <h3 className="text-xl font-bold text-red-700">ভুল ডায়াগনসিস (Misdiagnosis)</h3>
          <p className="text-gray-700 mt-2">
            পাশের ইটের ভাটার ধোঁয়ায় বা কারখানার বর্জ্য মিশ্রিত পানিতে গাছের পাতা পুড়ে গেছে (Chemical Burn), 
            কিন্তু কৃষক ভাবছে এটা পোকা বা ছত্রাক।
          </p>
        </div>
        <div className="bg-orange-50 p-6 rounded-lg border-l-4 border-orange-500">
          <h3 className="text-xl font-bold text-orange-700">ভুল চিকিৎসা (Wrong Treatment)</h3>
          <p className="text-gray-700 mt-2">
            কৃষক জমিতে অযথা কড়া কীটনাশক স্প্রে করে। ফলাফল: মাটি ও পানি দূষণ, টাকার অপচয়, কিন্তু রোগ ভালো হয় না।
          </p>
        </div>
      </div>
    )
  },
  {
    id: 3,
    section: "The Problem",
    title: "Lack of Local Context",
    icon: <MapPin className="w-12 h-12 text-blue-500" />,
    content: (
      <div className="space-y-6">
        <p className="text-lg text-gray-700">
          রংপুরের মাটির সমস্যার সমাধান কুমিল্লার কৃষকের ওপর চাপিয়ে দেওয়া হয়, কারণ সাধারণ অ্যাপগুলোতে কোনো 
          <span className="font-bold text-blue-600"> "Zone-Based"</span> ডাটা এনালাইসিস নেই।
        </p>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-100 p-4 rounded text-center">
            <p className="font-bold text-red-500">Generic AI</p>
            <p className="text-sm">সব মাটিকে এক মনে করে।</p>
          </div>
          <div className="bg-green-100 p-4 rounded text-center">
            <p className="font-bold text-green-600">AgroSentinel</p>
            <p className="text-sm">জানে কুমিল্লার মাটি এসিডিক, তাই সমাধান ভিন্ন।</p>
          </div>
        </div>
      </div>
    )
  },

  // --- SECTION 2: SOLUTION STRATEGY ---
  {
    id: 4,
    section: "Our Solution",
    title: "The 3-Layer Logic Shield",
    icon: <ShieldAlert className="w-12 h-12 text-green-600" />,
    content: (
      <div className="grid grid-cols-1 gap-4">
        <div className="flex items-center gap-4 bg-white p-4 shadow-sm border rounded-lg">
          <div className="bg-blue-100 p-3 rounded-full"><MapPin className="text-blue-600"/></div>
          <div>
            <h4 className="font-bold">Layer 1: Zone-Based Logic</h4>
            <p className="text-sm text-gray-600">এলাকা ভাগ ও ডাটা ফিল্টারিং (যেমন: কুমিল্লার এসিডিক মাটি)।</p>
          </div>
        </div>
        <div className="flex items-center gap-4 bg-white p-4 shadow-sm border rounded-lg">
          <div className="bg-red-100 p-3 rounded-full"><Factory className="text-red-600"/></div>
          <div>
            <h4 className="font-bold">Layer 2: Disease vs. Pollution</h4>
            <p className="text-sm text-gray-600">আসল কালপ্রিট কে? জীবাণু নাকি ইটের ভাটার ধোঁয়া?</p>
          </div>
        </div>
        <div className="flex items-center gap-4 bg-white p-4 shadow-sm border rounded-lg">
          <div className="bg-purple-100 p-3 rounded-full"><Users className="text-purple-600"/></div>
          <div>
            <h4 className="font-bold">Layer 3: Crowd Intelligence</h4>
            <p className="text-sm text-gray-600">প্রতিবেশীর ডাটা ব্যবহার করে রিস্ক মাপার পদ্ধতি।</p>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 5,
    section: "Solution - Layer 1",
    title: "Zone-Based Logic (Divide & Conquer)",
    icon: <MapPin className="w-12 h-12 text-indigo-500" />,
    content: (
      <div className="space-y-4">
        <p className="text-gray-700">
          AI পুরো দুনিয়ার ডাটা নিয়ে ভাববে না। ইউজার লগইন করলেই সিস্টেম জানবে:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-gray-800">
          <li><strong>অবস্থান:</strong> কুমিল্লা জোন।</li>
          <li><strong>মাটির ধরণ:</strong> এসিডিক (pH ৫.৫)।</li>
          <li><strong>আবহাওয়া:</strong> এখন বর্ষাকাল।</li>
        </ul>
        <div className="bg-indigo-50 p-4 rounded text-center font-semibold text-indigo-700">
          ফলাফল: রেজাল্ট ১০ গুণ ফাস্ট এবং ১০০% একুরেট।
        </div>
      </div>
    )
  },
  {
    id: 6,
    section: "Solution - Layer 2",
    title: "Context-Aware AI (The Detective)",
    icon: <Search className="w-12 h-12 text-teal-500" />,
    content: (
      <div className="space-y-4">
        <p className="text-xl font-medium text-gray-800">
          "এটি কোনো পোকা নয়, এটি বাতাসের দূষণ।"
        </p>
        <div className="bg-gray-50 p-4 border-l-4 border-teal-500 text-sm">
          <p><strong>Logic:</strong> যদি গত ৩ দিন বাতাসের মান (AQI) খারাপ থাকে + আশেপাশে ফ্যাক্টরি থাকে = <strong>Pollution Alert.</strong></p>
        </div>
        <p className="text-gray-600 italic">
          এই ফিচারটিই আমাদের হ্যাকাথন জেতাবে, কারণ অন্যরা এটাকে 'রোগ' বলে ভুল করবে।
        </p>
      </div>
    )
  },
  {
    id: 7,
    section: "Solution - Layer 3",
    title: "Neighborhood Probability (Waze for Agro)",
    icon: <Users className="w-12 h-12 text-purple-500" />,
    content: (
      <div className="space-y-4">
        <h3 className="text-lg font-bold">Crowd-Sourced Intelligence</h3>
        <p className="text-gray-700">
          যদি গত ২৪ ঘণ্টায় আপনার এলাকার ৫০ জন কৃষক "Late Blight" রোগের রিপোর্ট করে থাকে, 
          তবে আপনার গাছেও সেটা হওয়ার সম্ভাবনা <span className="font-bold text-red-600">৯০%</span>।
        </p>
        <div className="bg-purple-50 p-4 rounded text-center">
          সিস্টেম একা ডিসিশন নেয় না, প্রতিবেশীর ডাটা ক্রস-চেক করে।
        </div>
      </div>
    )
  },

  // --- SECTION 3: SCENARIOS (THE WOW FACTORS) ---
  {
    id: 8,
    section: "Scenario 1: Smart Pollution",
    title: "Chemical Drift Alert",
    icon: <Wind className="w-12 h-12 text-gray-500" />,
    content: (
      <div className="space-y-4">
        <h3 className="font-bold text-red-600">সমস্যা:</h3>
        <p>পাশের জমির কীটনাশক বাতাসে উড়ে এসে আমার অর্গানিক সবজি নষ্ট করছে (Spray Drift)।</p>
        
        <h3 className="font-bold text-green-600">AgroSentinel Solution:</h3>
        <ul className="list-disc pl-5 text-sm space-y-2">
          <li><strong>Alert:</strong> "সতর্কতা! পাশের প্লট B-তে আজ কড়া কীটনাশক দেওয়া হয়েছে।"</li>
          <li><strong>Immediate Action:</strong> "আগামী ৩ দিন বর্ডার থেকে ফসল তুলবেন না।"</li>
          <li><strong>Long Term:</strong> "জমির চারপাশে ৫ ফুট লম্বা 'নেপিয়ার ঘাস' বা 'ধঞ্চে গাছ' লাগান (Buffer Zone)।"</li>
        </ul>
      </div>
    )
  },
  {
    id: 9,
    section: "Scenario 2: Smart Selection",
    title: "Crop Switching Strategy",
    icon: <Sprout className="w-12 h-12 text-green-600" />,
    content: (
      <div className="space-y-4">
        <h3 className="font-bold text-red-600">সমস্যা:</h3>
        <p>ফ্যাক্টরির লবণে মাটি নষ্ট। বারবার ধান লাগিয়ে কৃষক লস খাচ্ছে।</p>
        
        <h3 className="font-bold text-green-600">Recommendation Engine:</h3>
        <div className="bg-yellow-50 p-4 rounded border border-yellow-200">
          <p className="font-medium text-yellow-800">
            "এই জোনের মাটি এখন অতিরিক্ত লবণাক্ত (Saline)। ধান বাদ দিয়ে 'ভুট্টা' বা 'তরমুজ' চাষ করুন।"
          </p>
        </div>
        <p className="text-sm text-gray-500">একে বলা হয় "Climate Smart Crop Selection"।</p>
      </div>
    )
  },
  {
    id: 10,
    section: "Scenario 3: Smart Irrigation",
    title: "Pollution Schedule (Dynamic)",
    icon: <Droplets className="w-12 h-12 text-blue-600" />,
    content: (
      <div className="space-y-4">
        <h3 className="font-bold text-red-600">সমস্যা:</h3>
        <p>কৃষক জানে না নদীর পানি আজ বিষাক্ত কিনা। পাম্প চালু করতেই ফসল নষ্ট।</p>
        
        <h3 className="font-bold text-green-600">Time-Based Warning:</h3>
        <p>আমাদের ডাটাবেসে প্যাটার্ন থাকবে (Crowd Sourced)।</p>
        <div className="bg-red-50 p-4 rounded text-center text-red-700 font-bold">
          "আজ শুক্রবার, ফ্যাক্টরিগুলো বর্জ্য ছাড়ে। আজ নদীর পানি ব্যবহার নিষিদ্ধ।"
        </div>
      </div>
    )
  },

  // --- SECTION 4: ECO-TOXICOLOGY MODULE ---
  {
    id: 11,
    section: "Module: Eco-Toxicology",
    title: "Step A: Water Source Analysis",
    icon: <TestTube className="w-12 h-12 text-teal-600" />,
    content: (
      <div className="space-y-4">
        <p>কৃষক সেচের পানির ছবি তুলবে। AI রং বিশ্লেষণ করবে:</p>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="bg-green-100 p-3 rounded">
            <span className="font-bold block">Neon Green</span>
            Eutrophication (অতিরিক্ত সার)। শিকড় পচে যাবে।
          </div>
          <div className="bg-gray-800 text-white p-3 rounded">
            <span className="font-bold block">Black/Grey</span>
            Toxic Sewage (H2S Gas)। গাছ হলুদ হয়ে মারা যাবে।
          </div>
        </div>
        <p className="font-bold text-red-500 mt-2">Action: "এই পানি ব্যবহার করবেন না।"</p>
      </div>
    )
  },
  {
    id: 12,
    section: "Module: Eco-Toxicology",
    title: "Step B: Chemical History Log",
    icon: <Activity className="w-12 h-12 text-orange-600" />,
    content: (
      <div className="space-y-4">
        <p className="font-medium">অ্যাপ জিজ্ঞেস করবে: "গত ৭ দিনে কি কোনো স্প্রে করেছেন?"</p>
        <div className="bg-white border-l-4 border-orange-500 p-4 shadow">
          <p><strong>Logic:</strong> যদি ২ দিন আগে কড়া ডোজ স্প্রে করে থাকেন এবং আজ পাতা পুড়ে যায় (Tip Burn) —</p>
          <p className="mt-2 text-orange-700 font-bold">Diagnosis: Abiotic Stress (রাসায়নিক ধকল)।</p>
        </div>
        <p className="text-sm">Action: "আর বিষ দিবেন না। শুধু পানি স্প্রে করুন।"</p>
      </div>
    )
  },
  {
    id: 13,
    section: "Module: Eco-Toxicology",
    title: "Step C: Air Pollution Logic",
    icon: <Wind className="w-12 h-12 text-gray-600" />,
    content: (
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <MapPin size={20} />
          <span>GPS চেক: ১ কি.মি. এর মধ্যে ইটের ভাটা আছে?</span>
        </div>
        <div className="bg-gray-100 p-4 rounded">
          <p className="font-bold">Fact:</p>
          <p>ইট ভাটা = সালফার ডাই-অক্সাইড (SO2) গ্যাস।</p>
        </div>
        <p className="text-lg font-medium text-gray-800">
          Diagnosis: পাতায় সাদা ফোঁটা মানে এসিড রেইন বা SO2 বার্ন।
        </p>
      </div>
    )
  },

  // --- SECTION 5: DATA ARCHITECTURE ---
  {
    id: 14,
    section: "Architecture",
    title: "Master Data Architecture",
    icon: <Database className="w-12 h-12 text-blue-700" />,
    content: (
      <div className="space-y-4">
        <p>আমরা ডাটাকে ৩টি সোর্সে ভাগ করেছি (Triangulation Method):</p>
        <ul className="space-y-3">
          <li className="flex items-center gap-2 p-2 bg-blue-50 rounded">
            <CloudRain size={20} className="text-blue-500"/>
            <strong>1. Auto Data (API):</strong> রিয়েল-টাইম আবহাওয়া ও বাতাস।
          </li>
          <li className="flex items-center gap-2 p-2 bg-green-50 rounded">
            <Database size={20} className="text-green-500"/>
            <strong>2. Manual Data (Static):</strong> জোন-ভিত্তিক মাটির ডাটা (SRDI)।
          </li>
          <li className="flex items-center gap-2 p-2 bg-purple-50 rounded">
            <Users size={20} className="text-purple-500"/>
            <strong>3. Crowd Data (User):</strong> প্রতিবেশীর রিপোর্ট (Supabase)।
          </li>
        </ul>
      </div>
    )
  },
  {
    id: 15,
    section: "Data Source: Auto",
    title: "1. Auto Data (Real-Time API)",
    icon: <CloudRain className="w-12 h-12 text-blue-500" />,
    content: (
      <div className="space-y-4">
        <h3 className="font-bold">Source: Open-Meteo (Free)</h3>
        <p>কোন ডাটাগুলো নিচ্ছি?</p>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="bg-gray-100 p-2 rounded">🌡️ Temperature (ফাঙ্গাসের জন্য)</div>
          <div className="bg-gray-100 p-2 rounded">💧 Humidity (৯০%+ হলে ব্লাইট হয়)</div>
          <div className="bg-gray-100 p-2 rounded">🌧️ Rain (স্প্রে টাইমিং)</div>
          <div className="bg-gray-100 p-2 rounded">💨 Wind Speed (স্প্রে ড্রিফট)</div>
        </div>
        <p className="text-xs text-gray-500 mt-2">Example: Burichang Lat/Lon: 23.55, 91.12</p>
      </div>
    )
  },
  {
    id: 16,
    section: "Data Source: Manual",
    title: "2. Manual Data (The Research)",
    icon: <Database className="w-12 h-12 text-green-600" />,
    content: (
      <div className="space-y-4">
        <h3 className="font-bold">Source: SRDI & BARC Research</h3>
        <p>এই ডাটা ইন্টারনেটে লাইভ নেই, আমরা ডিজিটাইজ করেছি (zones.ts)।</p>
        <div className="bg-green-50 p-4 font-mono text-xs rounded border border-green-200">
          <p>{"{"}</p>
          <p className="pl-4">"zone": "cumilla-burichang",</p>
          <p className="pl-4">"soil_type": "Grey Floodplain (Acidic)",</p>
          <p className="pl-4">"risk": "Zinc Deficiency",</p>
          <p className="pl-4">"ph": "5.5 - 6.0"</p>
          <p>{"}"}</p>
        </div>
        <p className="text-sm">AI যখন দেখবে 'Acidic Soil', সে 'Nutrient Deficiency' কে প্রাধান্য দিবে।</p>
      </div>
    )
  },
  {
    id: 17,
    section: "Data Source: Crowd",
    title: "3. Crowd Data (Supabase)",
    icon: <Users className="w-12 h-12 text-purple-600" />,
    content: (
      <div className="space-y-4">
        <h3 className="font-bold">Incentive Model: "Give to Get"</h3>
        <p>কৃষক কেন ডাটা দিবে? কারণ নিজের রিপোর্ট না দিলে সে প্রতিবেশীর 'Risk Map' দেখতে পাবে না।</p>
        
        <div className="bg-purple-50 p-4 rounded text-sm">
          <p><strong>PostGIS Query Logic:</strong></p>
          <p className="italic mt-1">
            "Get all reports within 5KM radius from the last 7 days."
          </p>
        </div>
      </div>
    )
  },
  {
    id: 18,
    section: "Core Logic",
    title: "The Cluster Effect Formula",
    icon: <Cpu className="w-12 h-12 text-red-500" />,
    content: (
      <div className="flex flex-col items-center justify-center space-y-6 h-full">
        <h3 className="text-2xl font-bold text-gray-800">Final Diagnosis Score</h3>
        <div className="bg-gray-900 text-white p-6 rounded-xl shadow-lg text-xl font-mono text-center">
          Score = (AI_Confidence × 0.6) + (Local_Frequency × 0.4)
        </div>
        <p className="text-center text-gray-600">
          AI যদি ৫০% কনফিডেন্ট হয়, কিন্তু ৫০ জন প্রতিবেশী একই রিপোর্ট করে, 
          তবে ফাইনাল স্কোর বেড়ে ৯০% হয়ে যাবে।
        </p>
      </div>
    )
  },

  // --- SECTION 6: TECH & INNOVATION ---
  {
    id: 19,
    section: "Tech Stack",
    title: "Technology Guidelines",
    icon: <Smartphone className="w-12 h-12 text-blue-600" />,
    content: (
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 border rounded-lg hover:shadow-md transition">
          <h4 className="font-bold text-blue-600">Frontend</h4>
          <p>Next.js (Fast & PWA Ready)</p>
        </div>
        <div className="p-4 border rounded-lg hover:shadow-md transition">
          <h4 className="font-bold text-purple-600">AI Brain</h4>
          <p>Google Gemini 1.5 Flash</p>
        </div>
        <div className="p-4 border rounded-lg hover:shadow-md transition">
          <h4 className="font-bold text-green-600">Database</h4>
          <p>Supabase (PostGIS for Maps)</p>
        </div>
        <div className="p-4 border rounded-lg hover:shadow-md transition">
          <h4 className="font-bold text-red-600">Data Source</h4>
          <p>Open-Meteo & SRDI Maps</p>
        </div>
      </div>
    )
  },
  {
    id: 20,
    section: "Innovation",
    title: "Why BUET Judges Will Love This",
    icon: <Globe className="w-12 h-12 text-teal-600" />,
    content: (
      <div className="space-y-4">
        <h3 className="font-bold text-lg">Theme Match: "Environment Watch"</h3>
        <ul className="space-y-3 text-sm">
          <li className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span><strong>Pollution Monitoring:</strong> ইটের ভাটার ধোঁয়া ফসলের ক্ষতি করছে—এটা সরাসরি পরিবেশের ক্ষতি।</span>
          </li>
          <li className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span><strong>Ecosystem Restoration:</strong> কীটনাশক কমানো মানেই মাটির ইকোসিস্টেম রক্ষা।</span>
          </li>
          <li className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span><strong>Climate Prediction:</strong> জোন লজিক দিয়ে ক্লাইমেট এডাপ্টেশন।</span>
          </li>
        </ul>
      </div>
    )
  },
  {
    id: 21,
    section: "Innovation",
    title: "Innovation 1: Predictive ROI",
    icon: <DollarSign className="w-12 h-12 text-yellow-600" />,
    content: (
      <div className="space-y-4">
        <h3 className="font-bold">Economic Innovation</h3>
        <p className="text-gray-700">
          আমরা শুধু রোগ ধরি না, আমরা টাকার হিসাব দিই।
        </p>
        <div className="bg-yellow-50 p-4 border-l-4 border-yellow-500">
          "এই ওষুধটি কিনতে ১৫০ টাকা লাগবে, কিন্তু এটি না দিলে আপনার ৫০০০ টাকার ফসল নষ্ট হবে।"
        </div>
        <p className="text-sm text-gray-500">
          কৃষক যখন দেখবে ১০ গুণ লাভ, সে তখনই অ্যাকশন নেবে।
        </p>
      </div>
    )
  },
  {
    id: 22,
    section: "Innovation",
    title: "Innovation 2: Offline SMS Mode",
    icon: <Users className="w-12 h-12 text-gray-600" />,
    content: (
      <div className="space-y-4">
        <h3 className="font-bold">Inclusivity</h3>
        <p>স্মার্টফোন নেই? ইন্টারনেট নেই? সমস্যা নেই।</p>
        <div className="bg-gray-100 p-4 rounded border">
          <p className="font-mono text-sm">
            [SMS] "সতর্কতা! বুড়িচং জোনে ব্লাস্ট রোগের প্রকোপ দেখা দিয়েছে। অবিলম্বে নাটিভো স্প্রে করুন।"
          </p>
        </div>
        <p className="text-sm text-gray-500">
          ইমেজ প্রসেসিং সার্ভারে হলেও, সতর্কবার্তা SMS-এ যাবে।
        </p>
      </div>
    )
  },
  {
    id: 23,
    section: "Business Model",
    title: "Future Financial Value",
    icon: <TrendingUp className="w-12 h-12 text-blue-600" />,
    content: (
      <div className="space-y-4">
        <div className="p-4 bg-green-50 rounded border border-green-200">
          <h4 className="font-bold text-green-800">1. Sustainable Certification</h4>
          <p className="text-sm">আমাদের গাইডলাইন মেনে চাষ করলে কৃষকদের "Green Farmer" ব্যাজ দেওয়া হবে (Export Quality)।</p>
        </div>
        <div className="p-4 bg-blue-50 rounded border border-blue-200">
          <h4 className="font-bold text-blue-800">2. Data Sales</h4>
          <p className="text-sm">কোন এলাকায় পুকুর বেশি দূষিত—এই ডাটা NGO বা সরকারের কাছে বিক্রি করা যাবে।</p>
        </div>
      </div>
    )
  },
  {
    id: 24,
    section: "Demo Strategy",
    title: "Hackathon Demo Master Plan",
    icon: <Smartphone className="w-12 h-12 text-purple-600" />,
    content: (
      <div className="space-y-4">
        <h3 className="font-bold text-red-600">Synthetic Data Injection</h3>
        <p>লাইভ ইউজার নেই, তাই আমরা প্রেজেন্টেশনের আগের রাতে ডাটাবেসে ৫০টি রিপোর্ট ইনজেক্ট করব।</p>
        <ul className="list-disc pl-5 text-sm space-y-2">
          <li>৩০ জন রিপোর্ট করেছে: "Leaves Turning Yellow"</li>
          <li>২০ জন রিপোর্ট করেছে: "Heavy Dust on Leaves"</li>
        </ul>
        <div className="bg-purple-100 p-3 rounded font-bold text-purple-800 mt-2">
          ডেমো রেজাল্ট: "Warning! Your neighbors reported Dust Pollution. Wash leaves now."
        </div>
      </div>
    )
  },
  {
    id: 25,
    section: "Conclusion",
    title: "Final Vision",
    icon: <Sprout className="w-16 h-16 text-green-600" />,
    content: (
      <div className="text-center space-y-6">
        <h2 className="text-3xl font-bold text-gray-800">Not Just an App.</h2>
        <h3 className="text-2xl font-bold text-green-600">An Intelligent Eco-System.</h3>
        <p className="text-gray-600 max-w-2xl mx-auto">
          আমরা কৃষককে "অন্ধের মতো স্প্রে" করা থেকে বাঁচিয়ে "সচেতন ফার্মিং"-এ নিয়ে আসছি। 
          মাটি বাঁচলে, তবেই দেশ বাঁচবে।
        </p>
      </div>
    )
  }
];

// Main Component
const AgroMasterDeck = () => {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => setCurrent(prev => (prev === slides.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setCurrent(prev => (prev === 0 ? slides.length - 1 : prev - 1));

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200 p-4 font-sans">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden min-h-[650px] flex flex-col relative">
        
        {/* Top Bar */}
        <div className="bg-gray-900 text-white p-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Leaf className="text-green-400 w-6 h-6" />
            <span className="font-bold tracking-wider">AGRO SENTINEL</span>
            <span className="px-2 py-0.5 bg-green-600 text-xs rounded text-white">Blueprint</span>
          </div>
          <div className="text-sm font-mono text-gray-400">
            Slide {current + 1} / {slides.length}
          </div>
        </div>

        {/* Slide Content Area */}
        <div className="flex-1 p-10 bg-gradient-to-br from-white to-gray-50 flex flex-col">
          <div className="mb-6 pb-4 border-b border-gray-100">
            <span className="text-sm font-bold text-green-600 uppercase tracking-widest mb-2 block">
              {slides[current].section}
            </span>
            <div className="flex items-center gap-4">
              {slides[current].icon}
              <h1 className="text-4xl font-bold text-gray-800 leading-tight">
                {slides[current].title}
              </h1>
            </div>
            {slides[current].subtitle && (
              <p className="text-xl text-gray-500 mt-2 font-medium ml-[60px]">
                {slides[current].subtitle}
              </p>
            )}
          </div>
          
          <div className="flex-1 text-lg leading-relaxed text-gray-700 pl-[60px]">
            {slides[current].content}
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="bg-white border-t p-6 flex justify-between items-center">
          <button 
            onClick={prevSlide}
            className="flex items-center gap-2 px-6 py-3 rounded-lg border border-gray-300 hover:bg-gray-100 transition-colors font-medium text-gray-600"
          >
            <ChevronLeft size={20} /> Back
          </button>

          <div className="flex gap-1.5 overflow-hidden max-w-md">
            {slides.map((_, idx) => (
              <div 
                key={idx} 
                className={`h-2 rounded-full transition-all duration-300 ${idx === current ? 'w-8 bg-green-600' : 'w-2 bg-gray-300'}`}
              />
            ))}
          </div>

          <button 
            onClick={nextSlide}
            className="flex items-center gap-2 px-6 py-3 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors font-medium shadow-lg hover:shadow-green-500/30"
          >
            Next <ChevronRight size={20} />
          </button>
        </div>

      </div>
      
      {/* Team Instructions */}
      <div className="mt-8 text-gray-500 text-sm max-w-2xl text-center">
        ⚠️ এই স্লাইড ডেকটি টিমের সবার (তাহমিদ, দিব্য, প্রত্যয়, Rakibul, Diganta) জন্য ব্লু-প্রিন্ট। 
        কোডিং বা রিসার্চ করার আগে সংশ্লিষ্ট স্লাইডটি ভালো করে পড়ে নিন।
      </div>
    </div>
  );
};

export default AgroMasterDeck;