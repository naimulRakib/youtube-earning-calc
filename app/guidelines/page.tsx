import { BookOpen, CheckCircle, DollarSign, ShieldCheck } from 'lucide-react';

export default function Guidelines() {
  const steps = [
    { title: "চ্যানেল সেটআপ", desc: "সঠিক ক্যাটাগরি এবং কিওয়ার্ড নির্বাচন করুন।", icon: <CheckCircle className="text-green-500"/> },
    { title: "মনিটাইজেশন রুলস", desc: "১০০০ সাবস্ক্রাইবার এবং ৪০০০ ঘণ্টা ওয়াচটাইম পূরণ করুন।", icon: <DollarSign className="text-blue-500"/> },
    { title: "ট্যাক্স ও ব্যাংকিং", desc: "TIN সার্টিফিকেট তৈরি করুন এবং সঠিক ব্যাংক অ্যাকাউন্ট যুক্ত করুন।", icon: <ShieldCheck className="text-purple-500"/> },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-black mb-8 text-slate-900 border-b-4 border-red-600 pb-2 inline-block">
        YouTube Earning Guidelines
      </h1>
      
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        {steps.map((step, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition">
            <div className="mb-4">{step.icon}</div>
            <h3 className="text-xl font-bold mb-2">{step.title}</h3>
            <p className="text-slate-500 text-sm leading-relaxed">{step.desc}</p>
          </div>
        ))}
      </div>

      <article className="prose prose-slate max-w-none bg-white p-8 rounded-2xl border border-slate-100">
        <h2>বাংলাদেশে ইউটিউব শুরুর আগে যা জানা জরুরি</h2>
        <p>
          ২০২৬ সালে ইউটিউব অ্যালগরিদম অনেক বেশি স্মার্ট। এখন শুধুমাত্র ভিডিও বানালেই হয় না, সেটির সঠিক এসইও (SEO) এবং অডিয়েন্স রিটেনশন নিশ্চিত করতে হয়।
        </p>
        <h3>কিভাবে ১ মাসের মধ্যে মনিটাইজেশন পাবেন?</h3>
        <ul>
          <li><strong>Shorts এর ব্যবহার:</strong> শর্টস ভিডিওর মাধ্যমে দ্রুত সাবস্ক্রাইবার বাড়ান।</li>
          <li><strong>নিশ সিলেকশন:</strong> হাই-সিপিএম (Tech/Finance) ক্যাটাগরি নিয়ে কাজ করুন।</li>
          <li><strong>রেগুলারিটি:</strong> সপ্তাহে অন্তত ৩টি ভিডিও আপলোড করুন।</li>
        </ul>
      </article>
    </div>
  );
}