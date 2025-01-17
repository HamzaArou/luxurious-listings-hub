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
    <>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
        <div className="bg-black/5 rounded-2xl p-6 sm:p-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-deepBlue bg-white/80 py-2 px-8 rounded-full inline-block shadow-sm">
              معرض صور وفيديوهات المشروع
            </h2>
            {galleryMedia.length > 0 && (
              <p className="text-sm text-gray-600 mt-2">
                {galleryMedia.length} صور وفيديوهات متاحة - اسحب للمزيد
              </p>
            )}
          </div>
          
          <Carousel
            opts={{
              align: "start",
              loop: true,
              slidesToScroll: 1,
              startIndex: 0,
            }}
            className="w-full relative"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {galleryMedia.map((media, index) => (
                <CarouselItem 
                  key={media.id} 
                  className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                >
                  <button
                    onClick={() => setSelectedMedia(media)}
                    className={cn(
                      "w-full aspect-square rounded-xl overflow-hidden",
                      "transition-all duration-300",
                      "shadow-md hover:shadow-xl",
                      "relative group"
                    )}
                  >
                    {renderMediaPreview(media)}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </button>
                </CarouselItem>
              ))}
            </CarouselContent>
            
            <div className="absolute -left-4 sm:-left-8 -right-4 sm:-right-8 top-0 bottom-0 flex items-center justify-between pointer-events-none">
              <CarouselPrevious 
                className="pointer-events-auto relative left-0 h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-white/90 hover:bg-white shadow-md opacity-90 hover:opacity-100 transition-all border-none" 
              />
              <CarouselNext 
                className="pointer-events-auto relative right-0 h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-white/90 hover:bg-white shadow-md opacity-90 hover:opacity-100 transition-all border-none" 
              />
            </div>
          </Carousel>
        </div>
      </div>

      <Dialog open={!!selectedMedia} onOpenChange={() => setSelectedMedia(null)}>
        <DialogContent className="max-w-4xl w-full p-0 overflow-hidden bg-black/95">
          <div className="relative w-full aspect-video">
            {selectedMedia && renderMediaDialog(selectedMedia)}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}