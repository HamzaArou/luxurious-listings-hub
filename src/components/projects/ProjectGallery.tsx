import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, Play, X } from "lucide-react";
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
  const [currentIndex, setCurrentIndex] = useState<number>(0);

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

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? galleryMedia.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === galleryMedia.length - 1 ? 0 : prev + 1));
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
    <section className="py-12 bg-[#f5f5f5] relative">
      <div className="container mx-auto px-4">
        <div className="mb-6 text-right">
          <h2 className="text-3xl font-bold text-white inline-block bg-darkBlue px-4 py-2 rounded-tl-[100px] rounded-tr-[5px] rounded-br-[100px] rounded-bl-[5px]">
            معرض الصور والفيديو
          </h2>
        </div>
        
        <div className="relative mx-16">
          <button 
            onClick={handlePrevious}
            className="absolute -left-16 top-1/2 -translate-y-1/2 z-10 bg-white p-3 rounded-full shadow-lg hover:bg-gray-100 transition-colors duration-300"
            aria-label="Previous"
          >
            <ChevronLeft className="h-6 w-6 text-gray-600" />
          </button>

          <div className="overflow-hidden">
            <div className="flex gap-8 px-4">
              {galleryMedia.map((media, index) => (
                <div
                  key={media.id}
                  className={`flex-shrink-0 bg-white rounded-lg p-4 w-72 h-72 flex items-center justify-center transform transition-all duration-300 ${
                    index === currentIndex ? 'scale-100 opacity-100' : 'scale-95 opacity-50'
                  }`}
                  style={{
                    transform: `translateX(${(index - currentIndex) * 100}%)`,
                    transition: 'transform 0.3s ease-in-out',
                  }}
                >
                  <button
                    onClick={() => setSelectedMedia(media)}
                    className="w-full h-full relative group overflow-hidden rounded-lg"
                  >
                    {renderMediaPreview(media)}
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <button 
            onClick={handleNext}
            className="absolute -right-16 top-1/2 -translate-y-1/2 z-10 bg-white p-3 rounded-full shadow-lg hover:bg-gray-100 transition-colors duration-300"
            aria-label="Next"
          >
            <ChevronRight className="h-6 w-6 text-gray-600" />
          </button>
        </div>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-600 rtl">
            {currentIndex + 1} من {galleryMedia.length} - اضغط على الصورة لعرضها بالحجم الكامل
          </p>
        </div>
      </div>

      <Dialog open={!!selectedMedia} onOpenChange={() => setSelectedMedia(null)}>
        <DialogContent className="max-w-4xl w-[95vw] p-0 overflow-hidden bg-black/95">
          <DialogTitle className="sr-only">معرض الصور</DialogTitle>
          <button
            onClick={() => setSelectedMedia(null)}
            className="absolute right-4 top-4 z-50 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
          >
            <X className="h-4 w-4 text-white" />
            <span className="sr-only">Close</span>
          </button>
          <div className="relative w-full aspect-video">
            {selectedMedia && renderMediaDialog(selectedMedia)}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}