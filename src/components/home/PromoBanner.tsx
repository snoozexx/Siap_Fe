import Image from "next/image";
import { Button } from "@/components/ui/button";

export function PromoBanner() {
  return (
    <section className="bg-white p-5 shadow-sm flex items-center justify-between relative border border-gray-100 overflow-visible">
      <div className="flex-[1.2] pr-2 z-10">
        <h2 className="text-[18px] md:text-[22px] font-bold text-[#1A1A1A] leading-tight mb-4">
          Join Our Affiliate Program Promotion Holistic Health Service
        </h2>
        <Button className="bg-[#1B2B36] hover:bg-[#121d24] text-white rounded-full px-5 py-5 text-xs md:text-sm font-bold shadow-sm transition-transform active:scale-95">
          Sign Up Now
        </Button>
      </div>

      <div className="relative w-[140px] h-[100px] md:w-[220px] md:h-[150px] flex-shrink-0">
        <div className="absolute right-0 top-0 w-[85%] h-full overflow-hidden shadow-sm">
          <Image src="/images/join.jpg" alt="Main promo" fill className="object-cover" />
        </div>
        <div className="absolute -left-28 bottom-[-2px] w-[75px] h-[55px] md:w-[120px] md:h-[85px] overflow-hidden border-[3px] border-white shadow-xl z-20">
          <Image src="/images/join.jpg" alt="Small promo overlay" fill className="object-cover" />
        </div>
      </div>
    </section>
  );
}