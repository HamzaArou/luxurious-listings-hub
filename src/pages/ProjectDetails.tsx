import { useParams } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import ProjectGallery from "@/components/projects/ProjectGallery";
import ProjectUnits from "@/components/projects/ProjectUnits";
import ProjectLocation from "@/components/projects/ProjectLocation";
import ProjectUpdates from "@/components/projects/ProjectUpdates";
import ContactUs from "@/components/ContactUs";
import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

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

async function fetchProject(id: string) {
  const { data: project, error } = await supabase
    .from('projects')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  if (!project) throw new Error('Project not found');
  
  return project;
}

async function fetchProjectImages(projectId: string) {
  const { data: images, error } = await supabase
    .from('project_images')
    .select('*')
    .eq('project_id', projectId)
    .order('created_at', { ascending: true });

  if (error) throw error;
  return images || [];
}

export default function ProjectDetails() {
  const { id } = useParams();
  const [selectedMedia, setSelectedMedia] = useState<string | null>(null);

  const { data: project, isLoading, error } = useQuery({
    queryKey: ['project', id],
    queryFn: () => fetchProject(id!),
    enabled: !!id
  });

  const { data: galleryMedia = [] } = useQuery({
    queryKey: ['projectImages', id],
    queryFn: () => fetchProjectImages(id!),
    enabled: !!id
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isLoading) {
    return <ProjectDetailsSkeleton />;
  }

  if (error || !project) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold text-gray-900">المشروع غير موجود</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      <div className="container mx-auto px-4 py-8 mt-[120px]">
        {/* Hero Section */}
        <div className="mb-12 text-center">
          <p className="text-gold text-xl mb-2">مشروع</p>
          <h1 className="text-5xl font-bold text-gold mb-3">{project.name}</h1>
          <p className="text-2xl text-deepBlue mb-8">{project.location}</p>
          
          {/* Project Hero Image - Fixed dimensions for consistent display */}
          <div className="relative mx-auto bg-gradient-to-b from-deepBlue/10 to-deepBlue/5 p-4 sm:p-6 rounded-[30px] sm:rounded-[40px] shadow-lg w-[350px] sm:w-[450px]">
            <div className="w-[320px] sm:w-[386px] mx-auto rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl" style={{ height: '400px' }}>
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
        <div className="relative py-16 bg-gradient-to-b from-deepBlue/10 to-deepBlue/5 rounded-3xl mb-12">
          <div className="container mx-auto px-4">
            <div className="flex justify-center mb-8">
              <h2 className="text-3xl font-bold text-white bg-deepBlue py-2 px-8 rounded-tr-[5px] rounded-tl-[100px] rounded-br-[100px] rounded-bl-[5px] inline-block">
                معرض صور وفيديوهات المشروع
              </h2>
            </div>
            
            <ProjectGallery images={galleryMedia} />
          </div>
        </div>

        {/* Project Updates Section */}
        <div className="relative py-16 bg-gradient-to-b from-deepBlue/10 to-deepBlue/5 rounded-3xl mb-12">
          <div className="container mx-auto px-4">
            <div className="flex justify-center mb-8">
              <h2 className="text-3xl font-bold text-white bg-deepBlue py-2 px-8 rounded-tr-[5px] rounded-tl-[100px] rounded-br-[100px] rounded-bl-[5px] inline-block">
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