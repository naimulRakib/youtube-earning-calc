export const FISCAL_CONSTANTS = {
  DOLLAR_RATE: 125.00, // ২০২৬ প্রাক্কলন
  REMITTANCE_INCENTIVE: 0.025, // ২.৫% সরকারি প্রণোদনা
  YOUTUBE_SHARE: 0.45, // ৪৫% ইউটিউব রেখে দেয়
  CREATOR_SHARE: 0.55, // ৫৫% ক্রিয়েটর পায়
  TAX_FREE_LIMIT: 350000, // বাৎসরিক করমুক্ত সীমা
  BANK_SWIFT_CHARGE: 500, // গড় সুইফট চার্জ
};

export interface NicheData {
  label: string;
  desc: string;
  bd_cpm: number; // বাংলাদেশে প্রতি ১০০০ ভিউতে আয় (USD)
  global_cpm: number; // বিদেশে প্রতি ১০০০ ভিউতে আয় (USD)
}

// ২০টি নিশের O(1) হ্যাশ ম্যাপ ডেটাবেস
export const NICHES: Record<string, NicheData> = {
  "tech_review": { label: "টেকনোলজি ও গ্যাজেট রিভিউ", desc: "মোবাইল, ল্যাপটপ আনবক্সিং এবং রিভিউ", bd_cpm: 2.10, global_cpm: 8.50 },
  "finance": { label: "শেয়ার বাজার ও ফাইন্যান্স", desc: "টাকা জমানো, বিনিয়োগ এবং ব্যাংকিং টিপস", bd_cpm: 2.80, global_cpm: 15.00 },
  "freelancing": { label: "ফ্রিল্যান্সিং ও টিউটোরিয়াল", desc: "ওয়েব ডিজাইন, গ্রাফিক ডিজাইন টিউটোরিয়াল", bd_cpm: 1.50, global_cpm: 6.00 },
  "vlog_daily": { label: "ডেইলি লাইফস্টাইল ভ্লগ", desc: "পারিবারিক এবং দৈনন্দিন জীবনের গল্প", bd_cpm: 0.45, global_cpm: 2.50 },
  "travel": { label: "ভ্রমণ ও ট্রাভেল ভ্লগ", desc: "দেশ-বিদেশের দর্শনীয় স্থান ভ্রমণ", bd_cpm: 0.60, global_cpm: 3.50 },
  "food_review": { label: "ফুড রিভিউ ও স্ট্রিট ফুড", desc: "রেস্টুরেন্ট এবং রাস্তার খাবারের রিভিউ", bd_cpm: 0.50, global_cpm: 2.80 },
  "cooking": { label: "রান্নার রেসিপি", desc: "সহজ এবং ঘরোয়া রান্নার নিয়ম", bd_cpm: 0.55, global_cpm: 3.00 },
  "entertainment": { label: "নাটক ও ফানি ভিডিও", desc: "শর্ট ফিল্ম, প্র্যাঙ্ক এবং কমেডি স্কিট", bd_cpm: 0.35, global_cpm: 2.00 },
  "news_politics": { label: "খবর ও রাজনীতি", desc: "সমসাময়িক ঘটনা এবং রাজনৈতিক বিশ্লেষণ", bd_cpm: 0.30, global_cpm: 1.80 },
  "islamic": { label: "ওয়াজ ও ইসলামি কন্টেন্ট", desc: "ধর্মীয় আলোচনা এবং গজল", bd_cpm: 0.25, global_cpm: 1.20 },
  "gaming": { label: "গেমিং ও লাইভ স্ট্রিম", desc: "পাবজি, ফ্রি ফায়ার গেমপ্লে", bd_cpm: 0.30, global_cpm: 2.50 },
  "education_kids": { label: "শিশুদের শিক্ষা (Kids)", desc: "কার্টুন এবং ছড়া গান", bd_cpm: 0.40, global_cpm: 4.00 },
  "agriculture": { label: "কৃষি ও খামার", desc: "মাছ চাষ, পশুপালন ও ছাদ কৃষি", bd_cpm: 0.50, global_cpm: 2.00 },
  "health": { label: "স্বাস্থ্য ও ফিটনেস", desc: "ব্যায়াম, ডায়েট এবং স্বাস্থ্য পরামর্শ", bd_cpm: 0.80, global_cpm: 5.50 },
  "beauty": { label: "মেকআপ ও বিউটি টিপস", desc: "রূপচর্চা এবং প্রসাধনী রিভিউ", bd_cpm: 0.70, global_cpm: 4.50 },
  "roasting": { label: "রোস্টিং ও রিঅ্যাকশন", desc: "ভাইরাল ভিডিও নিয়ে আলোচনা", bd_cpm: 0.35, global_cpm: 1.50 },
  "motivation": { label: "মোটিভেশন ও জীবনমুখী", desc: "অনুপ্রেরণামূলক বক্তব্য", bd_cpm: 0.60, global_cpm: 4.00 },
  "real_estate": { label: "জমি ও ফ্ল্যাট কেনাবেচা", desc: "প্রপার্টি রিভিউ এবং ট্যুর", bd_cpm: 1.80, global_cpm: 9.00 },
  "diy_crafts": { label: "হস্তশিল্প ও DIY", desc: "কাগজ বা ফেলনা জিনিস দিয়ে ক্রাফটিং", bd_cpm: 0.45, global_cpm: 3.50 },
  "music": { label: "মিউজিক ভিডিও ও গান", desc: "অরিজিনাল গান এবং কভার সং", bd_cpm: 0.40, global_cpm: 2.20 },
};