import React from 'react';

interface ChartProps {
  monthlyIncome: number;
}

export default function GrowthChart({ monthlyIncome }: ChartProps) {
  const safeIncome = monthlyIncome > 0 ? monthlyIncome : 0;
  
  // ১২ মাসের প্রজেকশন ডেটা (১০% গ্রোথ)
  const data = Array.from({ length: 12 }, (_, i) => {
    return safeIncome * Math.pow(1.10, i);
  });

  const maxVal = Math.max(...data) || 100;

  return (
    <div className="w-full mt-6 bg-white p-4 rounded-xl border border-slate-200">
      <h3 className="text-sm font-bold text-slate-700 mb-4 flex items-center gap-2">
        📈 ভবিষ্যৎ আয়ের সম্ভাবনা (১ বছর)
      </h3>
      
      {safeIncome === 0 ? (
        <div className="h-32 flex items-center justify-center text-slate-400 text-xs bg-slate-50 rounded-lg">
          প্রজেকশন দেখতে ভিউ সংখ্যা বাড়ান
        </div>
      ) : (
        <div className="h-40 flex items-end justify-between gap-1">
          {data.map((val, i) => {
            const height = (val / maxVal) * 100;
            return (
              <div key={i} className="flex-1 flex flex-col justify-end group relative">
                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-10">
                  <div className="bg-slate-800 text-white text-[10px] py-1 px-2 rounded whitespace-nowrap">
                    মাস {i + 1}: ৳{Math.floor(val).toLocaleString()}
                  </div>
                </div>
                {/* Bar */}
                <div 
                  className={`w-full rounded-t-sm transition-all duration-500 ${i === 11 ? 'bg-green-600' : 'bg-green-200 hover:bg-green-300'}`}
                  style={{ height: `${height}%` }}
                ></div>
              </div>
            );
          })}
        </div>
      )}
      <div className="flex justify-between mt-2 text-[10px] text-slate-500">
        <span>বর্তমান</span>
        <span>৬ মাস</span>
        <span>১ বছর</span>
      </div>
    </div>
  );
}