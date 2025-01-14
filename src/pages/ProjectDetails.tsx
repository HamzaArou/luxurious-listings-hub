import { useParams } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import ProjectGallery from "@/components/projects/ProjectGallery";
import ProjectUnits from "@/components/projects/ProjectUnits";
import ProjectLocation from "@/components/projects/ProjectLocation";
import ProjectUpdates from "@/components/projects/ProjectUpdates";
import ContactUs from "@/components/ContactUs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

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

// UUID validation regex
const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export default function ProjectDetails() {
  const { id } = useParams();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedMedia, setSelectedMedia] = useState<string | null>(null);
  const [galleryImages, setGalleryImages] = useState<any[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        // Validate UUID format
        if (!id || !UUID_REGEX.test(id)) {
          toast({
            variant: "destructive",
            title: "خطأ",
            description: "رقم تعريف المشروع غير صالح"
          });
          navigate('/');
          return;
        }

        // Fetch project details
        const { data: projectData, error: projectError } = await supabase
          .from('projects')
          .select('*')
          .eq('id', id)
          .maybeSingle();

        if (projectError) throw projectError;
        if (!projectData) {
          toast({
            variant: "destructive",
            title: "خطأ",
            description: "لم يتم العثور على المشروع"
          });
          navigate('/');
          return;
        }

        setProject(projectData);

        // Fetch project images
        const { data: imagesData, error: imagesError } = await supabase
          .from('project_images')
          .select('*')
          .eq('project_id', id)
          .order('created_at', { ascending: true });

        if (imagesError) throw imagesError;
        setGalleryImages(imagesData || []);

      } catch (error) {
        console.error('Error fetching project data:', error);
        toast({
          variant: "destructive",
          title: "خطأ",
          description: "حدث خطأ أثناء تحميل بيانات المشروع"
        });
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProjectData();
    }
  }, [id, navigate, toast]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="mt-[120px]">
          <ProjectDetailsSkeleton />
        </div>
        <Footer />
      </div>
    );
  }

  if (!project) {
    return null;
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
          
          {/* Project Hero Image */}
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
            
            <ProjectGallery images={galleryImages} />
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