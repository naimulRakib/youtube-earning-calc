import type { Metadata } from "next";
import { Noto_Sans_Bengali, Jersey_25, Tiro_Bangla } from "next/font/google";
import Link from "next/link";
import "./globals.css";

// ১. সবগুলো ফন্টকে Next.js-এর নিজস্ব অপ্টিমাইজড সিস্টেমে নিয়ে আসা
const notoBengali = Noto_Sans_Bengali({ 
  subsets: ["bengali"], 
  weight: ['400', '700'],
  display: 'swap',
  variable: '--font-noto',
});

const jersey25 = Jersey_25({ 
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jersey',
});

const tiroBangla = Tiro_Bangla({ 
  weight: ['400'],
  subsets: ['bengali'],
  display: 'swap',
  variable: '--font-tiro',
});

export const metadata: Metadata = {
  title: "ইউটিউব ইনকাম এস্টিমেটর বাংলাদেশ ২০২৬ | BD Creator Calc",
  description: "বাংলাদেশ থেকে ইউটিউবে কত ভিউতে কত টাকা পাওয়া যায়?",
  metadataBase: new URL('https://calculator.takaincome.com'), // Add this
  alternates: {
    canonical: '/', // This tells Google this is the main version
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // ২. ফন্ট ভেরিয়েবলগুলো এখানে যোগ করা হয়েছে
    <html lang="bn" className={`${notoBengali.variable} ${jersey25.variable} ${tiroBangla.variable}`}>
      <head>
        {/* ৩. চেইনিং রিকোয়েস্ট কমাতে প্রি-কানেক্ট যোগ করা হয়েছে */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${notoBengali.className} bg-slate-50 text-slate-900 flex flex-col min-h-screen antialiased`}>
        
        {/* --- NAVBAR --- */}
        <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
            <Link href="/" className="font-black text-xl text-slate-900 flex items-center gap-2">
              <span className="bg-red-600 text-white px-2 py-1 rounded">BD</span> 
              <span className="text-lg font-bold">Youtube Income Calculator Bangladesh</span>
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

        {/* --- FOOTER --- */}
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
                  <li><Link href="/privacy-policy" className="hover:text-red-600 transition">Privacy Policy (গোপনীয়তা নীতি)</Link></li>
                  <li><Link href="/terms" className="hover:text-red-600 transition">Terms of Service (শর্তাবলী)</Link></li>
                </ul>
              </div>
            </div>

            <div className="border-t border-slate-100 pt-8 text-center">
              <p className="text-xs text-slate-400">
                &copy; {new Date().getFullYear()} Taka Estimation Tool | Powered by <a href="https://takaincome.com" className="underline hover:text-red-600">TakaIncome.com</a>
              </p>
            </div>
          </div>
        </footer>

      </body>
    </html>
  );
}