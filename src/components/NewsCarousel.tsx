import { useState, useEffect, useCallback, memo } from "react";
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
    title: "شراكة مع مطابخ العيدروس",
    description: "تفخر شركة الفيصل للتطوير العقاري بعقد شراكة استراتيجية مع مطابخ العيدروس، إحدى الشركات الرائدة في تصميم وتصنيع المطابخ العصرية. تهدف هذه الشراكة إلى توفير خيارات مبتكرة وعالية الجودة لعملائنا، مما يعزز من تجربتهم ويضيف لمسة من الفخامة لمنازلهم.",
    image: "/lovable-uploads/92911bc1-6b42-4c4d-8485-d427a09e13e4.png"
  },
  {
    id: 2,
    title: "شراكة مع الخزائن الذكية",
    description: "يسر شركة الفيصل للتطوير العقاري أن تعلن عن شراكتها الاستراتيجية مع شركة الخزائن الذكية، المتخصصة في تقديم حلول تخزين مبتكرة وتصاميم ذكية تناسب جميع المساحات. نسعى من خلال هذه الشراكة إلى تقديم تجربة متكاملة تعكس أعلى معايير الجودة والابتكار.",
    image: "/lovable-uploads/b83d6a5d-d32d-4c33-9aba-4d64a54337e0.png"
  },
  {
    id: 3,
    title: "مشروع ولي العهد F6",
    description: "تعلن شركة الفيصل للتطوير العقاري عن انطلاق مشروع ولي العهد F6، وهو مشروع سكني متكامل يقع في منطقة ولي العهد. يتميز المشروع بتصاميم حديثة، ومرافق متطورة، ومساحات تلبي احتياجات جميع العائلات. مشروعنا قيد الإنشاء حاليًا، ويمثل خطوة جديدة نحو تحقيق رؤيتنا في تقديم مجتمعات سكنية متكاملة.",
    image: "/lovable-uploads/5dc0a6ec-3b93-4a13-83d4-54cc6c765cc7.png"
  },
  {
    id: 4,
    title: "مشروع الشرائع S7",
    description: "تفخر شركة الفيصل للتطوير العقاري بالإعلان عن بدء العمل في مشروع الشرائع S7. يقع هذا المشروع في موقع استراتيجي بمنطقة الشرائع، ويهدف إلى توفير وحدات سكنية عصرية بمواصفات عالية تناسب العائلات الباحثة عن الراحة والجودة. المشروع حاليًا قيد الإنشاء ويعد بإضافة قيمة جديدة للسوق العقاري.",
    image: "/lovable-uploads/51659dca-2e06-4396-82aa-c606377eaed2.png"
  },
  {
    id: 5,
    title: "مشروع الشوقية F5",
    description: "يسر شركة الفيصل للتطوير العقاري أن تكشف عن مشروعها الجديد الشوقية F5، الذي يجمع بين الفخامة والحداثة في أحد أكثر المواقع حيوية بمنطقة الشوقية. يركز المشروع على تقديم مساحات سكنية متميزة ومرافق متكاملة تلبي تطلعات العملاء. المشروع قيد الإنشاء حاليًا وسينطلق قريبًا ليكون أحد أبرز معالم المنطقة.",
    image: "/lovable-uploads/8393b980-04cf-4b86-b25c-80bbd743c51f.png"
  },
  {
    id: 6,
    title: "دعم مالي جديد للعساكر",
    description: "في إطار دعم الدولة المستمر لمنسوبي وزارة الدفاع، تم الإعلان عن زيادة قيمة الدعم المالي المقدم للعساكر ليصل إلى 160,000 ريال. هذا الدعم يُمنح تقديرًا للجهود الكبيرة التي يبذلها أفراد وزارة الدفاع في خدمة الوطن، ويهدف إلى تسهيل حصولهم على سكن مناسب وداعم لاستقرارهم العائلي.",
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
    
    return () => {
      api.off("select", handleSelect);
    };
  }, [api]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (api && autoplayEnabled) {
      interval = setInterval(() => {
        api.scrollNext();
      }, 5000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [api, autoplayEnabled]);

  const handleManualNavigation = useCallback(() => {
    setAutoplayEnabled(false);
    const timer = setTimeout(() => setAutoplayEnabled(true), 10000);
    return () => clearTimeout(timer);
  }, []);

  const handleDotClick = useCallback((index: number) => {
    if (api) {
      api.scrollTo(index);
      handleManualNavigation();
    }
  }, [api, handleManualNavigation]);

  return (
    <section className="relative py-8 bg-white">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-right">
          <h2 className="text-3xl font-bold text-white inline-block bg-darkBlue px-4 py-2 rounded-tl-[100px] rounded-tr-[5px] rounded-br-[100px] rounded-bl-[5px]">
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
                onClick={() => handleDotClick(index)}
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

export default memo(NewsCarousel);
