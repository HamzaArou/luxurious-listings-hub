import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface ProjectImage {
  id: string;
  image_url: string;
  image_type: string;
}

interface ProjectGalleryProps {
  images: ProjectImage[];
}

export default function ProjectGallery({ images }: ProjectGalleryProps) {
  const galleryImages = images.filter(img => img.image_type === 'gallery');

  if (galleryImages.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">لا توجد صور متاحة</p>
      </div>
    );
  }

  return (
    <Carousel className="w-full max-w-4xl mx-auto">
      <CarouselContent>
        {galleryImages.map((image) => (
          <CarouselItem key={image.id}>
            <AspectRatio ratio={16 / 9}>
              <img
                src={image.image_url}
                alt=""
                className="w-full h-full object-cover rounded-lg"
              />
            </AspectRatio>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}