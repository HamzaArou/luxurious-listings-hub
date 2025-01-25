import { useEffect, useRef, useState, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const Hero = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(true);
  const intervalRef = useRef<number>();

  const images = [
    "/lovable-uploads/bc9a7833-f7c5-4bf3-bd66-37acf771cfe7.png",
    "" // Leave blank for now as requested
  ];

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const handleSlideChange = useCallback(() => {
    if (!emblaApi) return;
    setCurrentIndex(emblaApi.selectedScrollSnap());
    setIsZoomed(true);
    
    // Reset zoom animation
    setTimeout(() => {
      setIsZoomed(false);
    }, 100);
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    emblaApi.on('select', handleSlideChange);
    
    // Start automatic sliding
    intervalRef.current = window.setInterval(() => {
      emblaApi.scrollNext();
    }, 15000); // 15 seconds

    return () => {
      emblaApi.off('select', handleSlideChange);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [emblaApi, handleSlideChange]);

  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full h-screen overflow-hidden">
      <div className="embla h-full" ref={emblaRef}>
        <div className="embla__container h-full">
          {images.map((src, index) => (
            <div key={index} className="embla__slide relative h-full flex-[0_0_100%]">
              {src && (
                <img
                  src={src}
                  alt={`Slide ${index + 1}`}
                  className={cn(
                    "absolute inset-0 w-full h-full object-cover transition-transform duration-[15000ms] ease-out",
                    isZoomed && currentIndex === index ? "scale-125" : "scale-100"
                  )}
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={scrollPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
        aria-label="Previous slide"
      >
        <ArrowLeft className="w-6 h-6 text-white" />
      </button>
      <button
        onClick={scrollNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
        aria-label="Next slide"
      >
        <ArrowRight className="w-6 h-6 text-white" />
      </button>

      {/* Hero Content */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white z-10">
        <h1 className="text-5xl md:text-7xl font-bold mb-8 text-white">
          بينك وبين بيتك خطوة
        </h1>
        <button 
          onClick={scrollToProjects}
          className="group relative overflow-hidden bg-white text-black px-8 py-3 rounded-lg flex items-center gap-2 hover:bg-opacity-90 transition-all duration-300"
        >
          <span className="relative z-10">عرض العقارات</span>
          <div className="absolute left-0 top-0 h-full w-0 bg-gold/20 transition-all duration-300 group-hover:w-full" />
        </button>
      </div>
    </section>
  );
};

export default Hero;