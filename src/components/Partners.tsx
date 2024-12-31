import { useEffect, useRef } from "react";

const partners = [
  {
    name: "Partner 1",
    logo: "/lovable-uploads/partner1.png",
  },
  {
    name: "Partner 2",
    logo: "/lovable-uploads/partner2.png",
  },
  // Add more partners as needed
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
    <section className="py-24 bg-warmBeige">
      <div className="container mx-auto px-4 max-w-[960px]">
        <h2 className="text-4xl font-bold text-darkBlue text-center mb-12">
          شركاء النجاح
        </h2>

        <div
          ref={carouselRef}
          className="flex overflow-hidden space-x-8 rtl"
        >
          {partners.map((partner, index) => (
            <div
              key={index}
              className="flex-shrink-0 transform hover:scale-105 transition-transform duration-300"
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className="h-20 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partners;