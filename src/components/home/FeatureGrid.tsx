import React from "react";

interface FeatureItem {
  icon: React.ReactNode;
  label: string;
}

export function FeatureGrid({ items }: { items: FeatureItem[] }) {
  return (
    <section className="grid grid-cols-4 gap-4">
      {items.map((item, idx) => (
        <div key={idx} className="flex flex-col items-center gap-2">
          <div className="w-14 h-14 bg-blue-50 text-blue-900 rounded-xl flex items-center justify-center shadow-sm hover:bg-blue-100 transition-colors cursor-pointer border border-blue-100">
            {item.icon}
          </div>
          <span className="text-[13px] font-bold text-[#1B2B36]">{item.label}</span>
        </div>
      ))}
    </section>
  );
}