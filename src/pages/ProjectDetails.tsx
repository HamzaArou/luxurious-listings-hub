import { useParams } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import ProjectGallery from "@/components/projects/ProjectGallery";
import ProjectUnits from "@/components/projects/ProjectUnits";
import ProjectLocation from "@/components/projects/ProjectLocation";
import ProjectUpdates from "@/components/projects/ProjectUpdates";
import ContactUs from "@/components/ContactUs";
import { staticProjects } from "@/components/FeaturedProjects";
import { useState, useEffect } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

function ProjectDetailsSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Skeleton className="h-10 w-64 mb-2" />
        <Skeleton className="h-6 w-48" />
      </div>
      <Skeleton className="h-[400px] w-full rounded-lg" />
    </div>
  );
}

export default function ProjectDetails() {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const { data: project, isLoading } = useQuery({
    queryKey: ["project", id],
    queryFn: async () => {
      if (!id) return null;
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isLoading) {
    return <ProjectDetailsSkeleton />;
  }

  if (!project) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold text-gray-900">المشروع غير موجود</h1>
      </div>
    );
  }

  const mockGalleryImages = [
    {
      id: '1',
      image_url: '/lovable-uploads/559e0c70-7274-4ffb-8512-e13bb0a18a3d.png',
      image_type: 'gallery'
    },
    {
      id: '2',
      image_url: '/lovable-uploads/b83d6a5d-d32d-4c33-9aba-4d64a54337e0.png',
      image_type: 'gallery'
    },
    {
      id: '3',
      image_url: '/lovable-uploads/360425e4-fe5f-4a1c-8f12-78ddf0e5c7d8.png',
      image_type: 'gallery'
    },
    {
      id: '4',
      image_url: '/lovable-uploads/a9ec60bc-445c-4c80-88e1-e74736caa605.png',
      image_type: 'gallery'
    },
    {
      id: '5',
      image_url: '/lovable-uploads/c0b1fc97-9a18-4732-ae45-87e2556beff1.png',
      image_type: 'gallery'
    },
    {
      id: '6',
      image_url: project.thumbnail_url,
      image_type: 'gallery'
    }
  ];

  const handleImageClick = (index: number) => {
    setCurrentImageIndex(index);
    setSelectedImage(mockGalleryImages[index].image_url);
  };

  const handleSlideChange = (index: number) => {
    setCurrentImageIndex(index);
    setSelectedImage(mockGalleryImages[index].image_url);
  };

  return (
    <div className="min-h-screen">
      <Header />
      <div className="container mx-auto px-4 py-8 mt-[120px]">
        {/* Hero Section */}
        <div className="mb-12 text-center">
          <p className="text-gold text-lg mb-2">مشروع</p>
          <h1 className="text-5xl font-bold text-gold mb-3">{project.name}</h1>
          <p className="text-2xl text-darkBlue mb-8">{project.location}</p>
          
          {/* Large Project Image */}
          <div className="relative w-full max-w-4xl mx-auto">
            <div className="w-full h-[285px] md:h-[503px] mx-auto rounded-3xl overflow-hidden shadow-xl">
              <img
                src={selectedImage || mockGalleryImages[currentImageIndex].image_url}
                alt={project.name}
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>

        {/* Project Images Section */}
        <div className="relative py-16 bg-gradient-to-b from-darkBlue/10 to-darkBlue/5 rounded-3xl mb-12">
          <div className="container mx-auto px-4">
            <div className="flex justify-center mb-8">
              <h2 className="text-3xl font-bold text-white bg-darkBlue py-2 px-8 rounded-tr-[5px] rounded-tl-[100px] rounded-br-[100px] rounded-bl-[5px] inline-block">
                صور المشروع
              </h2>
            </div>
            
            <div className="max-w-4xl mx-auto">
              {mockGalleryImages.length > 0 ? (
                <div className="space-y-8">
                  <Carousel
                    opts={{
                      align: "center",
                      loop: true,
                      skipSnaps: false,
                      containScroll: "trimSnaps",
                    }}
                    onSlideChange={handleSlideChange}
                    className="w-full"
                  >
                    <CarouselContent className="-ml-2 md:-ml-4">
                      {mockGalleryImages.map((image, index) => (
                        <CarouselItem 
                          key={image.id} 
                          className="pl-2 md:pl-4 basis-1/3 md:basis-1/4 min-w-0"
                        >
                          <button
                            onClick={() => handleImageClick(index)}
                            className={cn(
                              "w-full aspect-square rounded-lg overflow-hidden",
                              "transition-all duration-300 hover:shadow-[0_0_15px_rgba(14,165,233,0.3)]",
                              currentImageIndex === index && "ring-2 ring-darkBlue"
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
              ) : (
                <div className="text-center py-16">
                  <p className="text-2xl text-gray-500">قريباً</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Project Updates Section */}
        <div className="relative py-16 bg-gradient-to-b from-darkBlue/10 to-darkBlue/5 rounded-3xl mb-12">
          <div className="container mx-auto px-4">
            <div className="flex justify-center mb-8">
              <h2 className="text-3xl font-bold text-white bg-darkBlue py-2 px-8 rounded-tr-[5px] rounded-tl-[100px] rounded-br-[100px] rounded-bl-[5px] inline-block">
                تحديثات المشروع
              </h2>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <ProjectUpdates projectId={id || ''} />
            </div>
          </div>
        </div>

        {/* Contact Us Section */}
        <ContactUs 
          projectId={id} 
          projectName={project.name}
          lat={project.lat}
          lng={project.lng}
        />
      </div>
      <Footer />
    </div>
  );
}