import { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import type { CarouselApi } from "@/components/ui/carousel";
import { ArrowUpRight } from "lucide-react";

interface NewsItem {
  id: number;
  title: string;
  description: string;
  image: string;
}

const newsItems: NewsItem[] = [
  {
    id: 1,
    title: "شراكة استراتيجية مع بيوت السعودية",
    description: "تم توقيع اتفاقية شراكة استراتيجية مع شركة بيوت السعودية لتطوير المشاريع السكنية",
    image: "/news/partnership.jpg"
  },
  {
    id: 2,
    title: "المشاركة في قمة عقار ماب",
    description: "شاركنا في قمة عقار ماب لعرض أحدث مشاريعنا وخدماتنا في القطاع العقاري",
    image: "/news/summit.jpg"
  },
  {
    id: 3,
    title: "اتفاقية مع صكوك المالية",
    description: "تم توقيع اتفاقية تعاون مع شركة صكوك المالية لتقديم حلول تمويلية مبتكرة",
    image: "/news/agreement.jpg"
  }
];

const NewsCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [api, setApi] = useState<CarouselApi>();

  const onSelect = () => {
    if (!api) return;
    setCurrentSlide(api.selectedScrollSnap());
  };

  return (
    <section className="relative py-16 overflow-hidden bg-white">
      <div className="container mx-auto px-4">
        {/* Section Title - Right Aligned for Arabic */}
        <div className="flex justify-end mb-12">
          <h2 className="text-3xl font-bold text-newsGreen flex items-center gap-2">
            <ArrowUpRight className="w-6 h-6" />
            أخبار الفيصل
          </h2>
        </div>

        {/* Carousel Container */}
        <div className="relative max-w-[1200px] mx-auto">
          <Carousel
            className="w-full"
            setApi={setApi}
            opts={{
              align: "center",
              loop: true,
            }}
            onSelect={onSelect}
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {newsItems.map((item, index) => (
                <CarouselItem 
                  key={item.id}
                  className={cn(
                    "pl-2 md:pl-4 transition-all duration-300 ease-in-out",
                    currentSlide === index ? "basis-3/4" : "basis-1/4 opacity-50"
                  )}
                >
                  <div className={cn(
                    "relative group rounded-2xl overflow-hidden transition-all duration-500",
                    currentSlide === index ? "scale-105 shadow-xl" : "scale-90 hover:scale-95"
                  )}>
                    {/* Card Content */}
                    <div className="relative aspect-[16/9] bg-white rounded-2xl overflow-hidden">
                      {/* Background Image */}
                      <div className="absolute inset-0 bg-gradient-to-b from-black/0 to-black/60" />
                      
                      {/* Content Container */}
                      <div className="absolute inset-0 p-6 flex flex-col justify-end text-right">
                        <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                          {item.title}
                        </h3>
                        <p className={cn(
                          "text-white/90 line-clamp-2 text-sm md:text-base transition-all duration-300",
                          currentSlide === index ? "opacity-100" : "opacity-0"
                        )}>
                          {item.description}
                        </p>
                        
                        {/* Read More Button */}
                        <button className={cn(
                          "mt-4 bg-white/10 text-white px-4 py-2 rounded-full backdrop-blur-sm",
                          "inline-flex items-center gap-2 self-end",
                          "transition-all duration-300 hover:bg-white hover:text-newsGreen",
                          currentSlide === index ? "opacity-100" : "opacity-0"
                        )}>
                          اقرأ المزيد
                          <ArrowUpRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Navigation Arrows */}
            <CarouselPrevious className="absolute -left-4 top-1/2 -translate-y-1/2 
                                       bg-white/80 backdrop-blur-sm border-none 
                                       shadow-lg text-newsGreen hover:bg-white 
                                       hover:scale-110 transition-all duration-300" />
            <CarouselNext className="absolute -right-4 top-1/2 -translate-y-1/2 
                                   bg-white/80 backdrop-blur-sm border-none 
                                   shadow-lg text-newsGreen hover:bg-white 
                                   hover:scale-110 transition-all duration-300" />
          </Carousel>

          {/* Slide Indicators */}
          <div className="flex justify-center gap-2 mt-6">
            {newsItems.map((_, index) => (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-300",
                  currentSlide === index 
                    ? "bg-newsGreen w-6" 
                    : "bg-gray-200 hover:bg-gray-300"
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsCarousel;