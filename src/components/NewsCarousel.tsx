import { useState, useEffect, useCallback } from "react";
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
    title: "عقارماب",
    description: "شاركنا في قمة عقار ماب لعرض أحدث مشاريعنا وخدماتنا في القطاع العقاري",
    image: "/news/summit.jpg"
  },
  {
    id: 3,
    title: "صكوك المالية",
    description: "تم توقيع اتفاقية تعاون مع شركة صكوك المالية لتقديم حلول تمويلية مبتكرة",
    image: "/news/agreement.jpg"
  },
  {
    id: 4,
    title: "مشروع الإسكان الجديد",
    description: "إطلاق مشروع إسكاني جديد في المنطقة الشرقية بالتعاون مع وزارة الإسكان",
    image: "/news/housing.jpg"
  },
  {
    id: 5,
    title: "توسعة المشاريع التجارية",
    description: "خطة توسعية جديدة لتطوير المراكز التجارية في المدن الرئيسية",
    image: "/news/commercial.jpg"
  },
  {
    id: 6,
    title: "تقنيات البناء الحديثة",
    description: "تبني أحدث تقنيات البناء المستدام في مشاريعنا السكنية والتجارية",
    image: "/news/technology.jpg"
  }
];

const NewsCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [api, setApi] = useState<CarouselApi>();
  const [autoplayEnabled, setAutoplayEnabled] = useState(true);

  // Handle slide change
  const onSelect = useCallback(() => {
    if (!api) return;
    setCurrentSlide(api.selectedScrollSnap());
  }, [api]);

  // Autoplay functionality
  useEffect(() => {
    if (!api || !autoplayEnabled) return;

    const interval = setInterval(() => {
      api.scrollNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [api, autoplayEnabled]);

  // Reset autoplay when user interacts
  const handleManualNavigation = () => {
    setAutoplayEnabled(false);
    setTimeout(() => setAutoplayEnabled(true), 10000);
  };

  // Calculate scaling factor based on distance from center
  const getScaleValue = (index: number) => {
    if (!api) return 1;
    const totalSlides = newsItems.length;
    const center = Math.floor(totalSlides / 2);
    const distance = Math.abs((currentSlide + center) % totalSlides - index);
    
    // Calculate scale based on distance from center (0 = center, max distance = edges)
    const scale = 1 - (distance * 0.25); // 0.25 determines how much smaller side slides are
    return Math.max(scale, 0.75); // Ensure minimum scale of 0.75
  };

  // Calculate opacity based on distance from center
  const getOpacity = (index: number) => {
    if (!api) return 1;
    const totalSlides = newsItems.length;
    const center = Math.floor(totalSlides / 2);
    const distance = Math.abs((currentSlide + center) % totalSlides - index);
    
    return distance === 0 ? 1 : 0.5;
  };

  return (
    <section className="relative py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-right">
          <h2 className="text-3xl font-bold text-newsGreen inline-flex items-center gap-2">
            أخبار الفيصل
            <ArrowUpRight className="w-6 h-6" />
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
            onSelect={onSelect}
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {newsItems.map((item, index) => (
                <CarouselItem 
                  key={item.id}
                  className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/3 transition-all duration-500"
                >
                  <div 
                    className={cn(
                      "relative group overflow-hidden transition-all duration-500",
                      "rounded-2xl aspect-[16/9]"
                    )}
                    style={{
                      transform: `scale(${getScaleValue(index)})`,
                      opacity: getOpacity(index),
                      transition: 'all 0.5s ease-in-out'
                    }}
                  >
                    <div 
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-500"
                      style={{ backgroundImage: `url(${item.image})` }}
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    
                    <div className="absolute inset-0 p-6 flex flex-col justify-end text-right">
                      <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                        {item.title}
                      </h3>
                      
                      <p className={cn(
                        "text-white/90 line-clamp-2 text-sm md:text-base transition-all duration-300",
                        getScaleValue(index) === 1 ? "opacity-100" : "opacity-0"
                      )}>
                        {item.description}
                      </p>
                      
                      <button 
                        className={cn(
                          "mt-4 bg-white/10 text-white px-4 py-2 rounded-full",
                          "inline-flex items-center gap-2 self-start",
                          "backdrop-blur-sm transition-all duration-300",
                          "hover:bg-white hover:text-newsGreen",
                          getScaleValue(index) === 1 ? "opacity-100" : "opacity-0"
                        )}
                      >
                        اقرأ المزيد
                        <ArrowUpRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
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
                  api?.scrollTo(index);
                  handleManualNavigation();
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