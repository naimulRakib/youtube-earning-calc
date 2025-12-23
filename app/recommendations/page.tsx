import { Camera, CreditCard, Headphones, Mic } from 'lucide-react';

export default function Recommendations() {
  const products = [
    { name: "ব্যাংক এশিয়া", type: "Bank", benefit: "দ্রুত পেমেন্ট এবং ভালো রেট", icon: <CreditCard/> },
    { name: "ইসলামী ব্যাংক", type: "Bank", benefit: "রেমিট্যান্স ইনসেনটিভের জন্য সেরা", icon: <CreditCard/> },
    { name: "Boya BY-M1", type: "Mic", benefit: "বাজেট ফ্রেন্ডলি ক্লিয়ার সাউন্ড", icon: <Mic/> },
    { name: "Canva Pro", type: "Design", benefit: "থাম্বনেইল তৈরির সহজ সমাধান", icon: <Camera/> },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-black mb-4 text-slate-900">Expert Recommendations</h1>
      <p className="text-slate-500 mb-12">সেরা ব্যাংক এবং গিয়ার যা আপনার ইউটিউব জার্নিকে সহজ করবে।</p>

      <div className="grid md:grid-cols-2 gap-6">
        {products.map((item, i) => (
          <div key={i} className="flex items-center gap-6 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:border-red-200 transition">
            <div className="bg-slate-100 p-4 rounded-xl text-slate-700">{item.icon}</div>
            <div>
              <span className="text-[10px] font-bold bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full uppercase tracking-tighter">
                {item.type}
              </span>
              <h3 className="text-lg font-bold text-slate-800 mt-1">{item.name}</h3>
              <p className="text-sm text-slate-500">{item.benefit}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}