import { useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const partners = [
  {
    name: "Partner 1",
    logo: "/lovable-uploads/partner1.png",
  },
  {
    name: "Partner 2",
    logo: "/lovable-uploads/partner2.png",
  },
  {
    name: "Partner 3",
    logo: "/lovable-uploads/partner1.png",
  },
  {
    name: "Partner 4",
    logo: "/lovable-uploads/partner2.png",
  },
  {
    name: "Partner 5",
    logo: "/lovable-uploads/partner1.png",
  },
  {
    name: "Partner 6",
    logo: "/lovable-uploads/partner2.png",
  },
  {
    name: "Partner 7",
    logo: "/lovable-uploads/partner1.png",
  },
  {
    name: "Partner 8",
    logo: "/lovable-uploads/partner2.png",
  },
  {
    name: "Partner 9",
    logo: "/lovable-uploads/partner1.png",
  },
  {
    name: "Partner 10",
    logo: "/lovable-uploads/partner2.png",
  },
];

const Partners = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const scrollAmount = 300; // Width of each scroll step

  const scroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const container = carouselRef.current;
      const currentScroll = container.scrollLeft;
      const maxScroll = container.scrollWidth - container.clientWidth;
      
      let newScroll = direction === 'left' 
        ? currentScroll - scrollAmount 
        : currentScroll + scrollAmount;

      // Handle circular scrolling
      if (newScroll < 0) {
        newScroll = maxScroll;
      } else if (newScroll > maxScroll) {
        newScroll = 0;
      }

      container.scrollTo({
        left: newScroll,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    const scrollInterval = setInterval(() => {
      if (carouselRef.current) {
        const container = carouselRef.current;
        const isAtEnd = container.scrollLeft + container.clientWidth >= container.scrollWidth;
        
        if (isAtEnd) {
          container.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          container.scrollTo({
            left: container.scrollLeft + scrollAmount,
            behavior: 'smooth'
          });
        }
      }
    }, 3000);

    return () => clearInterval(scrollInterval);
  }, []);

  return (
    <section className="py-12 bg-warmBeige relative">
      <div className="container mx-auto px-4">
        <div className="mb-6 text-right">
          <h2 className="text-3xl font-bold text-white inline-block bg-darkBlue px-4 py-2 rounded-tl-[100px] rounded-tr rounded-br rounded-bl">
            شركاء النجاح
          </h2>
        </div>
        
        <div className="relative group">
          <button 
            onClick={() => scroll('right')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-6 w-6 text-gray-600" />
          </button>

          <div
            ref={carouselRef}
            className="flex overflow-x-hidden space-x-6 rtl px-4 scroll-smooth partners-carousel"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {partners.map((partner, index) => (
              <div
                key={index}
                className="flex-shrink-0 bg-white rounded-full p-4 w-44 h-44 flex items-center justify-center transform hover:scale-105 transition-transform duration-300"
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            ))}
          </div>

          <button 
            onClick={() => scroll('left')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            aria-label="Scroll right"
          >
            <ChevronRight className="h-6 w-6 text-gray-600" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Partners;