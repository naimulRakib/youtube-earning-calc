import Link from 'next/link';
import Calculator from './components/Calculator';
import { 
  TrendingUp, ShieldCheck, Zap, 
  BookOpen, Star, Lightbulb, 
  ChevronRight, Award, Landmark 
} from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-20">
      
      {/* ১. হিরো সেকশন */}
      <div className="bg-white border-b border-slate-200 pb-16 pt-10 relative overflow-hidden">
        {/* ব্যাকগ্রাউন্ড ডেকোরেশন */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-red-50 rounded-full blur-3xl -mr-20 -mt-20 opacity-60"></div>
        
        <div className="max-w-6xl mx-auto px-4 text-center relative z-10">
          <span className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-4 py-1.5 rounded-full text-xs font-bold mb-6 border border-red-200">
            <Award size={14} /> বাংলাদেশ সংস্করণ ২০২৬ 🇧🇩
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight leading-tight">
            ইউটিউব ইনকাম <span className="text-red-600">এস্টিমেটর</span>
          </h1>
          <p className="text-slate-600 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
            আপনার ইউটিউব চ্যানেলের ভিউ এবং ক্যাটাগরি অনুযায়ী বাংলাদেশ থেকে কত টাকা আয় করা সম্ভব, তার সঠিক হিসাব জানুন। ট্যাক্স, ব্যাংক চার্জ এবং সরকারি প্রণোদনা সহ।
          </p>
        </div>
      </div>

      {/* ২. ক্যালকুলেটর কন্টেইনার */}
     <div className="min-h-[600px] w-full bg-white rounded-xl shadow-sm">
        <Calculator />
        
        {/* ৩. নতুন ফিচর্ড সেকশন (গাইডলাইন ও রিসোর্স) */}
        <div className="grid md:grid-cols-3 gap-6 mt-16">
          <Link href="/blog" className="group bg-white p-8 rounded-3xl border border-slate-200 hover:border-red-500 transition-all hover:shadow-xl shadow-sm">
            <div className="bg-red-50 w-12 h-12 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <BookOpen className="text-red-600" />
            </div>
            <h3 className="text-xl font-bold mb-3 group-hover:text-red-600 flex items-center gap-2">
              ইউটিউব ব্লগ <ChevronRight size={18} />
            </h3>
            <p className="text-sm text-slate-500 leading-relaxed">২০২৬ সালে আয় বাড়ানোর কৌশল এবং নতুন সব আপডেট পান আমাদের ব্লগে।</p>
          </Link>

          <Link href="/guidelines" className="group bg-white p-8 rounded-3xl border border-slate-200 hover:border-blue-500 transition-all hover:shadow-xl shadow-sm">
            <div className="bg-blue-50 w-12 h-12 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Lightbulb className="text-blue-600" />
            </div>
            <h3 className="text-xl font-bold mb-3 group-hover:text-blue-600 flex items-center gap-2">
              সফল হওয়ার গাইড <ChevronRight size={18} />
            </h3>
            <p className="text-sm text-slate-500 leading-relaxed">শূন্য থেকে মনিটাইজেশন পর্যন্ত ধাপে ধাপে সফল হওয়ার প্রফেশনাল টিপস।</p>
          </Link>

          <Link href="/recommendations" className="group bg-white p-8 rounded-3xl border border-slate-200 hover:border-green-500 transition-all hover:shadow-xl shadow-sm">
            <div className="bg-green-50 w-12 h-12 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Star className="text-green-600" />
            </div>
            <h3 className="text-xl font-bold mb-3 group-hover:text-green-600 flex items-center gap-2">
              সেরা রিসোর্স <ChevronRight size={18} />
            </h3>
            <p className="text-sm text-slate-500 leading-relaxed">সেরা ব্যাংক, মাইক্রোফোন এবং এডিটিং সফটওয়্যার রিকমেন্ডেশন।</p>
          </Link>
        </div>

        {/* ৪. কেন আমাদের টুল ব্যবহার করবেন? (ইউনিক সেলিং পয়েন্ট) */}
        <div className="mt-20">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">আমাদের টুলের <span className="text-red-600">বিশেষত্ব</span></h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm text-center">
              <div className="bg-blue-50 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="text-blue-600" />
              </div>
              <h3 className="font-bold text-lg mb-3">সঠিক বাজার দর</h3>
              <p className="text-sm text-slate-500 leading-relaxed">আমরা বাংলাদেশের ২০টি ভিন্ন ক্যাটাগরির (Tech, Vlog, Gaming) রিয়েল-টাইম CPM রেট ব্যবহার করি।</p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm text-center">
              <div className="bg-yellow-50 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-6">
                <Zap className="text-yellow-600" />
              </div>
              <h3 className="font-bold text-lg mb-3">নিট ইনকাম হিসাব</h3>
              <p className="text-sm text-slate-500 leading-relaxed">শুধুমাত্র ডলার নয়, আমরা ব্যাংক চার্জ এবং ট্যাক্স কেটে হাতে কত টাকা পাবেন তার সঠিক হিসাব দেখাই।</p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm text-center">
              <div className="bg-green-50 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShieldCheck className="text-green-600" />
              </div>
              <h3 className="font-bold text-lg mb-3">সরকারি প্রণোদনা</h3>
              <p className="text-sm text-slate-500 leading-relaxed">রেমিট্যান্স হিসেবে ইউটিউব আয়ের ওপর যে ২.৫% ইনসেনটিভ পাওয়া যায়, তাও এখানে যুক্ত করা হয়েছে।</p>
            </div>
          </div>
        </div>

        {/* ৫. ব্যাংকিং ও ট্যাক্স ইনফো কার্ড (নতুন ফিচার) */}
        <div className="mt-20 bg-slate-900 rounded-[2.5rem] p-8 md:p-12 text-white relative overflow-hidden">
          <div className="absolute bottom-0 right-0 opacity-10">
            <Landmark size={200} />
          </div>
          <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">২০২৬ এর নতুন ট্যাক্স ও <br />ব্যাংকিং গাইডলাইন</h2>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="mt-1 bg-red-600 rounded-full p-1"><ChevronRight size={12} /></div>
                  <p className="text-slate-300 text-sm">বার্ষিক আয় ৩.৫ লক্ষ টাকার বেশি হলে রিটার্ন জমা দেওয়া বাধ্যতামূলক।</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 bg-red-600 rounded-full p-1"><ChevronRight size={12} /></div>
                  <p className="text-slate-300 text-sm">ইসলামী ব্যাংক বা ব্যাংক এশিয়া বর্তমানে দ্রুত পেমেন্ট প্রসেস করছে।</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 bg-red-600 rounded-full p-1"><ChevronRight size={12} /></div>
                  <p className="text-slate-300 text-sm">সুইফট (SWIFT) চার্জ বাবদ গড়ে ৫০০-১২০০ টাকা ব্যাংক কেটে নিতে পারে।</p>
                </li>
              </ul>
            </div>
            <div className="bg-white/5 backdrop-blur-sm p-8 rounded-3xl border border-white/10">
              <h4 className="font-bold text-xl mb-4">একটি পরামর্শ:</h4>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                আপনার ব্যাংক অ্যাকাউন্টে টাকা আসার পর সরকার ২.৫% ইনসেনটিভ যোগ করে দেয়। এটি নিশ্চিত করতে ব্যাংকে আপনার আয়ের উৎস (AdSense Revenue) হিসেবে সঠিক ডিক্লারেশন দিন।
              </p>
              <Link href="/contact" className="inline-block bg-white text-slate-900 px-6 py-2.5 rounded-full text-sm font-bold hover:bg-slate-200 transition-colors">
                আরও সাহায্য প্রয়োজন?
              </Link>
            </div>
          </div>
        </div>

        {/* ৬. এসইও কন্টেন্ট (আগের কন্টেন্ট বজায় রাখা হয়েছে) */}
        <article className="mt-20 bg-white p-8 md:p-12 rounded-[2.5rem] border border-slate-200 shadow-sm prose max-w-none prose-headings:font-bold prose-a:text-red-600 prose-p:text-slate-600">
          <h2 className="text-3xl">কিভাবে ইউটিউব আয়ের হিসাব করা হয়?</h2>
          <p className="text-lg">
            ইউটিউব থেকে আয়ের হিসাবটি মূলত নির্ভর করে <strong>CPM (Cost Per Mille)</strong> এর ওপর। অর্থাৎ প্রতি ১০০০ ভিউতে বিজ্ঞাপনদাতারা কত টাকা খরচ করছেন। বাংলাদেশে এই রেট সাধারণত $০.৩০ থেকে $২.৫০ পর্যন্ত হয়ে থাকে।
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 mt-8 not-prose">
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <div className="w-2 h-6 bg-red-600 rounded-full"></div>
                গ্রস ইনকাম বনাম নেট ইনকাম
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed mb-4">
                অনেক ক্যালকুলেটর আপনাকে ভুল তথ্য দেয় কারণ তারা ইউটিউবের ৪৫% শেয়ার বাদ দেয় না। আমাদের <strong>BD Creator Calc</strong> আপনাকে তিনটি ধাপে নিখুঁত হিসাব দেখায়:
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-sm font-medium"><ChevronRight size={14} className="text-red-600"/> Gross Income: মোট বিজ্ঞাপন খরচ</li>
                <li className="flex items-center gap-2 text-sm font-medium"><ChevronRight size={14} className="text-red-600"/> AdSense Revenue: আপনার ৫৫% শেয়ার</li>
                <li className="flex items-center gap-2 text-sm font-medium"><ChevronRight size={14} className="text-red-600"/> Net Take Home: সব খরচ পর হাতে পাওয়া টাকা</li>
              </ul>
            </div>
            
            <div className="bg-red-50 p-6 rounded-2xl border border-red-100 flex flex-col justify-center">
               <h4 className="font-bold text-red-900 mb-2 italic">&quot;Smart Tip for Creators&quot;</h4>
               <p className="text-sm text-red-800 leading-relaxed">
                 আপনার ভিডিও যদি ৮ মিনিটের বেশি বড় হয়, তবে আপনি মাঝখানে (Mid-roll) বিজ্ঞাপন দিতে পারবেন। এতে করে সাধারণ ভিডিওর তুলনায় আপনার আয় ১.৫ গুণ পর্যন্ত বৃদ্ধি পেতে পারে!
               </p>
            </div>
          </div>
        </article>
      </div>

      {/* ৭. সিম্পল ফুটার */}
      <footer className="bg-slate-900 text-slate-400 py-12 text-center text-sm border-t border-slate-800">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-center gap-6 mb-8">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
          </div>
          <p className="mb-2">© ২০২৬ বিডি ক্রিয়েটর ক্যালক | বাংলাদেশের নির্মাতাদের জন্য তৈরি ❤️</p>
          <p className="text-[10px] uppercase tracking-widest opacity-50 font-bold">A Product of takaincome.com</p>
        </div>
      </footer>
    </main>
  );
}