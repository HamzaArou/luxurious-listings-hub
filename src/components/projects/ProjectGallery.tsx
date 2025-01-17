import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { Play } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface ProjectMedia {
  id: string;
  media_url: string;
  media_type: "image" | "video";
  content_type: string;
}

interface ProjectGalleryProps {
  images: ProjectMedia[];
}

export default function ProjectGallery({ images }: ProjectGalleryProps) {
  const [selectedMedia, setSelectedMedia] = useState<ProjectMedia | null>(null);
  const galleryMedia = images.filter(img => img.content_type === 'gallery');

  console.log('Gallery media items:', galleryMedia);

  const getPublicUrl = (mediaUrl: string) => {
    if (mediaUrl.startsWith('http')) {
      return mediaUrl;
    }
    return supabase.storage
      .from('project-images')
      .getPublicUrl(mediaUrl.replace('project-images/', ''))
      .data.publicUrl;
  };

  if (galleryMedia.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">لا توجد وسائط متاحة</p>
      </div>
    );
  }

  const renderMediaPreview = (media: ProjectMedia) => {
    const publicUrl = getPublicUrl(media.media_url);
    
    if (media.media_type === 'video') {
      return (
        <div className="relative w-full h-full">
          <video
            src={publicUrl}
            className="w-full h-full object-cover"
            controls={false}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <Play className="w-12 h-12 text-white opacity-80" />
          </div>
        </div>
      );
    }
    return (
      <img
        src={publicUrl}
        alt=""
        className="w-full h-full object-cover"
        loading="lazy"
        decoding="async"
      />
    );
  };

  const renderMediaDialog = (media: ProjectMedia) => {
    const publicUrl = getPublicUrl(media.media_url);
    
    if (media.media_type === 'video') {
      return (
        <video
          src={publicUrl}
          className="w-full h-full"
          controls
          autoPlay
        />
      );
    }
    return (
      <img
        src={publicUrl}
        alt=""
        className="w-full h-full object-contain"
      />
    );
  };

  return (
    <div className="w-full bg-gray-50">
      <div className="max-w-7xl mx-auto px-0">
        <div className="text-center mb-4 pt-8">
          <p className="text-sm text-gray-600 rtl">
            {galleryMedia.length} صور وفيديوهات متاحة - اسحب للمزيد
          </p>
        </div>
        
        <Carousel
          opts={{
            align: "start",
            loop: true,
            dragFree: true,
            containScroll: false,
            skipSnaps: true,
            inViewThreshold: 1,
          }}
          className="w-full"
        >
          <CarouselContent className="flex">
            {galleryMedia.map((media) => (
              <CarouselItem 
                key={media.id} 
                className="basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4 min-w-0 pl-0"
              >
                <button
                  onClick={() => setSelectedMedia(media)}
                  className={cn(
                    "w-full aspect-square overflow-hidden",
                    "transition-all duration-300",
                    "relative group"
                  )}
                >
                  {renderMediaPreview(media)}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </CarouselItem>
            ))}
          </CarouselContent>
          
          <CarouselPrevious 
            className="absolute left-2 top-1/2 -translate-y-1/2 h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-white/90 shadow-lg hover:bg-white transition-colors border-none z-10" 
          />
          <CarouselNext 
            className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-white/90 shadow-lg hover:bg-white transition-colors border-none z-10" 
          />
        </Carousel>
      </div>

      <Dialog open={!!selectedMedia} onOpenChange={() => setSelectedMedia(null)}>
        <DialogContent className="max-w-4xl w-full p-0 overflow-hidden bg-black/95">
          <div className="relative w-full aspect-video">
            {selectedMedia && renderMediaDialog(selectedMedia)}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}