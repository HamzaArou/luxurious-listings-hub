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
import GeometricDecorator from "./GeometricDecorator";
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
    <section className="relative py-24 overflow-hidden bg-gradient-to-b from-white to-gray-50">
      {/* Floating Decorative Elements */}
      <div className="absolute top-20 right-10 w-16 h-16 bg-blue-100 rounded-full opacity-20 animate-float" />
      <div className="absolute bottom-20 left-10 w-12 h-12 bg-orange-100 rounded-full opacity-20 animate-float-delayed" />
      <div className="absolute top-1/2 right-1/4 w-8 h-8 bg-purple-100 rounded-full opacity-20 animate-float" />
      
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <div className="flex gap-4">
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
          <h2 className="text-3xl font-bold text-newsGreen text-right flex items-center gap-2">
            أخبار الفيصل
            <ArrowUpRight className="w-6 h-6" />
          </h2>
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
                <div className="group relative bg-white rounded-[32px] shadow-lg overflow-hidden transform transition-all duration-500 hover:shadow-xl p-6">
                  <GeometricDecorator type="grid" className="opacity-5" />
                  
                  {/* Content Container */}
                  <div className="relative aspect-[16/9] rounded-[24px] overflow-hidden bg-gray-50 p-8">
                    {/* Modern Card Layout */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-transparent" />
                    
                    {/* Content */}
                    <div className="relative z-10 h-full flex flex-col justify-between">
                      <div className="space-y-4">
                        <h3 className="text-2xl font-bold text-newsGreen">
                          {item.title}
                        </h3>
                        <p className="text-gray-600 line-clamp-3 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                      
                      {/* Interactive Elements */}
                      <div className="flex justify-end">
                        <button className="bg-newsGreen/10 text-newsGreen px-6 py-2 rounded-full 
                                         transform transition-all duration-300 hover:bg-newsGreen hover:text-white
                                         flex items-center gap-2 group-hover:translate-x-2">
                          اقرأ المزيد
                          <ArrowUpRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className="absolute -left-4 top-1/2 -translate-y-1/2 h-12 w-12 
                                     rounded-full bg-white/80 backdrop-blur-sm border-none 
                                     shadow-lg text-newsGreen hover:bg-white 
                                     hover:scale-110 transition-all duration-300" />
          <CarouselNext className="absolute -right-4 top-1/2 -translate-y-1/2 h-12 w-12 
                                  rounded-full bg-white/80 backdrop-blur-sm border-none 
                                  shadow-lg text-newsGreen hover:bg-white 
                                  hover:scale-110 transition-all duration-300" />
        </Carousel>
      </div>
    </section>
  );
};

export default NewsCarousel;