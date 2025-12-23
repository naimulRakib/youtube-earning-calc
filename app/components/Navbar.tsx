import Link from 'next/link';
import { Calculator } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <div className="bg-blue-600 p-2 rounded-lg text-white">
                <Calculator size={24} />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xl tracking-tight text-gray-900">TakaIncome Tools</span>
                <span className="text-xs text-blue-600 font-semibold uppercase tracking-wider">Bangladesh Edition</span>
              </div>
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/bkash-fee-calculator" className="text-gray-600 hover:text-pink-600 font-medium transition">MFS Fee</Link>
            <Link href="/freelance-converter" className="text-gray-600 hover:text-green-600 font-medium transition">Freelance</Link>
            <Link href="/youtube-earnings" className="text-gray-600 hover:text-red-600 font-medium transition">YouTuber</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}