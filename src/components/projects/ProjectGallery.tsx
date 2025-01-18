import { useState, useEffect, useRef } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

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
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const galleryMedia = images.filter(img => img.content_type === 'gallery');
  const preloadedImages = useRef<Set<string>>(new Set());

  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 0,
    slides: {
      perView: 1,
      spacing: 0,
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
      // Preload next and previous images
      const currentIndex = slider.track.details.rel;
      const nextIndex = (currentIndex + 1) % galleryMedia.length;
      const prevIndex = (currentIndex - 1 + galleryMedia.length) % galleryMedia.length;
      preloadImage(galleryMedia[nextIndex].media_url);
      preloadImage(galleryMedia[prevIndex].media_url);
    },
    created() {
      setLoaded(true);
    },
  });

  const [thumbnailRef] = useKeenSlider({
    initial: 0,
    slides: {
      perView: 6,
      spacing: 10,
    },
    breakpoints: {
      "(max-width: 768px)": {
        slides: { perView: 4, spacing: 5 },
      },
      "(max-width: 480px)": {
        slides: { perView: 3, spacing: 5 },
      },
    },
  });

  const preloadImage = (mediaUrl: string) => {
    if (!mediaUrl || mediaUrl.endsWith('.mp4') || preloadedImages.current.has(mediaUrl)) {
      return;
    }

    const img = new Image();
    img.src = getPublicUrl(mediaUrl);
    preloadedImages.current.add(mediaUrl);
  };

  useEffect(() => {
    if (galleryMedia.length > 0) {
      // Preload first few images immediately
      const initialPreloadCount = Math.min(3, galleryMedia.length);
      for (let i = 0; i < initialPreloadCount; i++) {
        if (galleryMedia[i].media_type === 'image') {
          preloadImage(galleryMedia[i].media_url);
        }
      }
    }
  }, [galleryMedia]);

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
        {/* Main Gallery */}
        <div className="relative max-w-5xl mx-auto bg-gray-100 rounded-xl overflow-hidden">
          <div ref={sliderRef} className="keen-slider h-[500px]">
            {galleryMedia.map((media) => (
              <div key={media.id} className="keen-slider__slide">
                <div className="w-full h-full flex items-center justify-center bg-black/5">
                  {media.media_type === 'video' ? (
                    <video
                      src={getPublicUrl(media.media_url)}
                      className="w-full h-full object-contain"
                      controls
                      playsInline
                      preload="metadata"
                      loading="lazy"
                    />
                  ) : (
                    <img
                      src={getPublicUrl(media.media_url)}
                      alt=""
                      className="w-full h-full object-contain"
                      loading="eager"
                      decoding="async"
                      fetchPriority="high"
                    />
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          {loaded && (
            <>
              <button
                onClick={() => instanceRef.current?.prev()}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
              </button>
              <button
                onClick={() => instanceRef.current?.next()}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </button>
            </>
          )}
        </div>

        {/* Thumbnails */}
        <div className="max-w-5xl mx-auto mt-4">
          <div ref={thumbnailRef} className="keen-slider">
            {galleryMedia.map((media, idx) => (
              <div
                key={media.id}
                onClick={() => instanceRef.current?.moveToIdx(idx)}
                className={`keen-slider__slide cursor-pointer ${
                  currentSlide === idx ? 'ring-2 ring-primary' : ''
                }`}
              >
                {media.media_type === 'video' ? (
                  <div className="aspect-video bg-gray-100 relative">
                    <video
                      src={getPublicUrl(media.media_url)}
                      className="w-full h-full object-cover"
                      preload="none"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-8 h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.986V5.653z" />
                      </svg>
                    </div>
                  </div>
                ) : (
                  <img
                    src={getPublicUrl(media.media_url)}
                    alt=""
                    className="aspect-video w-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}