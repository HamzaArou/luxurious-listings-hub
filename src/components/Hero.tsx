import { useEffect, useRef } from "react";

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

      <div className="absolute inset-0 bg-gradient-to-t from-darkBlue/80 to-transparent" />

      <div className="relative h-full container mx-auto px-4 flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 animate-fade-in">
          نرتقي بتجربة التملك العقاري
        </h1>
        <p className="text-xl md:text-2xl text-white mb-12 animate-fade-in delay-100">
          تطوير المشاريع العقارية بحرفية وإبداع
        </p>
        <div className="flex flex-col sm:flex-row gap-4 animate-fade-in delay-200">
          <button className="px-6 py-3 bg-darkBlue text-gold hover:bg-opacity-90 transition-all duration-300 rounded-lg text-lg font-medium">
            استعرض مشاريعنا
          </button>
          <button className="px-6 py-3 bg-gold text-white hover:bg-opacity-90 transition-all duration-300 rounded-lg text-lg font-medium">
            تعرف على خدماتنا
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;