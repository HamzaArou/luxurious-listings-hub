import { useEffect, useRef } from "react";
import GeometricDecorator from "./GeometricDecorator";

const Hero = () => {
  return (
    <section className="relative w-full h-[calc(100vh-120px)] overflow-hidden mt-[120px]">
      <img
        src="/lovable-uploads/7c585eb4-1d55-4430-8b20-b1d80a628aad.png"
        alt="مجموعة الفيصل العقارية - مشاريع سكنية فاخرة"
        className="absolute top-0 left-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-darkBlue/90 via-transparent to-transparent" />
      <GeometricDecorator type="vertical-lines" className="opacity-20" />
    </section>
  );
};

export default Hero;