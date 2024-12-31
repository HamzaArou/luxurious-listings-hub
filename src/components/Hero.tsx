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
    <section className="relative w-[980px] h-[682px] mx-auto overflow-hidden">
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
    </section>
  );
};

export default Hero;