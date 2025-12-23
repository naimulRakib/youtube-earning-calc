import { Lightbulb, TrendingUp } from 'lucide-react';

interface AiProps {
  niche: string;
  earnings: number;
  views: number;
  isTargetMode: boolean;
}

export default function AiAnalyst({ niche, earnings, views, isTargetMode }: AiProps) {
  // 🧠 বাংলা লজিক ইঞ্জিন
  const getStrategy = () => {
    if (views < 5000 && !isTargetMode) return "মাইক্রো-ইনফ্লুয়েন্সার ফেজ: এখন আয়ের চিন্তা না করে সাবস্ক্রাইবার এবং কমিউনিটি তৈরিতে মনোযোগ দিন। ফেসবুক গ্রুপে ভিডিও শেয়ার করুন।";
    if (earnings > 500) return "প্রো লেভেল: আপনার আয় ভালো হচ্ছে। এখন ভিডিওর সংখ্যা বাড়াতে একজন এডিটর নিয়োগ দিতে পারেন। স্পন্সরশিপ খোঁজা শুরু করুন।";
    if (niche.includes("Finance") || niche.includes("Tech")) return "উচ্চ CPM অ্যালার্ট: এই ক্যাটাগরিতে আয় অনেক বেশি। ৮ মিনিটের বেশি ভিডিও তৈরি করুন যাতে মিড-রোল অ্যাড বসানো যায়।";
    if (niche.includes("Vlogging")) return "লাইফস্টাইল টিপস: ব্লগের ক্ষেত্রে আপনার ব্যক্তিত্বই আসল। দর্শকদের সাথে নিয়মিত কমেন্টে কানেক্ট থাকুন।";
    return "গ্রোথ হ্যাক: ইউটিউব শর্টস (Shorts) আপলোড করে দ্রুত ভিউ বাড়ান, কিন্তু আয় বাড়াতে লং-ভিডিওর বিকল্প নেই।";
  };

  return (
    <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-6 rounded-xl shadow-lg border border-slate-700 mt-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4 opacity-10">
        <Lightbulb size={100} />
      </div>
      
      <h3 className="text-lg font-bold flex items-center gap-2 mb-4 text-emerald-400">
        <TrendingUp size={20} /> 
        AI গ্রোথ অ্যানালিস্ট 🤖
      </h3>
      
      <div className="space-y-4 relative z-10">
        <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-600">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">কৌশলগত পরামর্শ</span>
          <p className="text-sm font-medium mt-1 leading-relaxed">{getStrategy()}</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 bg-indigo-900/30 rounded-lg border border-indigo-500/30">
            <span className="text-[10px] text-indigo-300 block mb-1">কম্পিটিশন</span>
            <p className="font-bold text-indigo-100 text-sm">{niche.includes("Finance") ? "খুব বেশি (Hard)" : "মাঝারি (Medium)"}</p>
          </div>
          <div className="p-3 bg-pink-900/30 rounded-lg border border-pink-500/30">
            <span className="text-[10px] text-pink-300 block mb-1">প্রয়োজনীয় ভিডিও</span>
            <p className="font-bold text-pink-100 text-sm">মাসে {Math.ceil(views / 4000)} টি+</p>
          </div>
        </div>
      </div>
    </div>
  );
}