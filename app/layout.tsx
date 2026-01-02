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
        
   

        {/* --- MAIN CONTENT --- */}
        <main className="flex-grow">
          {children}
        </main>

  

      </body>
    </html>
  );
}