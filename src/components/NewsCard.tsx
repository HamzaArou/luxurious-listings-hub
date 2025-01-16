import { cn } from "@/lib/utils";
import { memo } from "react";

interface NewsCardProps {
  title: string;
  description: string;
  image: string;
  scale: number;
  opacity: number;
}

const NewsCard = memo(({ title, description, image, scale, opacity }: NewsCardProps) => {
  return (
    <div 
      className={cn(
        "relative group overflow-hidden transition-all duration-500",
        "rounded-2xl aspect-[3/4]"
      )}
      style={{
        opacity,
        transition: 'opacity 0.4s ease-in-out',
        willChange: 'opacity, transform'
      }}
    >
      {/* Image Container - Takes up 50% of the height instead of 60% */}
      <div className="relative h-[50%] w-full overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
          style={{ 
            backgroundImage: `url(${image})`,
            willChange: 'transform'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/20 to-transparent" />
      </div>
      
      {/* Text Container - Now 50% height with better text handling */}
      <div className="h-[50%] p-4 bg-white overflow-y-auto">
        <div className="flex flex-col justify-start text-right h-full">
          <h3 className="text-lg md:text-xl font-bold text-darkBlue mb-2">
            {title}
          </h3>
          
          <p className="text-darkBlue/80 text-sm leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
});

NewsCard.displayName = 'NewsCard';

export default NewsCard;