import { useEffect, useRef } from "react";
import GeometricDecorator from "./GeometricDecorator";

const Hero = () => {
  return (
    <section className="relative w-full h-[682px] overflow-hidden">
      <img
        src="/lovable-uploads/3f96563e-0fb6-4f64-b584-79204ea99e21.png"
        alt="مجموعة الفيصل العقارية - مشاريع سكنية فاخرة"
        className="absolute top-0 left-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-darkBlue/90 to-transparent" />
      <GeometricDecorator type="vertical-lines" className="opacity-20" />
    </section>
  );
};

export default Hero;