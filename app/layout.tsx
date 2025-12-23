import type { Metadata } from "next";
import { Noto_Sans_Bengali } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const bengaliFont = Noto_Sans_Bengali({ subsets: ["bengali"], weight: ['400', '700'] });

export const metadata: Metadata = {
  title: "ইউটিউব ইনকাম এস্টিমেটর বাংলাদেশ ২০২৬ | BD Creator Calc",
  description: "বাংলাদেশ থেকে ইউটিউবে কত ভিউতে কত টাকা পাওয়া যায়? ট্যাক্স এবং ব্যাংক চার্জ সহ সঠিক হিসাব জানুন।",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn">
      <body className={`${bengaliFont.className} bg-slate-50 text-slate-900 flex flex-col min-h-screen`}>
        
        {/* --- NAVBAR --- */}
        <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
            <Link href="/" className="font-black text-xl text-slate-900 flex items-center gap-2">
              <span className="bg-red-600 text-white px-2 py-1 rounded">BD</span> 
             <h1 className="text-lg"><span>Youtube Income Calculator Bangladesh</span></h1>
            </Link>
            
            <div className="hidden md:flex items-center gap-6 text-sm font-bold text-slate-600">
              <Link href="/" className="hover:text-red-600 transition">ক্যালকুলেটর</Link>
              <Link href="/about" className="hover:text-red-600 transition">আমাদের সম্পর্কে</Link>
              <Link href="/contact" className="hover:text-red-600 transition">যোগাযোগ</Link>
            </div>
          </div>
        </nav>

        {/* --- MAIN CONTENT --- */}
        <main className="flex-grow">
          {children}
        </main>

        {/* --- FOOTER (AdSense এর জন্য সবচেয়ে গুরুত্বপূর্ণ) --- */}
        <footer className="bg-white border-t border-slate-200 pt-12 pb-8">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div>
                <h3 className="font-bold text-lg mb-4 text-slate-900">BD Taka Estimation Tool</h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  বাংলাদেশের কন্টেন্ট ক্রিয়েটরদের জন্য তৈরি বিশেষায়িত আয় প্রাক্কলন টুল। আমরা ২০২৬ সালের বাজার পরিস্থিতি ও ট্যাক্স নীতি অনুসরণ করি।
                </p>
              </div>
              
              <div>
                <h4 className="font-bold text-sm uppercase tracking-widest text-slate-400 mb-4">গুরুত্বপূর্ণ লিঙ্ক</h4>
                <ul className="space-y-2 text-sm font-medium text-slate-600">
                  <li><Link href="/about" className="hover:text-red-600 tracking-tight transition">About Us (আমাদের সম্পর্কে)</Link></li>
                  <li><Link href="/contact" className="hover:text-red-600 tracking-tight transition">Contact Us (যোগাযোগ)</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-sm uppercase tracking-widest text-slate-400 mb-4">আইনি তথ্য (Legal)</h4>
                <ul className="space-y-2 text-sm font-medium text-slate-600">
                  <li><Link href="/privacy-policy" className="hover:text-red-600 transition">Privacy Policy (গোপনীয়তা নীতি)</Link></li>
                  <li><Link href="/terms" className="hover:text-red-600 transition">Terms of Service (শর্তাবলী)</Link></li>
                </ul>
              </div>
            </div>

            <div className="border-t border-slate-100 pt-8 text-center">
              <p className="text-xs text-slate-400">
                &copy; Taka Estimation Tool | Powered by <a href="https://takaincome.com" className="underline">TakaIncome.com</a>
              </p>
            </div>
          </div>
        </footer>

      </body>
    </html>
  );
}