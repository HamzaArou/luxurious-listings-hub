import { useState, useEffect, useCallback } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import GeometricDecorator from "./GeometricDecorator";
import { cn } from "@/lib/utils";

const images = [
  "/lovable-uploads/c87b89a6-0c42-40a2-947d-51e3a2553341.png",
  "/lovable-uploads/64c77c40-1e36-4888-9b2a-45b0bb0eb897.png",
  "/lovable-uploads/51659dca-2e06-4396-82aa-c606377eaed2.png",
  "/lovable-uploads/5dc0a6ec-3b93-4a13-83d4-54cc6c765cc7.png",
  "/lovable-uploads/8393b980-04cf-4b86-b25c-80bbd743c51f.png"
];

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const nextImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
    setIsZoomed(true);
  }, []);

  const previousImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    setIsZoomed(true);
  }, []);

  useEffect(() => {
    // Start zoom animation when image changes
    if (isZoomed) {
      const timer = setTimeout(() => {
        setIsZoomed(false);
      }, 100); // Reset zoom quickly after image change
      return () => clearTimeout(timer);
    }
  }, [isZoomed]);

  useEffect(() => {
    // Auto advance to next image after zoom animation completes
    const interval = setInterval(() => {
      nextImage();
    }, 15000); // Change image every 15 seconds after zoom completes

    return () => clearInterval(interval);
  }, [nextImage]);

  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {images.map((src, index) => (
        <img
          key={src}
          src={src}
          alt={`صورة ${index + 1}`}
          className={cn(
            "absolute top-0 left-0 w-full h-full object-cover transition-all duration-[15000ms]",
            isZoomed ? "scale-110" : "scale-100",
            currentImageIndex === index 
              ? "opacity-100 z-10" 
              : "opacity-0 z-0"
          )}
        />
      ))}
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
      <GeometricDecorator type="vertical-lines" className="opacity-20" />
      
      {/* Hero Content */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white">
        <h1 className="text-5xl md:text-7xl font-bold mb-8 text-white">
          ثقتك بوابتنا لتحقيق حلمك
        </h1>
        
        <button 
          onClick={scrollToProjects}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative bg-white text-black px-8 py-3 rounded-lg overflow-hidden group"
        >
          <span className="relative z-10">عرض العقارات</span>
          <div 
            className={cn(
              "absolute inset-0 bg-gold/20 transform transition-transform duration-500",
              isHovered ? "translate-x-0" : "-translate-x-full"
            )}
          />
        </button>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={previousImage}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 p-2 rounded-full backdrop-blur-sm transition-all duration-300"
        aria-label="Previous image"
      >
        <ArrowLeft className="w-6 h-6 text-white" />
      </button>
      
      <button
        onClick={nextImage}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 p-2 rounded-full backdrop-blur-sm transition-all duration-300"
        aria-label="Next image"
      >
        <ArrowRight className="w-6 h-6 text-white" />
      </button>
    </section>
  );
};

export default Hero;