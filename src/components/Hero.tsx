import { useEffect, useRef } from "react";
import GeometricDecorator from "./GeometricDecorator";

const Hero = () => {
  return (
    <section className="relative w-full h-[calc(100vh-120px)] overflow-hidden mt-[120px]">
      <img
        src="/lovable-uploads/b003dd7b-9db8-4ee9-a46a-843b5a9b16e4.png"
        alt="مجموعة الفيصل العقارية - مشاريع سكنية فاخرة"
        className="absolute top-0 left-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-darkBlue/90 via-transparent to-transparent" />
      <GeometricDecorator type="vertical-lines" className="opacity-20" />
    </section>
  );
};

export default Hero;