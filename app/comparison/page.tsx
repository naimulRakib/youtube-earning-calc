'use client';

import React, { useState } from 'react';
import { 
  Globe, 
  MapPin, 
  XCircle, 
  CheckCircle, 
  AlertTriangle, 
  ShieldCheck, 
  Zap, 
  Users, 
  TrendingUp, 
  ChevronRight, 
  ChevronLeft,
  Swords,
  Factory
} from 'lucide-react';

const slides = [
  // --- SLIDE 1: TITLE ---
  {
    id: 1,
    title: "Market Comparison",
    subtitle: "AgroSentinel vs. The Global Giants",
    icon: <Swords className="w-16 h-16 text-indigo-600" />,
    content: (
      <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
        <h2 className="text-3xl font-bold text-gray-800">David vs. Goliath</h2>
        <p className="text-xl text-gray-600 max-w-2xl">
          কেন বিশ্বসেরা অ্যাপগুলো বাংলাদেশের লোকাল সমস্যা সমাধানে ব্যর্থ?
        </p>
        <div className="grid grid-cols-2 gap-8 mt-8 w-full max-w-2xl">
          <div className="p-6 bg-gray-100 rounded-xl border border-gray-300 opacity-70">
            <h3 className="font-bold text-xl text-gray-600">Plantix / Agrio</h3>
            <p className="text-sm">Global & Generic</p>
          </div>
          <div className="p-6 bg-green-100 rounded-xl border-2 border-green-500 shadow-xl transform scale-110">
            <h3 className="font-bold text-2xl text-green-700">AgroSentinel</h3>
            <p className="text-sm font-medium">Hyper-Local & Context-Aware</p>
          </div>
        </div>
      </div>
    )
  },

  // --- SLIDE 2: THE LANDSCAPE ---
  {
    id: 2,
    title: "The Current Landscape",
    subtitle: "কারা মার্কেটে আছে?",
    icon: <Globe className="w-12 h-12 text-blue-500" />,
    content: (
      <div className="space-y-6">
        <div className="bg-white p-4 rounded-lg shadow border-l-4 border-blue-500">
          <h3 className="font-bold text-lg text-blue-700">Plantix (Germany)</h3>
          <p className="text-gray-600">বিশ্বের #1 এগ্রো অ্যাপ। ইমেজ রিকগনিশনে সেরা।</p>
          <p className="text-xs text-red-500 mt-1 font-bold">সীমাবদ্ধতা: এটি মাটির ধরণ বা লোকাল পলিউশন বোঝে না।</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border-l-4 border-purple-500">
          <h3 className="font-bold text-lg text-purple-700">Agrio (Israel)</h3>
          <p className="text-gray-600">স্যাটেলাইট ডাটা ব্যবহারে সেরা।</p>
          <p className="text-xs text-red-500 mt-1 font-bold">সীমাবদ্ধতা: অত্যন্ত ব্যয়বহুল এবং সাধারণ কৃষকের জন্য জটিল।</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border-l-4 border-green-500">
          <h3 className="font-bold text-lg text-green-700">Dr. Chashi / Krishoker Janala (BD)</h3>
          <p className="text-gray-600">তথ্যভাণ্ডার হিসেবে ভালো।</p>
          <p className="text-xs text-red-500 mt-1 font-bold">সীমাবদ্ধতা: কোনো রিয়েল-টাইম AI ডিটেকশন নেই। স্ট্যাটিক অ্যাপ।</p>
        </div>
      </div>
    )
  },

  // --- SLIDE 3: THE CORE PROBLEM ---
  {
    id: 3,
    title: "The Fatal Flaw: Context Blindness",
    subtitle: "অন্যরা যেখানে ভুল করে",
    icon: <AlertTriangle className="w-12 h-12 text-red-500" />,
    content: (
      <div className="flex flex-col h-full space-y-4">
        <div className="grid grid-cols-2 gap-4 h-full">
          {/* Competitor Logic */}
          <div className="bg-red-50 p-6 rounded-xl border border-red-200 text-center">
            <h3 className="font-bold text-red-700 mb-2">Others (Plantix)</h3>
            <div className="text-4xl mb-2">📸</div>
            <p className="text-sm font-medium">Input: Yellow Leaf Image</p>
            <div className="my-2 text-gray-400">⬇️</div>
            <p className="text-lg font-bold text-red-600">"Viral Disease!"</p>
            <p className="text-xs text-gray-500 mt-2">(Context ছাড়া আন্দাজে উত্তর)</p>
          </div>

          {/* Our Logic */}
          <div className="bg-green-50 p-6 rounded-xl border border-green-200 text-center">
            <h3 className="font-bold text-green-700 mb-2">AgroSentinel</h3>
            <div className="text-4xl mb-2">📸 + 🏭</div>
            <p className="text-sm font-medium">Input: Yellow Leaf + Brick Kiln Nearby</p>
            <div className="my-2 text-gray-400">⬇️</div>
            <p className="text-lg font-bold text-green-600">"Sulfur Burn (Pollution)"</p>
            <p className="text-xs text-gray-500 mt-2">(Context চেক করে সঠিক উত্তর)</p>
          </div>
        </div>
        <p className="text-center font-bold text-gray-700 bg-yellow-100 p-2 rounded">
          রেজাল্ট: অন্যরা কৃষকের টাকা নষ্ট করায়, আমরা টাকা বাঁচাই।
        </p>
      </div>
    )
  },

  // --- SLIDE 4: COMPARISON MATRIX ---
  {
    id: 4,
    title: "Feature Matrix",
    subtitle: "At a Glance Comparison",
    icon: <TrendingUp className="w-12 h-12 text-teal-600" />,
    content: (
      <div className="overflow-hidden rounded-lg shadow-lg border border-gray-200">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-white uppercase bg-gray-900">
            <tr>
              <th className="px-6 py-4">Feature</th>
              <th className="px-6 py-4 bg-gray-800">Traditional Apps</th>
              <th className="px-6 py-4 bg-green-700">AgroSentinel</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b hover:bg-gray-50">
              <td className="px-6 py-4 font-medium text-gray-900">Disease Detection</td>
              <td className="px-6 py-4 text-green-600"><CheckCircle size={18}/> Yes</td>
              <td className="px-6 py-4 text-green-600 font-bold"><CheckCircle size={18}/> Yes</td>
            </tr>
            <tr className="bg-white border-b hover:bg-gray-50">
              <td className="px-6 py-4 font-medium text-gray-900">Pollution Detection</td>
              <td className="px-6 py-4 text-red-500 flex items-center gap-1"><XCircle size={18}/> No (Fails)</td>
              <td className="px-6 py-4 text-green-600 font-bold bg-green-50 flex items-center gap-1"><CheckCircle size={18}/> Yes (Core USP)</td>
            </tr>
            <tr className="bg-white border-b hover:bg-gray-50">
              <td className="px-6 py-4 font-medium text-gray-900">Soil/Zone Data</td>
              <td className="px-6 py-4 text-red-500"><XCircle size={18}/> Generic</td>
              <td className="px-6 py-4 text-green-600 font-bold"><CheckCircle size={18}/> Hyper-Local (SRDI)</td>
            </tr>
            <tr className="bg-white border-b hover:bg-gray-50">
              <td className="px-6 py-4 font-medium text-gray-900">Community Alert</td>
              <td className="px-6 py-4 text-yellow-600">⚠️ Manual Forums</td>
              <td className="px-6 py-4 text-green-600 font-bold"><CheckCircle size={18}/> Auto Real-time</td>
            </tr>
            <tr className="bg-white hover:bg-gray-50">
              <td className="px-6 py-4 font-medium text-gray-900">Remedy Type</td>
              <td className="px-6 py-4 text-gray-600">Chemical First</td>
              <td className="px-6 py-4 text-green-600 font-bold">Eco-Friendly First</td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  },

  // --- SLIDE 5: DEEP DIVE - POLLUTION ---
  {
    id: 5,
    title: "Deep Dive 1: The Pollution Logic",
    subtitle: "Why we are different?",
    icon: <Factory className="w-12 h-12 text-gray-700" />,
    content: (
      <div className="space-y-4">
        <p className="text-gray-700">
          বাংলাদেশে কৃষিজমি এবং ইন্ডাস্ট্রি পাশাপাশি থাকে। গ্লোবাল অ্যাপগুলো এই "Mixed Zone" কনসেপ্ট বোঝে না।
        </p>
        <div className="flex flex-col gap-3">
          <div className="p-4 bg-gray-100 rounded border-l-4 border-gray-500">
            <h4 className="font-bold">Scenario: Savar Tannery Area</h4>
            <p className="text-sm mt-1">
              মাটিতে ক্রোমিয়াম (Chromium) বেশি। গাছের পাতা লালচে হয়ে যাচ্ছে।
            </p>
          </div>
          <div className="flex items-center justify-between px-4">
            <div className="text-center w-1/2">
              <span className="text-red-500 font-bold block">Plantix বলে:</span>
              "Rust Disease (Give Medicine)"
            </div>
            <div className="text-center w-1/2">
              <span className="text-green-600 font-bold block">AgroSentinel বলে:</span>
              "Heavy Metal Toxicity (Give Lime/Chun)"
            </div>
          </div>
          <div className="mt-4 p-3 bg-green-600 text-white rounded text-center shadow-lg">
            Winner: AgroSentinel (কৃষকের বিষের টাকা বাঁচল)
          </div>
        </div>
      </div>
    )
  },

  // --- SLIDE 6: DEEP DIVE - NEIGHBOR ---
  {
    id: 6,
    title: "Deep Dive 2: The 'Waze' Effect",
    subtitle: "Community Intelligence",
    icon: <Users className="w-12 h-12 text-purple-600" />,
    content: (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="text-center">
            <h3 className="font-bold text-gray-500">Traditional Apps</h3>
            <p className="text-sm">"আপনার গাছে রোগ হয়েছে? <br/>ছবি আপলোড করুন।"</p>
            <p className="text-xs text-red-400 mt-2">(Reactive: রোগ হওয়ার পর)</p>
          </div>
          <div className="text-2xl font-bold text-gray-300">VS</div>
          <div className="text-center">
            <h3 className="font-bold text-purple-600">AgroSentinel</h3>
            <p className="text-sm">"আপনার ৫ জন প্রতিবেশী আক্রান্ত। <br/>আপনি আজই সতর্ক হোন।"</p>
            <p className="text-xs text-green-500 mt-2">(Proactive: রোগ হওয়ার আগে)</p>
          </div>
        </div>
        
        <div className="bg-purple-50 p-6 rounded-xl border border-purple-200 mt-4">
          <p className="font-medium text-purple-900 text-center">
            আমরা অ্যাপ ব্যবহারকারীকে <span className="font-bold">"Isolated User"</span> থেকে <span className="font-bold">"Community Member"</span>-এ পরিণত করি।
          </p>
        </div>
      </div>
    )
  },

  // --- SLIDE 7: DEEP DIVE - SOIL ---
  {
    id: 7,
    title: "Deep Dive 3: The Soil Logic",
    subtitle: "Knowing the Ground Truth",
    icon: <MapPin className="w-12 h-12 text-orange-600" />,
    content: (
      <div className="space-y-4">
        <p className="text-gray-700">
          অন্য অ্যাপগুলো মাটিকে "Black Box" মনে করে। আমরা মাটিকে "Data Source" মনে করি।
        </p>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-4 shadow rounded border-t-4 border-red-500">
            <h4 className="font-bold text-gray-800">Generic Advice</h4>
            <p className="text-sm text-gray-500 mt-2">"মাটিতে সার দিন।"</p>
            <p className="text-xs text-red-500 mt-1">(মাটি যদি আগে থেকেই এসিডিক হয়, সার দিলে ক্ষতি হবে।)</p>
          </div>
          <div className="bg-white p-4 shadow rounded border-t-4 border-green-500">
            <h4 className="font-bold text-gray-800">Context Advice</h4>
            <p className="text-sm text-gray-500 mt-2">"আপনার মাটি এসিডিক (pH 5.5)। আগে ছাই বা চুন দিন, তারপর সার।"</p>
            <p className="text-xs text-green-500 mt-1">(সঠিক বৈজ্ঞানিক পরামর্শ।)</p>
          </div>
        </div>
      </div>
    )
  },

  // --- SLIDE 8: ROI ---
  {
    id: 8,
    title: "The Financial Impact",
    subtitle: "Better for Farmer's Wallet",
    icon: <TrendingUp className="w-12 h-12 text-yellow-600" />,
    content: (
      <div className="flex flex-col items-center justify-center space-y-6">
        <div className="w-full bg-gray-100 rounded-full h-4 mb-4 dark:bg-gray-700">
          <div className="bg-red-500 h-4 rounded-full" style={{ width: '80%' }}></div>
          <p className="text-xs text-right mt-1 font-bold text-red-600">Traditional Cost: High (Unnecessary Sprays)</p>
        </div>
        
        <div className="w-full bg-gray-100 rounded-full h-4 mb-4 dark:bg-gray-700">
          <div className="bg-green-500 h-4 rounded-full" style={{ width: '40%' }}></div>
          <p className="text-xs text-right mt-1 font-bold text-green-600">AgroSentinel Cost: Low (Precise Solutions)</p>
        </div>

        <div className="p-6 bg-yellow-50 rounded-xl text-center border border-yellow-200">
          <h3 className="text-xl font-bold text-yellow-800">40% Savings</h3>
          <p className="text-gray-700">
            শুধুমাত্র "রোগ" এবং "দূষণ" এর পার্থক্য বুঝিয়ে আমরা কৃষকের কীটনাশক খরচ ৪০% পর্যন্ত কমাতে পারি।
          </p>
        </div>
      </div>
    )
  },

  // --- SLIDE 9: CONCLUSION ---
  {
    id: 9,
    title: "Final Verdict",
    subtitle: "Why We Win?",
    icon: <ShieldCheck className="w-16 h-16 text-green-600" />,
    content: (
      <div className="text-center space-y-6">
        <h2 className="text-2xl font-bold text-gray-800">"Think Global, Act Local"</h2>
        <p className="text-lg text-gray-600">
          Plantix এবং Agrio বিশ্বের জন্য অসাধারণ। <br/>
          কিন্তু বাংলাদেশের জটিল ইকো-সিস্টেম (Pollution + Agriculture) সামলানোর জন্য <br/>
          <span className="font-bold text-green-600 text-xl">AgroSentinel</span>-এর কোনো বিকল্প নেই।
        </p>
        <div className="mt-8">
          <span className="px-6 py-3 bg-gray-900 text-white rounded-full font-bold shadow-lg">
            We are the "Local Specialist"
          </span>
        </div>
      </div>
    )
  }
];

const AgroComparisonDeck = () => {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => setCurrent(prev => (prev === slides.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setCurrent(prev => (prev === 0 ? slides.length - 1 : prev - 1));

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 p-4 font-sans">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden min-h-[600px] flex flex-col">
        
        {/* Top Header */}
        <div className="bg-indigo-900 text-white p-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Zap className="text-yellow-400 w-6 h-6 animate-pulse" />
            <span className="font-bold tracking-wider">COMPETITOR ANALYSIS</span>
          </div>
          <div className="text-sm font-mono text-indigo-300">
            Slide {current + 1} / {slides.length}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-8 bg-white flex flex-col">
          <div className="mb-6 border-b pb-4 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">{slides[current].title}</h1>
              {slides[current].subtitle && (
                <p className="text-lg text-indigo-600 mt-1 font-medium">{slides[current].subtitle}</p>
              )}
            </div>
            <div className="opacity-20 transform scale-150">
              {slides[current].icon}
            </div>
          </div>
          
          <div className="flex-1 text-base leading-relaxed text-gray-700">
            {slides[current].content}
          </div>
        </div>

        {/* Footer Controls */}
        <div className="bg-gray-50 border-t p-6 flex justify-between items-center">
          <button 
            onClick={prevSlide}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-gray-300 hover:bg-white transition-all font-medium text-gray-600 shadow-sm"
          >
            <ChevronLeft size={18} /> Prev
          </button>

          <div className="flex gap-2">
            {slides.map((_, idx) => (
              <div 
                key={idx} 
                onClick={() => setCurrent(idx)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${idx === current ? 'w-8 bg-indigo-600' : 'w-2 bg-gray-300 hover:bg-indigo-300'}`}
              />
            ))}
          </div>

          <button 
            onClick={nextSlide}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-all font-medium shadow-md hover:shadow-lg"
          >
            Next <ChevronRight size={18} />
          </button>
        </div>

      </div>
      
      {/* Pitch Tip */}
      <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg max-w-2xl text-center text-sm text-yellow-800">
        💡 <strong>Pitch Tip:</strong> কখনোই বলবে না "অন্য অ্যাপ খারাপ"। বলবে "তারা গ্লোবাল, আমরা লোকাল"। জাজরা বিনয় পছন্দ করে।
      </div>
    </div>
  );
};

export default AgroComparisonDeck;