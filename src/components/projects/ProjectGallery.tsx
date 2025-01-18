import { useState, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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
  
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [thumbnailsRef, thumbnailsApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const getPublicUrl = (mediaUrl: string) => {
    if (!mediaUrl) return '';
    if (mediaUrl.startsWith('http')) return mediaUrl;
    return `https://tdybblvmlsvxgkkwapei.supabase.co/storage/v1/object/public/project-images/${mediaUrl}`;
  };

  if (!galleryMedia || galleryMedia.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">لا توجد وسائط متاحة</p>
      </div>
    );
  }

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        {/* Main Carousel */}
        <div className="relative max-w-5xl mx-auto bg-black/5 rounded-xl overflow-hidden">
          <div className="embla overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {galleryMedia.map((media) => (
                <div key={media.id} className="flex-[0_0_100%] min-w-0">
                  <button
                    onClick={() => setSelectedMedia(media)}
                    className="w-full aspect-[16/9] relative group"
                  >
                    {media.media_type === 'video' ? (
                      <video
                        src={getPublicUrl(media.media_url)}
                        className="w-full h-full object-contain bg-black/5"
                        controls
                      />
                    ) : (
                      <img
                        src={getPublicUrl(media.media_url)}
                        alt=""
                        className="w-full h-full object-contain bg-black/5"
                        loading="lazy"
                      />
                    )}
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <Button
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white/90 hover:bg-white"
            onClick={scrollPrev}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white/90 hover:bg-white"
            onClick={scrollNext}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Thumbnails */}
        <div className="max-w-5xl mx-auto mt-4">
          <div className="embla overflow-hidden" ref={thumbnailsRef}>
            <div className="flex gap-2 px-2">
              {galleryMedia.map((media) => (
                <button
                  key={media.id}
                  onClick={() => setSelectedMedia(media)}
                  className={cn(
                    "flex-[0_0_100px] min-w-0 aspect-video relative rounded-lg overflow-hidden",
                    "hover:ring-2 hover:ring-offset-2 hover:ring-primary transition-all",
                    "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                  )}
                >
                  {media.media_type === 'video' ? (
                    <video
                      src={getPublicUrl(media.media_url)}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <img
                      src={getPublicUrl(media.media_url)}
                      alt=""
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Dialog */}
      <Dialog open={!!selectedMedia} onOpenChange={() => setSelectedMedia(null)}>
        <DialogContent className="max-w-7xl w-[95vw] p-0 overflow-hidden bg-black/95">
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4 z-50 text-white hover:bg-white/20"
            onClick={() => setSelectedMedia(null)}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
          <div className="relative w-full aspect-video">
            {selectedMedia && (
              selectedMedia.media_type === 'video' ? (
                <video
                  src={getPublicUrl(selectedMedia.media_url)}
                  controls
                  className="w-full h-full object-contain"
                  autoPlay
                />
              ) : (
                <img
                  src={getPublicUrl(selectedMedia.media_url)}
                  alt=""
                  className="w-full h-full object-contain"
                />
              )
            )}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}