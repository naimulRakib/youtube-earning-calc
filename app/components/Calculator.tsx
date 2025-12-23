'use client';

import React, { useState, useEffect } from 'react';
import { NICHES } from '@/lib/data';
import { calculateEarnings, CalculationResult } from '@/lib/logic';
import GrowthChart from './GrowthChart';
import { Banknote, Info, TrendingUp, Youtube } from 'lucide-react';

export default function Calculator() {
  // States
  const [niche, setNiche] = useState('tech_review');
  const [views, setViews] = useState(10000);
  const [bdAudience, setBdAudience] = useState(80);
  const [isShorts, setIsShorts] = useState(false);
  
  const [result, setResult] = useState<CalculationResult | null>(null);

  // Real-time Calculation
  useEffect(() => {
    const data = calculateEarnings(views, niche, bdAudience, isShorts);
    setResult(data);
  }, [views, niche, bdAudience, isShorts]);

  if (!result) return null;

  return (
    <div className="grid lg:grid-cols-12 gap-8">
      
      {/* বাম পাশ: কন্ট্রোল প্যানেল */}
      <div className="lg:col-span-7 space-y-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            <Youtube className="text-red-600" /> চ্যানেলের তথ্য দিন
          </h2>

          <div className="space-y-6">
            {/* ১. নিশ সিলেক্টর */}
            <div>
              <label className="block text-sm font-bold text-slate-600 mb-2">ভিডিওর বিষয় (Category)</label>
              <select 
                value={niche} 
                onChange={(e) => setNiche(e.target.value)}
                className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 focus:ring-2 focus:ring-red-500 outline-none"
              >
                {Object.entries(NICHES).map(([key, val]) => (
                  <option key={key} value={key}>{val.label}</option>
                ))}
              </select>
              <p className="text-xs text-slate-500 mt-1 pl-1">{NICHES[niche].desc}</p>
            </div>

            {/* ২. ভিউ স্লাইডার */}
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-bold text-slate-600">মাসিক ভিউ</label>
                <span className="text-red-600 font-bold bg-red-50 px-2 py-0.5 rounded text-sm">
                  {views.toLocaleString()}
                </span>
              </div>
              <input 
                type="range" min="1000" max="2000000" step="1000"
                value={views}
                onChange={(e) => setViews(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-red-600"
              />
            </div>

            {/* ৩. দর্শক লোকেশন */}
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-bold text-slate-600">দর্শক (বাংলাদেশী বনাম বিদেশী)</label>
                <span className="text-blue-600 font-bold text-xs">
                  {bdAudience}% দেশী - {100 - bdAudience}% বিদেশী
                </span>
              </div>
              <input 
                type="range" min="0" max="100" step="5"
                value={bdAudience}
                onChange={(e) => setBdAudience(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <p className="text-[10px] text-slate-400 mt-1">
                টিপস: বিদেশী দর্শক বেশি হলে আয় (CPM) অনেক বেড়ে যায়।
              </p>
            </div>

            {/* ৪. শর্টস টগল */}
            <div className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer" onClick={() => setIsShorts(!isShorts)}>
              <div className={`w-5 h-5 rounded border flex items-center justify-center ${isShorts ? 'bg-red-600 border-red-600' : 'bg-white border-slate-400'}`}>
                {isShorts && <div className="w-2 h-2 bg-white rounded-full"></div>}
              </div>
              <span className="text-sm font-medium text-slate-700 select-none">এটি ইউটিউব শর্টস (Shorts) চ্যানেল</span>
            </div>
          </div>
        </div>

        {/* এআই টিপস বক্স */}
        <div className="bg-blue-50 p-5 rounded-2xl border border-blue-100 flex gap-3">
          <Info className="text-blue-600 shrink-0" />
          <div>
            <h4 className="text-sm font-bold text-blue-800 mb-1">স্মার্ট টিপস</h4>
            <p className="text-xs text-blue-700 leading-relaxed">
              আপনার নির্বাচিত <strong>{NICHES[niche].label}</strong> ক্যাটাগরিতে বাংলাদেশের গড় CPM হলো <strong>${NICHES[niche].bd_cpm}</strong>। আয় বাড়াতে ৮ মিনিটের বড় ভিডিও তৈরি করুন এবং ভিডিওর মাঝখানে (Mid-roll) বিজ্ঞাপন চালু রাখুন।
            </p>
          </div>
        </div>
      </div>

      {/* ডান পাশ: রেজাল্ট ড্যাশবোর্ড */}
      <div className="lg:col-span-5 space-y-6">
        
        {/* প্রধান ইনকাম কার্ড */}
        <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
          
          <h3 className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">
            হাতে প্রাপ্ত নিট আয় (Net Take Home)
          </h3>
          <div className="text-4xl font-black mb-1">
            ৳ {result.finalTakeHomeBdt.toLocaleString()}
          </div>
          <p className="text-xs text-slate-400 mb-6">
            (সব খরচ এবং ট্যাক্স কাটার পর আনুমানিক)
          </p>

          {/* ব্রেকডাউন টেবিল */}
          <div className="space-y-2 border-t border-slate-700 pt-4 text-xs">
            <div className="flex justify-between text-slate-300">
              <span>মোট ইউটিউব রেভিনিউ (AdSense)</span>
              <span className="font-bold">৳ {result.creatorsRevenueBdt.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-green-400">
              <span>সরকারি প্রণোদনা (+২.৫%)</span>
              <span className="font-bold">+ ৳ {result.incentiveBdt.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-red-400">
              <span>ব্যাংক চার্জ (Swift)</span>
              <span>- ৳ {result.bankCharge}</span>
            </div>
            <div className="flex justify-between text-red-400">
              <span>আনুমানিক ট্যাক্স (TDS)</span>
              <span>- ৳ {result.taxAmount.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* গ্রস ইনকাম কার্ড */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <h4 className="text-xs font-bold text-slate-500 uppercase">বিজ্ঞাপনদাতাদের মোট খরচ (Gross)</h4>
            <p className="text-xl font-bold text-slate-800">৳ {result.grossRevenueBdt.toLocaleString()}</p>
          </div>
          <div className="bg-slate-100 p-2 rounded-lg">
            <Banknote className="text-slate-600" />
          </div>
        </div>

        {/* গ্রোথ চার্ট */}
        <GrowthChart monthlyIncome={result.finalTakeHomeBdt} />

      </div>
    </div>
  );
}