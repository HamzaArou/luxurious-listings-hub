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
    <section className="relative py-24 bg-gradient-to-b from-white to-gray-50">
      {/* Hexagonal Decorative Elements */}
      <div className="absolute top-12 right-8 w-24 h-24 bg-blue-50 rounded-xl rotate-45 opacity-20" />
      <div className="absolute bottom-12 left-8 w-16 h-16 bg-green-50 rounded-xl rotate-12 opacity-20" />
      
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-bold text-newsGreen text-right">
            أخبار الفيصل
          </h2>
          <div className="flex gap-2">
            {newsItems.map((_, index) => (
              <button
                key={index}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-300",
                  currentSlide === index 
                    ? "bg-newsGreen w-6" 
                    : "bg-gray-200 hover:bg-gray-300"
                )}
                onClick={() => api?.scrollTo(index)}
              />
            ))}
          </div>
        </div>
        
        <Carousel
          className="w-full relative"
          setApi={setApi}
          opts={{
            align: "start",
            loop: true
          }}
          onSelect={onSelect}
        >
          <CarouselContent>
            {newsItems.map((item) => (
              <CarouselItem key={item.id}>
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-500 hover:shadow-xl p-1">
                  <div className="relative aspect-[16/9] rounded-xl overflow-hidden">
                    {/* Image Background */}
                    <div 
                      className="absolute inset-0 bg-cover bg-center transform transition-transform duration-500 hover:scale-105"
                      style={{ backgroundImage: `url(${item.image})` }}
                    />
                    
                    {/* Modern Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    
                    {/* Content Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-8 backdrop-blur-sm bg-white/10">
                      <h3 className="text-2xl font-bold text-white mb-3">
                        {item.title}
                      </h3>
                      <p className="text-lg text-gray-100 line-clamp-2">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className="absolute -left-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white/80 backdrop-blur-sm border-none shadow-lg text-newsGreen hover:bg-white hover:scale-110 transition-all duration-300" />
          <CarouselNext className="absolute -right-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white/80 backdrop-blur-sm border-none shadow-lg text-newsGreen hover:bg-white hover:scale-110 transition-all duration-300" />
        </Carousel>
      </div>
    </section>
  );
};

export default NewsCarousel;