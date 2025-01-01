import { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import type { CarouselApi } from "@/components/ui/carousel";
import NewsCard from "./NewsCard";
import { getScaleValue, getOpacity } from "@/utils/carouselUtils";
import { cn } from "@/lib/utils";

interface NewsItem {
  id: number;
  title: string;
  description: string;
  image: string;
}

const newsItems: NewsItem[] = [
  {
    id: 1,
    title: "مشروع الفيصل السكني الفاخر",
    description: "إطلاق مشروع سكني فاخر جديد يجمع بين الأصالة والحداثة في قلب المدينة",
    image: "/lovable-uploads/559e0c70-7274-4ffb-8512-e13bb0a18a3d.png"
  },
  {
    id: 2,
    title: "فلل الفيصل المودرن",
    description: "تصاميم عصرية مع لمسات معمارية مميزة تلبي تطلعات الحياة العصرية",
    image: "/lovable-uploads/b83d6a5d-d32d-4c33-9aba-4d64a54337e0.png"
  },
  {
    id: 3,
    title: "قصور الفيصل التراثية",
    description: "مزيج فريد من العمارة الإسلامية التقليدية مع وسائل الراحة العصرية",
    image: "/lovable-uploads/360425e4-fe5f-4a1c-8f12-78ddf0e5c7d8.png"
  },
  {
    id: 4,
    title: "شقق الفيصل الفاخرة",
    description: "وحدات سكنية راقية بتشطيبات عالية الجودة وإطلالات خلابة",
    image: "/lovable-uploads/a9ec60bc-445c-4c80-88e1-e74736caa605.png"
  },
  {
    id: 5,
    title: "برج الفيصل السكني",
    description: "برج سكني حديث يوفر أسلوب حياة متكامل مع أحدث المرافق والخدمات",
    image: "/lovable-uploads/c0b1fc97-9a18-4732-ae45-87e2556beff1.png"
  },
  {
    id: 6,
    title: "مجمع الفيصل السكني",
    description: "مجمع سكني متكامل يجمع بين الخصوصية والرفاهية مع مساحات خضراء واسعة",
    image: "/lovable-uploads/559e0c70-7274-4ffb-8512-e13bb0a18a3d.png"
  }
];

const NewsCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [api, setApi] = useState<CarouselApi>();
  const [autoplayEnabled, setAutoplayEnabled] = useState(true);

  useEffect(() => {
    if (!api) return;
    
    const handleSelect = () => {
      setCurrentSlide(api.selectedScrollSnap());
    };

    api.on("select", handleSelect);
    // Cleanup
    return () => {
      api.off("select", handleSelect);
    };
  }, [api]);

  useEffect(() => {
    if (!api || !autoplayEnabled) return;

    const interval = setInterval(() => {
      api.scrollNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [api, autoplayEnabled]);

  const handleManualNavigation = () => {
    setAutoplayEnabled(false);
    setTimeout(() => setAutoplayEnabled(true), 10000);
  };

  return (
    <section className="relative py-8 bg-white">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-right">
          <h2 className="text-3xl font-bold text-white inline-block bg-darkBlue px-4 py-2 rounded-tl-[100px] rounded-tr rounded-br rounded-bl">
            أخبار الفيصل
          </h2>
        </div>

        <div className="relative max-w-[1200px] mx-auto">
          <Carousel
            className="w-full"
            setApi={setApi}
            opts={{
              align: "center",
              loop: true,
              direction: "rtl",
            }}
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {newsItems.map((item, index) => (
                <CarouselItem 
                  key={item.id}
                  className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/3"
                >
                  <NewsCard
                    title={item.title}
                    description={item.description}
                    image={item.image}
                    scale={getScaleValue(currentSlide, index, newsItems.length)}
                    opacity={getOpacity(currentSlide, index, newsItems.length)}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious 
              onClick={handleManualNavigation}
              className="absolute -left-12 top-1/2 -translate-y-1/2" 
            />
            <CarouselNext 
              onClick={handleManualNavigation}
              className="absolute -right-12 top-1/2 -translate-y-1/2" 
            />
          </Carousel>

          <div className="flex justify-center gap-2 mt-6">
            {newsItems.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (api) {
                    api.scrollTo(index);
                    handleManualNavigation();
                  }
                }}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-300",
                  currentSlide === index 
                    ? "bg-newsGreen w-8" 
                    : "bg-gray-200 hover:bg-gray-300"
                )}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsCarousel;
