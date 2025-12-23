import React from 'react';

export default function LegalLayout({ title, children }: { title: string, children: React.ReactNode }) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-black text-slate-900 mb-8 border-b-4 border-red-600 pb-4 inline-block">
        {title}
      </h1>
      <div className="prose prose-slate max-w-none prose-headings:font-bold prose-p:leading-relaxed text-slate-600">
        {children}
      </div>
    </div>
  );
}