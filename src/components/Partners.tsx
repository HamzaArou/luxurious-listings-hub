import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const partners = [
  {
    name: "Schneider Electric",
    logo: "/lovable-uploads/e092e95d-b91c-47e2-849b-c8bdb022a44e.png",
  },
  {
    name: "El-Khayyat Red Bricks Factories",
    logo: "/lovable-uploads/e092e95d-b91c-47e2-849b-c8bdb022a44e.png",
  },
  {
    name: "Arabian Khwarezm Co.",
    logo: "/lovable-uploads/e092e95d-b91c-47e2-849b-c8bdb022a44e.png",
  },
  {
    name: "Alfanar Projects",
    logo: "/lovable-uploads/e092e95d-b91c-47e2-849b-c8bdb022a44e.png",
  },
  {
    name: "Al-Amoudi",
    logo: "/lovable-uploads/e092e95d-b91c-47e2-849b-c8bdb022a44e.png",
  },
  {
    name: "Sukuk",
    logo: "/lovable-uploads/e092e95d-b91c-47e2-849b-c8bdb022a44e.png",
  }
];

const Partners = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const scroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = 300;
      const newScrollLeft = carouselRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);
      carouselRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  const checkScrollButtons = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth);
    }
  };

  useEffect(() => {
    checkScrollButtons();
    const currentRef = carouselRef.current;
    currentRef?.addEventListener('scroll', checkScrollButtons);
    window.addEventListener('resize', checkScrollButtons);

    return () => {
      currentRef?.removeEventListener('scroll', checkScrollButtons);
      window.removeEventListener('resize', checkScrollButtons);
    };
  }, []);

  return (
    <section className="py-12 bg-[#F2FCE2]">
      <div className="container mx-auto px-4">
        <div className="mb-6 text-right">
          <h2 className="text-3xl font-bold text-white inline-block bg-gold px-6 py-2 rounded-tl-[2rem] rounded-tr-lg rounded-br-lg rounded-bl-lg">
            شركاء النجاح
          </h2>
        </div>
        <div className="relative">
          <button 
            onClick={() => scroll('left')}
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 p-2 rounded-full shadow-lg transition-opacity ${!canScrollLeft ? 'opacity-50 cursor-not-allowed' : 'opacity-100 hover:bg-white'}`}
            disabled={!canScrollLeft}
          >
            <ChevronLeft className="w-6 h-6 text-gold" />
          </button>
          
          <div
            ref={carouselRef}
            className="flex overflow-x-auto space-x-8 rtl scrollbar-hide py-8 px-12"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {partners.map((partner, index) => (
              <div
                key={index}
                className="flex-shrink-0 bg-white rounded-full p-4 w-48 h-48 flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform duration-300"
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="w-full h-full object-contain"
                />
              </div>
            ))}
          </div>

          <button 
            onClick={() => scroll('right')}
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 p-2 rounded-full shadow-lg transition-opacity ${!canScrollRight ? 'opacity-50 cursor-not-allowed' : 'opacity-100 hover:bg-white'}`}
            disabled={!canScrollRight}
          >
            <ChevronRight className="w-6 h-6 text-gold" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Partners;