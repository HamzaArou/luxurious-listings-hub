import { useEffect, useRef } from "react";
import GeometricDecorator from "@/components/GeometricDecorator";

const Hero = () => {
  return (
    <section className="relative w-full h-[calc(100vh-120px)] overflow-hidden mt-[120px]">
      <img
        src="./lovable-uploads/64c77c40-1e36-4888-9b2a-45b0bb0eb897.png"
        alt="مجموعة الفيصل العقارية - مشاريع سكنية فاخرة"
        className="absolute top-0 left-0 w-full h-full object-cover"
        loading="eager"
        fetchPriority="high"
        decoding="async"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-darkBlue/90 via-transparent to-transparent" />
      <GeometricDecorator type="vertical-lines" className="opacity-20" />
    </section>
  );
};

export default Hero;