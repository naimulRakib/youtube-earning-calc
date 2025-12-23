import React from 'react';

interface AdBannerProps {
  slot: string;
}

const AdBanner: React.FC<AdBannerProps> = ({ slot }) => {
  return (
    <div className="w-full my-8 flex flex-col items-center justify-center">
      <div className="text-xs text-gray-400 mb-1 uppercase tracking-widest">Advertisement</div>
      <div className="w-full max-w-[728px] h-[90px] bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-400">
        {/* Placeholder for AdSense */}
        <span>Google AdSense Slot: {slot}</span>
      </div>
    </div>
  );
};

export default AdBanner;