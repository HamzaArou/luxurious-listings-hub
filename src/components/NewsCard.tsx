import { cn } from "@/lib/utils";

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
        "rounded-2xl aspect-[3/4]"  // Changed from 16/9 to 3/4 for taller cards
      )}
      style={{
        opacity,
        transition: 'opacity 0.4s ease-in-out',
        willChange: 'opacity'
      }}
    >
      {/* Image Container - Now takes up 60% of the height */}
      <div className="relative h-[60%] w-full overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
          style={{ backgroundImage: `url(${image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/20 to-transparent" />
      </div>
      
      {/* Text Container - Now positioned below the image */}
      <div className="h-[40%] p-6 bg-white">
        <div className="flex flex-col justify-start text-right h-full">
          <h3 className="text-xl md:text-2xl font-bold text-darkBlue mb-2 line-clamp-2">
            {title}
          </h3>
          
          <p className="text-darkBlue/80 line-clamp-3 text-sm md:text-base">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;