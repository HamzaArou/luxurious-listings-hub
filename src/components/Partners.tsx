import { useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const partners = [
  {
    name: "إعمار العقارية",
    logo: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=400&h=400&fit=crop",
  },
  {
    name: "الدار العقارية",
    logo: "https://images.unsplash.com/photo-1496307653780-42ee777d4833?w=400&h=400&fit=crop",
  },
  {
    name: "شركة دار الأركان",
    logo: "https://images.unsplash.com/photo-1466442929976-97f336a657be?w=400&h=400&fit=crop",
  },
  {
    name: "مجموعة طلعت مصطفى",
    logo: "https://images.unsplash.com/photo-1459767129954-1b1c1f9b9ace?w=400&h=400&fit=crop",
  },
  {
    name: "شركة جبل عمر للتطوير",
    logo: "https://images.unsplash.com/photo-1527576539890-dfa815648363?w=400&h=400&fit=crop",
  },
  {
    name: "شركة مكة للإنشاء والتعمير",
    logo: "https://images.unsplash.com/photo-1488972685288-c3fd157d7c7a?w=400&h=400&fit=crop",
  },
  {
    name: "الشركة العقارية السعودية",
    logo: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=400&h=400&fit=crop",
  },
  {
    name: "شركة البحر الأحمر العالمية",
    logo: "https://images.unsplash.com/photo-1431576901776-e539bd916ba2?w=400&h=400&fit=crop",
  },
  {
    name: "مدينة نيوم",
    logo: "https://images.unsplash.com/photo-1449157291145-7efd050a4d0e?w=400&h=400&fit=crop",
  },
  {
    name: "شركة المراكز العربية",
    logo: "https://images.unsplash.com/photo-1460574283810-2aab119d8511?w=400&h=400&fit=crop",
  },
];

const Partners = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const scrollAmount = 300;

  const scroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const container = carouselRef.current;
      const currentScroll = container.scrollLeft;
      const maxScroll = container.scrollWidth - container.clientWidth;
      
      let newScroll = direction === 'left' 
        ? currentScroll - scrollAmount 
        : currentScroll + scrollAmount;

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
            className="flex overflow-x-hidden gap-6 rtl px-4 scroll-smooth partners-carousel"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {partners.map((partner, index) => (
              <div
                key={index}
                className="flex-shrink-0 bg-white rounded-full p-4 w-44 h-44 flex items-center justify-center transform hover:scale-105 transition-transform duration-300 shadow-lg"
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-w-full max-h-full object-contain rounded-full"
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