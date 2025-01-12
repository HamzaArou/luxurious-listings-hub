import { useParams } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import ProjectGallery from "@/components/projects/ProjectGallery";
import ProjectUnits from "@/components/projects/ProjectUnits";
import ProjectLocation from "@/components/projects/ProjectLocation";
import ProjectUpdates from "@/components/projects/ProjectUpdates";
import ContactUs from "@/components/ContactUs";
import { staticProjects } from "@/components/FeaturedProjects";
import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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
  const project = staticProjects.find(p => p.id === id);
  const [selectedMedia, setSelectedMedia] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!project) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold text-gray-900">المشروع غير موجود</h1>
      </div>
    );
  }

  // Using the same images multiple times to fill the carousel
  const mockGalleryMedia = [
    {
      id: '1',
      url: '/lovable-uploads/559e0c70-7274-4ffb-8512-e13bb0a18a3d.png',
      type: 'image'
    },
    {
      id: '2',
      url: '/lovable-uploads/b83d6a5d-d32d-4c33-9aba-4d64a54337e0.png',
      type: 'image'
    },
    {
      id: '3',
      url: '/lovable-uploads/360425e4-fe5f-4a1c-8f12-78ddf0e5c7d8.png',
      type: 'image'
    },
    {
      id: '4',
      url: '/lovable-uploads/a9ec60bc-445c-4c80-88e1-e74736caa605.png',
      type: 'image'
    },
    {
      id: '5',
      url: '/lovable-uploads/c0b1fc97-9a18-4732-ae45-87e2556beff1.png',
      type: 'image'
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <div className="container mx-auto px-4 py-8 mt-[120px]">
        {/* Hero Section */}
        <div className="mb-12 text-center">
          <p className="text-gold text-lg mb-2">مشروع</p>
          <h1 className="text-5xl font-bold text-gold mb-3">{project.name}</h1>
          <p className="text-2xl text-darkBlue mb-8">{project.location}</p>
          
          {/* Project Hero Image - Updated for full visibility */}
          <div className="relative w-full max-w-4xl mx-auto">
            <div className="w-full h-[400px] md:h-[600px] mx-auto rounded-3xl overflow-hidden shadow-xl bg-gray-100">
              <img
                src={project.thumbnail_url}
                alt={project.name}
                className="w-full h-full object-contain"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>

        {/* Project Media Gallery Section */}
        <div className="relative py-16 bg-gradient-to-b from-darkBlue/10 to-darkBlue/5 rounded-3xl mb-12">
          <div className="container mx-auto px-4">
            <div className="flex justify-center mb-8">
              <h2 className="text-3xl font-bold text-white bg-darkBlue py-2 px-8 rounded-tr-[5px] rounded-tl-[100px] rounded-br-[100px] rounded-bl-[5px] inline-block">
                معرض صور وفيديوهات المشروع
              </h2>
            </div>
            
            <ProjectGallery images={mockGalleryMedia.map(media => ({
              id: media.id,
              image_url: media.url,
              image_type: 'gallery'
            }))} />
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
        <ContactUs projectId={id} projectName={project.name} />
      </div>
      <Footer />

      {/* Media Preview Dialog */}
      <Dialog open={!!selectedMedia} onOpenChange={() => setSelectedMedia(null)}>
        <DialogContent className="max-w-4xl w-full p-0 overflow-hidden">
          <div className="relative w-full aspect-video">
            <img
              src={selectedMedia || ''}
              alt=""
              className="w-full h-full object-contain"
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}