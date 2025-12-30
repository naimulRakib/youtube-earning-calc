'use client';
import React, { useState } from 'react';
import { 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  ShieldAlert, 
  MapPin, 
  Leaf, 
 
  TrendingUp, 
  ChevronRight, 
  ChevronLeft 
} from 'lucide-react';

const AgroProjectStrategyDeck = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: "Project Strategy: Context-Aware Agro AI",
      subtitle: "কেন আমরা জিতব? (The Winning Strategy)",
      content: (
        <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
          <div className="p-6 bg-green-100 rounded-full">
            <Leaf className="w-16 h-16 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800">Agro AI: Beyond the Wrapper</h2>
          <p className="text-xl text-gray-600 max-w-2xl">
            কিভাবে একটি "Common Idea"-কে "Rare Solution"-এ রূপান্তর করা যায়?
          </p>
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 text-left max-w-2xl">
            <p className="font-semibold text-yellow-800">⚠️ Reality Check:</p>
            <p className="text-gray-700 italic">
              "জাজরা যখনই শোনে 'আমরা গাছের ছবি তুলে রোগ বের করব', তারা মনে মনে চোখ উল্টায়। তাদের কাছে এটা AI-এর Hello World প্রজেক্ট।"
            </p>
          </div>
        </div>
      )
    },
    {
      id: 2,
      title: "🛑 The Harsh Reality: Is it Common?",
      icon: <AlertTriangle className="w-8 h-8 text-red-500" />,
      content: (
        <div className="space-y-6">
          <div className="bg-red-50 p-6 rounded-lg border border-red-200">
            <h3 className="text-xl font-bold text-red-700 mb-3">YES. It is extremely common.</h3>
            <p className="text-gray-700 leading-relaxed">
              বাংলাদেশে গত ৫ বছরে এমন কোনো হ্যাকাথন (NASA Space Apps, Basis SoftExpo) যায়নি যেখানে অন্তত ৩-৪টা টিম "AI দিয়ে গাছের রোগ নির্ণয়" নিয়ে আসেনি।
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              "PlantVillage Dataset (হাজার হাজার রেডিমেড ছবি)",
              "ChatGPT Wrapper (API কল করলেই অ্যাপ রেডি)",
              "Emotional Card (কৃষি প্রধান দেশ বলে সিম্প্যাথি)"
            ].map((item, idx) => (
              <div key={idx} className="bg-white shadow-sm p-4 rounded-lg border border-gray-100">
                <p className="text-gray-600 font-medium">{item}</p>
              </div>
            ))}
          </div>
          <p className="text-center font-semibold text-gray-800 mt-4">
            আমাদের জাজদের "চোখ উল্টানো" (Eye Roll) থেকে বাঁচতে হবে!
          </p>
        </div>
      )
    },
    {
      id: 3,
      title: "🔥 The Critical Difference",
      subtitle: "Cliché vs Context-Aware",
      icon: <ShieldAlert className="w-8 h-8 text-blue-500" />,
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full">
          {/* The Cliché Way */}
          <div className="bg-red-50 p-6 rounded-xl border border-red-100">
            <div className="flex items-center gap-2 mb-4">
              <XCircle className="text-red-600" />
              <h3 className="text-xl font-bold text-red-700">৯৯% টিম যা করে (Cliché)</h3>
            </div>
            <ul className="space-y-3 text-gray-700">
              <li>📸 <strong>User:</strong> ছবি তোলে।</li>
              <li>🤖 <strong>App:</strong> সোজা AI-কে পাঠায়।</li>
              <li>🧠 <strong>AI:</strong> ডাটাবেস চেক না করেই বলে "Late Blight"।</li>
              <li>💊 <strong>Result:</strong> অ্যাপ বলে "স্প্রে করো"।</li>
              <li className="font-bold text-red-600 mt-4 border-t border-red-200 pt-2">
                Fault: অ্যাপ জানে না এখন খরা নাকি বৃষ্টি। সে জানে না পাশে ট্যানারি আছে। সে ভুল ভাল ডায়াগনসিস দেয়।
              </li>
            </ul>
          </div>

          {/* Our Way */}
          <div className="bg-green-50 p-6 rounded-xl border border-green-100">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle className="text-green-600" />
              <h3 className="text-xl font-bold text-green-700">আমরা যা করছি (Context-Aware)</h3>
            </div>
            <ul className="space-y-3 text-gray-700">
              <li>🌍 <strong>Context:</strong> Pollution vs Disease ডিটেকশন।</li>
              <li>🏭 <strong>Logic:</strong> "Zone Logic" - সাভারের মাটি আর সিলেটের মাটি এক না।</li>
              <li>🧬 <strong>Check:</strong> AI চেক করে—এখন কি বৃষ্টি হচ্ছে? পাশে কি ইটের ভাটা আছে?</li>
              <li className="font-bold text-green-700 mt-4 border-t border-green-200 pt-2">
                Result: "থামুন! এটা রোগ না, এটা ইটের ভাটার ধোঁয়া। বিষ দিবেন না।" (জাজরা এটা পছন্দ করবে!)
              </li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 4,
      title: "💎 Our 3 Unique Selling Points (USPs)",
      subtitle: "আমাদের Ace Cards",
      icon: <TrendingUp className="w-8 h-8 text-purple-500" />,
      content: (
        <div className="space-y-4">
          <div className="flex items-start gap-4 bg-white p-4 rounded-lg shadow-sm border-l-4 border-purple-500">
            <div className="bg-purple-100 p-2 rounded-full"><MapPin className="text-purple-600" /></div>
            <div>
              <h4 className="font-bold text-lg text-gray-800">১. Abiotic Stress Detection (Ace Card)</h4>
              <p className="text-gray-600">বাংলাদেশের হ্যাকাথনে খুব কম টিমই এটা নিয়ে কাজ করেছে যে—"গাছের সমস্যাটা পোকার জন্য না, ইটের ভাটার ধোঁয়ার জন্য হচ্ছে।"</p>
            </div>
          </div>

          <div className="flex items-start gap-4 bg-white p-4 rounded-lg shadow-sm border-l-4 border-blue-500">
            <div className="bg-blue-100 p-2 rounded-full"><ShieldAlert className="text-blue-600" /></div>
            <div>
              <h4 className="font-bold text-lg text-gray-800">২. Community Map (Waze for Agro)</h4>
              <p className="text-gray-600">"প্রতিবেশী আক্রান্ত হলে আমিও অ্যালার্ট পাব"—এই ফিচারটা Waze অ্যাপের মতো। এটা সাধারণ Agro App-এ থাকে না।</p>
            </div>
          </div>

          <div className="flex items-start gap-4 bg-white p-4 rounded-lg shadow-sm border-l-4 border-green-500">
            <div className="bg-green-100 p-2 rounded-full"><Leaf className="text-green-600" /></div>
            <div>
              <h4 className="font-bold text-lg text-gray-800">৩. Eco-Remedy Logic</h4>
              <p className="text-gray-600">আমরা "কীটনাশক" এর বদলে "ডিটারজেন্ট পানি" বা "ছাই" সাজেস্ট করছি—এটা জাজদের কাছে Scientific & Eco-friendly মনে হবে।</p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 5,
      title: "🔪 Critic's Knife: Defense Strategy",
      subtitle: "জাজদের কঠিন প্রশ্নের উত্তর",
     
      content: (
        <div className="space-y-4 text-sm">
          {/* Q1 */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="font-bold text-red-600">Q1: "তোমরা কি কৃষি বিজ্ঞানী? ল্যাব টেস্ট করেছ নাকি গুগল?"</p>
            <p className="text-green-700 mt-1 font-medium">
              ✅ Defense: "আমরা SRDI-এর অফিসিয়াল রিপোর্ট এবং জিও-লোকেশন ডাটা ব্যবহার করছি। আমরা AI-কে অন্ধভাবে বিশ্বাস করছি না, আমরা AI-কে 'Constraint' বা লজিক দিয়ে বেধে দিয়েছি।"
            </p>
          </div>

          {/* Q2 */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="font-bold text-red-600">Q2: "গ্রামের কৃষকের তো ইন্টারনেট নাই, ইমেজ আপলোড হবে?"</p>
            <p className="text-green-700 mt-1 font-medium">
              ✅ Defense: "আমাদের অ্যাপটি লো-ব্যান্ডউইথের জন্য অপটিমাইজড। আর আমরা 'SMS Alert' সিস্টেম রেখেছি প্রতিবেশীদের জন্য (Future Plan)।"
            </p>
          </div>

          {/* Q3 */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="font-bold text-red-600">Q3: "ভুল হলে দায় কে নেবে? যদি ফসল নষ্ট হয়?"</p>
            <p className="text-green-700 mt-1 font-medium">
              ✅ Defense: "আমরা কনফিডেন্স স্কোর ৮০% এর নিচে হলে 'Unknown' দেখাই এবং কৃষি অফিসারের সাথে যোগাযোগের পরামর্শ দিই। আমরা 'ডাক্তার' না, আমরা 'ফার্স্ট এইড'।"
            </p>
          </div>
        </div>
      )
    },
    {
      id: 6,
      title: "🎤 How to Pitch (Storytelling)",
      subtitle: "যেভাবে কথা বললে আমরা জিতব",
      content: (
        <div className="flex flex-col items-center justify-center h-full space-y-6">
          <div className="bg-black text-white p-6 rounded-xl shadow-xl max-w-2xl text-center">
            <h3 className="text-xl font-bold mb-4 text-yellow-400">❌ Don't Say:</h3>
            <p className="text-lg opacity-80">"আমরা গাছের রোগ নির্ণয় করি।"</p>
            <p className="text-sm text-red-400 mt-2">(তাহলে আমরা হারব)</p>
          </div>

          <div className="bg-gradient-to-r from-green-600 to-green-800 text-white p-6 rounded-xl shadow-xl max-w-2xl text-center transform scale-105 transition-transform">
            <h3 className="text-xl font-bold mb-4 text-yellow-400">✅ Do Say:</h3>
            <p className="text-lg leading-relaxed">
              "আমরা <span className="font-bold text-yellow-300">রোগ এবং পরিবেশ দূষণের (Pollution)</span> পার্থক্য নির্ণয় করি, যাতে কৃষক ভুল করে বিষ না দেয় এবং মাটির ক্ষতি না হয়।"
            </p>
            <p className="text-sm text-green-200 mt-2">(তাহলে আমরা টপ ৩-এ থাকব)</p>
          </div>
        </div>
      )
    },
    {
      id: 7,
      title: "🚀 Final Verdict",
      subtitle: "Success Probability Matrix",
      content: (
        <div className="flex flex-col items-center justify-center h-full space-y-8">
          <h2 className="text-2xl font-bold text-gray-800">
            This is a "Common Topic" with a "Rare Solution".
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
            <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-blue-500 text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">7/10</div>
              <div className="font-bold text-gray-700">Innovation</div>
              <p className="text-xs text-gray-500 mt-2">Topic common, but approach is new</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-purple-500 text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">8/10</div>
              <div className="font-bold text-gray-700">Technical Complexity</div>
              <p className="text-xs text-gray-500 mt-2">Zone Logic + Context API layers</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-green-500 text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">9/10</div>
              <div className="font-bold text-gray-700">Social Impact</div>
              <p className="text-xs text-gray-500 mt-2">Pollution angle is very strong</p>
            </div>
          </div>

          <div className="bg-green-100 px-8 py-4 rounded-full mt-8">
            <p className="font-bold text-green-800 text-lg">
              ভয় পেও না। স্ট্র্যাটেজি চেঞ্জ করার দরকার নেই, শুধু "Storytelling" টা ঠিক করো!
            </p>
          </div>
        </div>
      )
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden min-h-[600px] flex flex-col">
        {/* Header */}
        <div className="bg-gray-900 text-white p-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Leaf className="text-green-400" />
              Agro AI Strategy Deck
            </h1>
            <p className="text-gray-400 text-sm">Target: Hackathon Win</p>
          </div>
          <div className="text-gray-400 font-mono">
            {currentSlide + 1} / {slides.length}
          </div>
        </div>

        {/* Slide Content */}
        <div className="flex-1 p-8 bg-gradient-to-br from-white to-gray-50 overflow-y-auto">
          <div className="mb-6 border-b pb-4">
            <div className="flex items-center gap-3">
              {slides[currentSlide].icon}
              <h2 className="text-3xl font-bold text-gray-800">{slides[currentSlide].title}</h2>
            </div>
            {slides[currentSlide].subtitle && (
              <p className="text-xl text-gray-500 mt-2 font-medium">{slides[currentSlide].subtitle}</p>
            )}
          </div>
          
          <div className="slide-body h-full">
            {slides[currentSlide].content}
          </div>
        </div>

        {/* Navigation */}
        <div className="bg-gray-50 p-4 border-t flex justify-between items-center">
          <button 
            onClick={prevSlide}
            className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors font-medium text-gray-700 shadow-sm"
          >
            <ChevronLeft size={20} /> Previous
          </button>
          
          <div className="flex gap-2">
            {slides.map((_, idx) => (
              <div 
                key={idx} 
                className={`w-3 h-3 rounded-full transition-all duration-300 ${idx === currentSlide ? 'bg-green-600 scale-125' : 'bg-gray-300'}`}
              />
            ))}
          </div>

          <button 
            onClick={nextSlide}
            className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium shadow-md"
          >
            Next <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AgroProjectStrategyDeck;