import { NextResponse } from 'next/server';

// 🧠 DSA Strategy: Hash Map for O(1) Lookup Speed
// Data: Estimated CPM (Cost Per 1000 views) in USD for Bangladesh (BD) and Global (US/UK)
const CPM_DATA: Record<string, { bd: number; global: number; difficulty: string; tip: string }> = {
  "Tech & Gadgets": { bd: 1.20, global: 7.50, difficulty: "High", tip: "Focus on unboxing & affiliate links." },
  "Finance & Crypto": { bd: 2.50, global: 15.00, difficulty: "Extreme", tip: "High paying ads. Target keywords like 'Trading' or 'Binance'." },
  "Vlogging (Lifestyle)": { bd: 0.40, global: 2.50, difficulty: "Medium", tip: "Volume is key. Upload daily or 3x weekly." },
  "Gaming": { bd: 0.30, global: 2.00, difficulty: "High", tip: "Livestreams earn more via SuperChat than ads." },
  "Education (Tutorials)": { bd: 0.60, global: 4.00, difficulty: "Low", tip: "Evergreen content. Good for long-term passive income." },
  "News & Politics": { bd: 0.35, global: 2.00, difficulty: "Medium", tip: "Viral potential but risk of demonetization." },
  "Cooking & Food": { bd: 0.50, global: 3.50, difficulty: "Medium", tip: "Visuals matter. Great for sponsorship from food brands." },
  "Health & Fitness": { bd: 0.70, global: 5.00, difficulty: "High", tip: "Sell diet plans or supplements for extra income." },
  "Comedy/Skits": { bd: 0.35, global: 2.50, difficulty: "Hard", tip: "Shorts grow fast, but long-form makes money." },
  "Islamic/Religious": { bd: 0.30, global: 1.50, difficulty: "Low", tip: "Very loyal audience. Donations/Patreon work well." },
};

export async function GET() {
  // Simulate network delay to show "loading" state features (optional, set to 0 for production)
  // await new Promise(resolve => setTimeout(resolve, 500));
  
  return NextResponse.json({
    timestamp: new Date().toISOString(),
    categories: Object.keys(CPM_DATA),
    rates: CPM_DATA
  });
}