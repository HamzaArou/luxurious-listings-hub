import { useState, useEffect, useCallback } from "react";
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
  },
  {
    id: 7,
    title: "مشاريع الطاقة المتجددة",
    description: "إطلاق مبادرة جديدة لدمج حلول الطاقة المتجددة في مشاريعنا العقارية",
    image: "/news/partnership.jpg"
  },
  {
    id: 8,
    title: "التحول الرقمي",
    description: "تطوير منصة رقمية متكاملة لتسهيل عمليات البيع والشراء العقاري",
    image: "/news/summit.jpg"
  },
  {
    id: 9,
    title: "برنامج تمويل الإسكان",
    description: "إطلاق برنامج تمويلي جديد بالتعاون مع البنوك المحلية لدعم المشترين",
    image: "/news/agreement.jpg"
  },
  {
    id: 10,
    title: "مشاريع المدن الذكية",
    description: "تطوير مشاريع سكنية ذكية تعتمد على أحدث التقنيات في المدن الرئيسية",
    image: "/news/housing.jpg"
  },
  {
    id: 11,
    title: "الاستدامة البيئية",
    description: "تنفيذ معايير الاستدامة البيئية في جميع مشاريعنا العقارية الجديدة",
    image: "/news/commercial.jpg"
  },
  {
    id: 12,
    title: "تطوير المجمعات السكنية",
    description: "إطلاق مشاريع مجمعات سكنية متكاملة الخدمات في مختلف المناطق",
    image: "/news/technology.jpg"
  },
  {
    id: 13,
    title: "الشراكات الاستثمارية",
    description: "توقيع شراكات استثمارية جديدة لتوسيع نطاق مشاريعنا العقارية",
    image: "/news/partnership.jpg"
  },
  {
    id: 14,
    title: "تطوير الواجهات البحرية",
    description: "إطلاق مشاريع تطوير الواجهات البحرية في المدن الساحلية",
    image: "/news/summit.jpg"
  },
  {
    id: 15,
    title: "برامج التمويل الميسر",
    description: "تقديم حلول تمويلية مبتكرة للراغبين في تملك العقارات السكنية",
    image: "/news/agreement.jpg"
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

  const handleManualNavigation = useCallback(() => {
    if (!api) return;
    setAutoplayEnabled(false);
    setTimeout(() => setAutoplayEnabled(true), 10000);
  }, [api]);

  return (
    <section className="relative py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-right">
          <h2 className="text-3xl font-bold text-newsGreen">
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
              className="absolute -left-12 top-1/2 -translate-y-1/2 opacity-75 hover:opacity-100" 
            />
            <CarouselNext 
              onClick={handleManualNavigation}
              className="absolute -right-12 top-1/2 -translate-y-1/2 opacity-75 hover:opacity-100" 
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
