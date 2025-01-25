import { useEffect, useState, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const TRANSITION_DURATION = 15000; // 15 seconds for zoom animation

const images = [
  "/lovable-uploads/c87b89a6-0c42-40a2-947d-51e3a2553341.png",
  "/lovable-uploads/325c0faa-605f-42a9-8e71-adb278491bc5.png"
];

const Hero = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(true);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    emblaApi.on('select', () => {
      setCurrentIndex(emblaApi.selectedScrollSnap());
      setIsZoomed(true);
      setTimeout(() => setIsZoomed(false), 100);
    });

    // Auto-advance slides after zoom animation completes
    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, TRANSITION_DURATION);

    return () => {
      clearInterval(interval);
      emblaApi.off('select');
    };
  }, [emblaApi]);

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
            <div key={index} className="embla__slide relative h-full">
              <div className={`w-full h-full transition-transform duration-[15000ms] ease-out ${isZoomed && currentIndex === index ? 'scale-125' : 'scale-100'}`}>
                <img
                  src={src}
                  alt={`Slide ${index + 1}`}
                  className="absolute top-0 left-0 w-full h-full object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white">
        <h1 className="text-6xl md:text-7xl font-bold mb-8 text-white">
          حلول تمويلية مخصصة لك
        </h1>
        <button 
          onClick={scrollToProjects}
          className="group relative overflow-hidden bg-white text-black px-8 py-3 rounded-lg flex items-center gap-2 hover:bg-opacity-90 transition-all duration-300"
        >
          <span className="relative z-10">عرض العقارات</span>
          <div className="absolute left-0 w-0 h-full bg-gold group-hover:w-full transition-all duration-500 ease-out -z-0" />
          <ChevronLeft className="w-5 h-5 relative z-10 transition-transform group-hover:translate-x-1" />
        </button>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={scrollPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/20 transition-colors"
        aria-label="Previous slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
      <button
        onClick={scrollNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/20 transition-colors"
        aria-label="Next slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
    </section>
  );
};

export default Hero;