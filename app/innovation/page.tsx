'use client';

import React from 'react';
import { 
  Lightbulb, 
  WifiOff, 
  Coins, 
  Truck, 
  ArrowUpRight 
} from 'lucide-react';

const InnovationBoosterSlide = () => {
  const innovationPoints = [
    {
      id: 1,
      title: "Predictive ROI Engine (লাভের হিসাব)",
      icon: <Coins className="w-8 h-8 text-yellow-600" />,
      desc: "আমরা শুধু রোগ ধরি না, আমরা টাকার হিসাব দিই।",
      detail: "অ্যাপ বলবে: 'এই ওষুধটি কিনতে ১৫০ টাকা লাগবে, কিন্তু এটি না দিলে আপনার ৫০০০ টাকার ফসল নষ্ট হবে।' কৃষক যখন দেখবে ১০ গুণ লাভ, সে তখনই অ্যাকশন নেবে।",
      impact: "Economic Innovation"
    },
    {
      id: 2,
      title: "Offline-First / SMS Mode (নেটহীন সেবা)",
      icon: <WifiOff className="w-8 h-8 text-gray-600" />,
      desc: "স্মার্টফোন নেই? ইন্টারনেট নেই? সমস্যা নেই।",
      detail: " ইমেজ প্রসেসিং সার্ভারে হলেও, রেজাল্ট এবং সতর্কবার্তা আমরা 'SMS' এর মাধ্যমে পাঠাবো। গ্রাম বাংলার রিয়েলিটি আমরা বুঝি।",
      impact: "Technological Inclusivity"
    },
    {
      id: 3,
      title: "Supply Chain Alert (দোকানদার কানেকশন)",
      icon: <Truck className="w-8 h-8 text-blue-600" />,
      desc: "রোগ হওয়ার আগেই ওষুধের দোকানে খবর।",
      detail: "যখনই ৫ জন কৃষক 'Late Blight' রিপোর্ট করবে, এলাকার সারের ডিলারকে অটোমেটিক নোটিফিকেশন যাবে: 'আপনার এলাকায় ফাঙ্গিসাইডের চাহিদা বাড়বে, স্টক রেডি রাখুন।'",
      impact: "Business Model Innovation"
    }
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden min-h-[600px] flex flex-col">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-900 to-indigo-900 text-white p-8">
          <div className="flex items-center gap-3 mb-2">
            <Lightbulb className="w-10 h-10 text-yellow-400 animate-pulse" />
            <h1 className="text-3xl font-bold">Boosting Innovation Score</h1>
          </div>
          <p className="text-purple-200 text-lg">
            কিভাবে প্রজেক্টটিকে "Good" থেকে "Outstanding" এ নেওয়া যায়?
          </p>
        </div>

        {/* Content Body */}
        <div className="flex-1 p-8 bg-gray-50">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {innovationPoints.map((item) => (
              <div key={item.id} className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow border-t-4 border-indigo-500 flex flex-col h-full">
                <div className="bg-indigo-50 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
                <p className="text-indigo-600 font-medium text-sm mb-3">{item.desc}</p>
                <p className="text-gray-600 text-sm leading-relaxed flex-grow">
                  {item.detail}
                </p>
                <div className="mt-4 pt-4 border-t border-gray-100 flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
                  <ArrowUpRight size={14} />
                  {item.impact}
                </div>
              </div>
            ))}
          </div>

          {/* The Pitch Script Section */}
          <div className="mt-10 bg-indigo-900 text-white p-6 rounded-xl shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Lightbulb size={100} />
            </div>
            <h4 className="text-lg font-bold text-yellow-400 mb-2">🎤 Speaker Notes (Innovation Pitch):</h4>
            <p className="italic text-indigo-100 leading-relaxed">
              "Judges, আমরা শুধু একটি 'Diagnosis Tool' বানাইনি। আমরা দেখেছি কৃষকের আসল সমস্যা কোথায়।
              ১. টাকা বাঁচানো (ROI), ২. কানেক্টিভিটি (Offline SMS), এবং ৩. সাপ্লাই চেইন (Dealer Alert)। 
              আমরা পুরো ইকোসিস্টেম নিয়ে কাজ করছি, শুধু একটা পাতা নিয়ে নয়।"
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default InnovationBoosterSlide;