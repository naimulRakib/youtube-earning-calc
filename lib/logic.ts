import { FISCAL_CONSTANTS, NICHES } from './data';

export interface CalculationResult {
  estimatedCpm: number;
  grossRevenueBdt: number; // ইউটিউব কাটার আগে (Total Ad Spend)
  creatorsRevenueBdt: number; // ৫৫% যা অ্যাডসেন্সে ঢোকে
  incentiveBdt: number; // ২.৫%
  bankCharge: number;
  taxAmount: number;
  finalTakeHomeBdt: number; // পকেটে যা আসবে
}

export function calculateEarnings(
  views: number,
  nicheKey: string,
  bdAudiencePercent: number, // ০-১০০
  isShorts: boolean
): CalculationResult {
  const niche = NICHES[nicheKey] || NICHES['tech_review'];
  
  // ১. লোকেশন অনুযায়ী ব্লেন্ডেড CPM বের করা
  const globalPercent = 100 - bdAudiencePercent;
  let weightedCpm = ((niche.bd_cpm * bdAudiencePercent) + (niche.global_cpm * globalPercent)) / 100;

  // ২. শর্টস এর জন্য CPM অ্যাডজাস্টমেন্ট (শর্টস এ লং ভিডিওর ১-২% আয় হয়)
  if (isShorts) {
    weightedCpm = weightedCpm * 0.015; 
  }

  // ৩. ডলার আয় বের করা (ক্রিয়েটরের ৫৫%)
  const creatorsRevenueUsd = (views / 1000) * weightedCpm;
  
  // ৪. টোটাল অ্যাড স্পেন্ড (Gross Revenue - ১০০%) বের করা
  // Creator gets 55%, so Gross = Creator / 0.55
  const grossRevenueUsd = creatorsRevenueUsd / FISCAL_CONSTANTS.CREATOR_SHARE;

  // ৫. বাংলা টাকায় রূপান্তর
  const grossRevenueBdt = grossRevenueUsd * FISCAL_CONSTANTS.DOLLAR_RATE;
  const creatorsRevenueBdt = creatorsRevenueUsd * FISCAL_CONSTANTS.DOLLAR_RATE;

  // ৬. রেমিট্যান্স ইনসেনটিভ (২.৫%)
  const incentiveBdt = creatorsRevenueBdt * FISCAL_CONSTANTS.REMITTANCE_INCENTIVE;

  // ৭. ব্যাংক চার্জ (যদি আয় ৫০০ টাকার কম হয়, চার্জ ০ ধরা হলো লজিকের খাতিরে)
  let bankCharge = 0;
  if (creatorsRevenueBdt > 1000) {
    bankCharge = FISCAL_CONSTANTS.BANK_SWIFT_CHARGE;
  }

  // ৮. ট্যাক্স ক্যালকুলেশন (খুব সাধারণ স্ল্যাব)
  // বাৎসরিক আয় ৩.৫ লাখের বেশি হলে কর প্রযোজ্য হতে পারে। আমরা মাসিক গড় ধরছি।
  // মাসিক ২৯,০০০ টাকার বেশি হলে ট্যাক্স ধরা যেতে পারে।
  let taxAmount = 0;
  const monthlyIncome = creatorsRevenueBdt;
  
  if (monthlyIncome > (FISCAL_CONSTANTS.TAX_FREE_LIMIT / 12)) {
    // করযোগ্য আয়ের ওপর ১০% উৎসে কর (TDS) আনুমানিক
    taxAmount = (monthlyIncome - (FISCAL_CONSTANTS.TAX_FREE_LIMIT / 12)) * 0.10;
  }

  // ৯. ফাইনাল টাকা (Net Take Home)
  const finalTakeHomeBdt = creatorsRevenueBdt + incentiveBdt - bankCharge - taxAmount;

  return {
    estimatedCpm: weightedCpm,
    grossRevenueBdt: Math.floor(grossRevenueBdt),
    creatorsRevenueBdt: Math.floor(creatorsRevenueBdt),
    incentiveBdt: Math.floor(incentiveBdt),
    bankCharge: Math.floor(bankCharge),
    taxAmount: Math.floor(taxAmount),
    finalTakeHomeBdt: Math.floor(finalTakeHomeBdt) > 0 ? Math.floor(finalTakeHomeBdt) : 0
  };
}