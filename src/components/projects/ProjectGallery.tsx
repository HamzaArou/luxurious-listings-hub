import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
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
    <div className="w-full">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-4 px-4">
          <p className="text-sm text-gray-600 rtl">
            {galleryMedia.length} صور وفيديوهات متاحة - اسحب للمزيد
          </p>
        </div>
        
        <Carousel
          opts={{
            align: "start",
            loop: true,
            dragFree: true,
            skipSnaps: true,
            containScroll: false,
          }}
          className="relative w-full"
        >
          <CarouselContent className="-ml-0 flex-nowrap">
            {galleryMedia.map((media) => (
              <CarouselItem 
                key={media.id} 
                className="pl-0 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4 shrink-0"
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
        <DialogContent className="max-w-4xl w-[95vw] p-0 overflow-hidden bg-black/95">
          <DialogTitle className="sr-only">معرض الصور</DialogTitle>
          <div className="relative w-full aspect-video">
            {selectedMedia && renderMediaDialog(selectedMedia)}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}