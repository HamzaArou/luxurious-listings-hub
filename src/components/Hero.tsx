import { useEffect, useRef } from "react";
import GeometricDecorator from "./GeometricDecorator";

const Hero = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  }, []);

  return (
    <section className="relative h-screen overflow-hidden">
      <video
        ref={videoRef}
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-gradient-to-t from-darkBlue/90 to-transparent" />
      <GeometricDecorator type="vertical-lines" className="opacity-20" />

      <div className="relative h-full container mx-auto px-4 flex flex-col items-center justify-center text-center">
        <h1 className="heading-primary text-white mb-4 animate-fade-in">
          نرتقي بتجربة التملك العقاري
        </h1>
        <div className="divider-gold animate-fade-in delay-100" />
        <p className="text-xl md:text-2xl text-white/90 mb-12 animate-fade-in delay-200">
          تطوير المشاريع العقارية بحرفية وإبداع
        </p>
        <div className="flex flex-col sm:flex-row gap-4 animate-fade-in delay-300">
          <button className="btn-primary">
            استعرض مشاريعنا
          </button>
          <button className="btn-secondary">
            تعرف على خدماتنا
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;