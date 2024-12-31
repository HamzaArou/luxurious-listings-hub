import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";

interface NewsCardProps {
  title: string;
  description: string;
  image: string;
  scale: number;
  opacity: number;
}

const NewsCard = ({ title, description, image, scale, opacity }: NewsCardProps) => {
  return (
    <div 
      className={cn(
        "relative group overflow-hidden transition-all duration-500",
        "rounded-2xl aspect-[16/9]"
      )}
      style={{
        opacity,
        transition: 'opacity 0.4s ease-in-out',
        willChange: 'opacity'
      }}
    >
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
        style={{ backgroundImage: `url(${image})` }}
      />
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      
      <div className="absolute inset-0 p-6 flex flex-col justify-end text-right">
        <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
          {title}
        </h3>
        
        <p className="text-white/90 line-clamp-2 text-sm md:text-base">
          {description}
        </p>
        
        <button 
          className={cn(
            "mt-4 bg-white/10 text-white px-4 py-2 rounded-full",
            "inline-flex items-center gap-2 self-start",
            "backdrop-blur-sm transition-all duration-300",
            "hover:bg-white hover:text-newsGreen"
          )}
        >
          اقرأ المزيد
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default NewsCard;