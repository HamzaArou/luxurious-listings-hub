import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { cn } from "@/lib/utils";

interface ProjectImage {
  id: string;
  image_url: string;
  image_type: string;
}

interface ProjectGalleryProps {
  images: ProjectImage[];
}

export default function ProjectGallery({ images }: ProjectGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const galleryImages = images.filter(img => img.image_type === 'gallery');

  if (galleryImages.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">لا توجد صور متاحة</p>
      </div>
    );
  }

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
            {galleryImages.map((image) => (
              <CarouselItem 
                key={image.id} 
                className="pl-2 md:pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
              >
                <button
                  onClick={() => setSelectedImage(image.image_url)}
                  className={cn(
                    "w-full aspect-square rounded-lg overflow-hidden",
                    "transition-all duration-300 hover:shadow-[0_0_15px_rgba(14,165,233,0.3)]",
                  )}
                >
                  <img
                    src={image.image_url}
                    alt=""
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </button>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>
      </div>

      {/* Image Preview Dialog */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl w-full p-0 overflow-hidden">
          <div className="relative w-full aspect-video">
            <img
              src={selectedImage || ''}
              alt=""
              className="w-full h-full object-contain"
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}