import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const partners = [
  {
    name: "البنك الأهلي السعودي",
    logo: "/lovable-uploads/3564801c-93e7-411f-ab27-8e9f0f543c98.png",
  },
  {
    name: "الدار العقارية",
    logo: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=400&fit=crop",
  },
  {
    name: "شركة دار الأركان",
    logo: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=400&fit=crop",
  },
  {
    name: "مجموعة طلعت مصطفى",
    logo: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=400&fit=crop",
  },
  {
    name: "شركة جبل عمر للتطوير",
    logo: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=400&fit=crop",
  },
  {
    name: "شركة مكة للإنشاء والتعمير",
    logo: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop",
  },
  {
    name: "الشركة العقارية السعودية",
    logo: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=400&fit=crop",
  },
  {
    name: "شركة البحر الأحمر العالمية",
    logo: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=400&fit=crop",
  },
  {
    name: "مدينة نيوم",
    logo: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400&h=400&fit=crop",
  },
];

const Partners = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const scrollAmount = 300;

  const scroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const container = carouselRef.current;
      const scrollDistance = direction === 'left' ? -scrollAmount : scrollAmount;
      
      container.scrollBy({
        left: scrollDistance,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="py-12 bg-[#f5f5f5] relative">
      <div className="container mx-auto px-4">
        <div className="mb-6 text-right">
          <h2 className="text-3xl font-bold text-white inline-block bg-darkBlue px-4 py-2 rounded-tl-[100px] rounded-tr-[5px] rounded-br-[100px] rounded-bl-[5px]">
            شركاء النجاح
          </h2>
        </div>
        
        <div className="relative mx-16">
          <button 
            onClick={() => scroll('left')}
            className="absolute -left-16 top-1/2 -translate-y-1/2 z-10 bg-white p-3 rounded-full shadow-lg hover:bg-gray-100 transition-colors duration-300"
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-6 w-6 text-gray-600" />
          </button>

          <div
            ref={carouselRef}
            className="flex overflow-x-auto gap-8 px-4 scroll-smooth partners-carousel"
            style={{ 
              scrollbarWidth: 'none', 
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch'
            }}
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
            onClick={() => scroll('right')}
            className="absolute -right-16 top-1/2 -translate-y-1/2 z-10 bg-white p-3 rounded-full shadow-lg hover:bg-gray-100 transition-colors duration-300"
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