import { useEffect, useRef } from "react";

const partners = [
  {
    name: "Schneider Electric",
    logo: "/lovable-uploads/partner1.png",
  },
  {
    name: "El-Khayyat Red Bricks Factories",
    logo: "/lovable-uploads/partner2.png",
  },
  {
    name: "Arabian Khwarezm Co.",
    logo: "/lovable-uploads/partner3.png",
  },
  {
    name: "Alfanar Projects",
    logo: "/lovable-uploads/partner4.png",
  },
  {
    name: "Al-Amoudi",
    logo: "/lovable-uploads/partner5.png",
  },
  {
    name: "Sukuk",
    logo: "/lovable-uploads/partner6.png",
  }
];

const Partners = () => {
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollInterval = setInterval(() => {
      if (carouselRef.current) {
        const firstItem = carouselRef.current.firstElementChild as HTMLElement;
        const itemWidth = firstItem?.offsetWidth || 0;
        
        if (carouselRef.current.scrollLeft + carouselRef.current.offsetWidth >= carouselRef.current.scrollWidth) {
          carouselRef.current.scrollLeft = 0;
        } else {
          carouselRef.current.scrollLeft += itemWidth;
        }
      }
    }, 3000);

    return () => clearInterval(scrollInterval);
  }, []);

  return (
    <section className="relative py-12 bg-[#D8E6DA]">
      {/* Title Tag */}
      <div className="absolute top-0 right-8 -translate-y-1/2">
        <h2 className="text-2xl font-bold text-white bg-[#D4AF37] px-6 py-2 rounded-2xl">
          شركاء النجاح
        </h2>
      </div>

      <div className="container mx-auto px-4 mt-8">
        {/* Navigation Arrows */}
        <button className="absolute left-4 top-1/2 transform -translate-y-1/2 text-4xl text-gray-400 hover:text-gray-600">
          ‹
        </button>
        <button className="absolute right-4 top-1/2 transform -translate-y-1/2 text-4xl text-gray-400 hover:text-gray-600">
          ›
        </button>

        {/* Partners Carousel */}
        <div
          ref={carouselRef}
          className="flex items-center justify-between space-x-8 rtl overflow-hidden px-12"
        >
          {partners.map((partner, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-48 h-48 bg-white rounded-full flex items-center justify-center p-4 transform hover:scale-105 transition-transform duration-300"
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className="max-w-[80%] max-h-[80%] object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partners;