import { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
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

  return (
    <section className="relative py-16 bg-gradient-to-b from-white to-warmBeige overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-darkBlue mb-8 text-right">
          أخبار الفيصل
        </h2>
        
        <Carousel
          className="w-full md:w-4/5 mx-auto relative"
          onSelect={(api) => {
            const selectedIndex = api?.selectedScrollSnap() || 0;
            setCurrentSlide(selectedIndex);
          }}
        >
          <CarouselContent>
            {newsItems.map((item) => (
              <CarouselItem key={item.id}>
                <div className="relative aspect-[16/9] rounded-2xl overflow-hidden">
                  {/* Image Background */}
                  <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${item.image})` }}
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  
                  {/* Content Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-white/70 backdrop-blur-sm">
                    <h3 className="text-xl md:text-2xl font-bold text-darkBlue mb-2">
                      {item.title}
                    </h3>
                    <p className="text-base md:text-lg text-gray-700 line-clamp-2">
                      {item.description}
                    </p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className="hidden md:flex -left-12 h-10 w-10 border-2 border-darkBlue text-darkBlue hover:bg-darkBlue hover:text-white transition-colors" />
          <CarouselNext className="hidden md:flex -right-12 h-10 w-10 border-2 border-darkBlue text-darkBlue hover:bg-darkBlue hover:text-white transition-colors" />
          
          {/* Dots Navigation */}
          <div className="absolute -bottom-8 left-0 right-0 flex justify-center gap-2">
            {newsItems.map((_, index) => (
              <button
                key={index}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-300",
                  currentSlide === index 
                    ? "bg-darkBlue w-4" 
                    : "bg-gray-300 hover:bg-gray-400"
                )}
                onClick={() => {
                  const api = (document.querySelector('[role="region"]') as any)?.__embla__;
                  api?.scrollTo(index);
                }}
              />
            ))}
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export default NewsCarousel;