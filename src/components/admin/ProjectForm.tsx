import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ProjectFormValues } from "@/types/project";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import ProjectBasicInfo from "./project-form/ProjectBasicInfo";
import ProjectGallery from "./project-form/ProjectGallery";
import ProjectLocation from "./project-form/ProjectLocation";
import Project360Views from "./project-form/Project360Views";
import ProjectUnits from "./project-form/ProjectUnits";
import ProjectPlans from "./project-form/ProjectPlans";
import FormTabs from "./project-form/FormTabs";
import FormNavigation from "./project-form/FormNavigation";
import { useFormValidation } from "./project-form/FormValidation";
import { handleFormSubmission } from "./project-form/FormSubmission";
import { handleFileUpload } from "./project-form/FileUploadHandler";

export default function ProjectForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [currentTab, setCurrentTab] = useState<TabType>("basic");
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [galleryImages, setGalleryImages] = useState<FileList | null>(null);
  const [plans, setPlans] = useState<FileList | null>(null);
  const [views360, setViews360] = useState<any[]>([]);
  const [initialData, setInitialData] = useState<any>(null);
  
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const form = useForm<ProjectFormValues>({
    defaultValues: {
      name: "",
      location: "",
      floors: 0,
      status: "قريباً",
      gallery_type: "coming_soon",
      project_units: [],
    },
  });

  const { validateTab } = useFormValidation(
    form,
    thumbnail,
    initialData,
    galleryImages,
    views360
  );

  const fetchProjectData = async () => {
    if (id) {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error("Error fetching project data:", error);
        toast({
          title: "خطأ",
          description: "حدث خطأ أثناء تحميل بيانات المشروع.",
          variant: "destructive",
        });
        return;
      }

      setInitialData(data);
      form.reset(data);
    }
  };

  useEffect(() => {
    fetchProjectData();
  }, [id]);

  const handleGalleryImagesChange = (files: FileList | null) => {
    if (files) {
      setGalleryImages(files);
    }
  };

  const handlePlansChange = (files: FileList | null) => {
    if (files) {
      setPlans(files);
    }
  };

  const onSubmit = async (values: ProjectFormValues) => {
    setIsLoading(true);
    try {
      await handleFormSubmission({
        values,
        thumbnail,
        galleryImages,
        plans,
        views360,
        id,
        initialData,
        navigate,
        toast,
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء حفظ المشروع. يرجى المحاولة مرة أخرى.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 pb-10">
      <FormTabs currentTab={currentTab} setCurrentTab={setCurrentTab} />

      <div className="space-y-8 px-4">
        {currentTab === "basic" && (
          <ProjectBasicInfo
            form={form}
            isLoading={isLoading}
            onThumbnailChange={setThumbnail}
            initialThumbnail={initialData?.thumbnail_url}
          />
        )}

        {currentTab === "gallery" && (
          <ProjectGallery
            form={form}
            isLoading={isLoading}
            onGalleryImagesChange={handleGalleryImagesChange}
            initialImages={initialData?.gallery_images}
          />
        )}

        {currentTab === "plans" && (
          <ProjectPlans
            form={form}
            isLoading={isLoading}
            onPlansChange={handlePlansChange}
            initialPlans={initialData?.plans}
          />
        )}

        {currentTab === "location" && (
          <ProjectLocation form={form} isLoading={isLoading} />
        )}

        {currentTab === "360views" && (
          <Project360Views
            form={form}
            isLoading={isLoading}
            views360={views360}
            setViews360={setViews360}
            initialViews={initialData?.views360}
          />
        )}

        {currentTab === "units" && (
          <ProjectUnits form={form} isLoading={isLoading} />
        )}
      </div>

      <FormNavigation
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        isLoading={isLoading}
        validateTab={validateTab}
      />
    </form>
  );
}
