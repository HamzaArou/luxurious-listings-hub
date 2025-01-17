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
    // If the URL is already a full URL, return it
    if (mediaUrl.startsWith('http')) {
      return mediaUrl;
    }
    // Otherwise, get the public URL from Supabase storage
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
      <div className="max-w-4xl mx-auto">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {galleryMedia.map((media) => (
              <CarouselItem 
                key={media.id} 
                className="pl-2 md:pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
              >
                <button
                  onClick={() => setSelectedMedia(media)}
                  className={cn(
                    "w-full aspect-square rounded-lg overflow-hidden",
                    "transition-all duration-300 hover:shadow-[0_0_15px_rgba(14,165,233,0.3)]",
                  )}
                >
                  {renderMediaPreview(media)}
                </button>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>
      </div>

      {/* Media Preview Dialog */}
      <Dialog open={!!selectedMedia} onOpenChange={() => setSelectedMedia(null)}>
        <DialogContent className="max-w-4xl w-full p-0 overflow-hidden">
          <div className="relative w-full aspect-video">
            {selectedMedia && renderMediaDialog(selectedMedia)}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
