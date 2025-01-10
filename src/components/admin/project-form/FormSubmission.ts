import { UseFormReturn } from "react-hook-form";
import { ProjectFormValues } from "@/types/project";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { uploadFile, uploadFiles } from "./FileUploadHandler";
import { NavigateFunction } from "react-router-dom";

export const useFormSubmission = (
  form: UseFormReturn<ProjectFormValues>,
  thumbnail: File | null,
  galleryImages: FileList | null,
  plans: FileList | null,
  initialData: any,
  navigate: NavigateFunction,
  setIsLoading: (loading: boolean) => void
) => {
  const { toast } = useToast();

  const handleSubmit = async (data: ProjectFormValues) => {
    try {
      setIsLoading(true);

      let thumbnailUrl = initialData?.thumbnail_url;
      if (thumbnail) {
        thumbnailUrl = await uploadFile(thumbnail, "project-images");
      }

      if (!thumbnailUrl) {
        throw new Error("صورة المشروع مطلوبة");
      }

      // Upload gallery images if any
      const galleryImageUrls: string[] = [];
      if (data.gallery_type === "images" && galleryImages) {
        const urls = await uploadFiles(galleryImages, "project-images");
        galleryImageUrls.push(...urls);
      }

      // Upload plans if any
      const planUrls: string[] = [];
      if (plans) {
        const urls = await uploadFiles(plans, "project-plans");
        planUrls.push(...urls);
      }

      const projectData = {
        name: data.name,
        location: data.location,
        address: data.address,
        lat: data.lat,
        lng: data.lng,
        floors: data.floors,
        status: data.status,
        thumbnail_url: thumbnailUrl,
        units: data.project_units.length,
      };

      if (initialData?.id) {
        await handleUpdate(initialData.id, projectData, data, galleryImageUrls, planUrls);
      } else {
        await handleCreate(projectData, data, galleryImageUrls, planUrls);
      }

      navigate("/admin");
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء حفظ المشروع",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdate = async (
    projectId: string,
    projectData: any,
    formData: ProjectFormValues,
    galleryImageUrls: string[],
    planUrls: string[]
  ) => {
    const { error } = await supabase
      .from("projects")
      .update(projectData)
      .eq("id", projectId);

    if (error) throw error;

    await handleUnits(projectId, formData.project_units);
    await handleGalleryImages(projectId, galleryImageUrls);
    await handlePlans(projectId, planUrls);

    toast({
      title: "تم التحديث",
      description: "تم تحديث المشروع بنجاح",
    });
  };

  const handleCreate = async (
    projectData: any,
    formData: ProjectFormValues,
    galleryImageUrls: string[],
    planUrls: string[]
  ) => {
    const { data: project, error } = await supabase
      .from("projects")
      .insert([projectData])
      .select()
      .single();

    if (error) throw error;

    await handleUnits(project.id, formData.project_units);
    await handleGalleryImages(project.id, galleryImageUrls);
    await handlePlans(project.id, planUrls);

    toast({
      title: "تم الإنشاء",
      description: "تم إنشاء المشروع بنجاح",
    });
  };

  const handleUnits = async (projectId: string, units: any[]) => {
    if (units.length > 0) {
      const unitsData = units.map(unit => ({
        project_id: projectId,
        name: `Unit ${unit.unit_number}`,
        area: unit.area,
        unit_number: unit.unit_number,
        status: unit.status,
        unit_type: unit.unit_type,
        floor_number: unit.floor_number,
        side: unit.side,
        rooms: unit.rooms,
        bathrooms: unit.bathrooms,
      }));

      const { error } = await supabase
        .from("project_units")
        .upsert(unitsData);

      if (error) throw error;
    }
  };

  const handleGalleryImages = async (projectId: string, imageUrls: string[]) => {
    if (imageUrls.length > 0) {
      const { error } = await supabase
        .from("project_images")
        .insert(imageUrls.map(url => ({
          project_id: projectId,
          image_url: url,
          image_type: "gallery",
        })));

      if (error) throw error;
    }
  };

  const handlePlans = async (projectId: string, planUrls: string[]) => {
    if (planUrls.length > 0) {
      const { error } = await supabase
        .from("project_plans")
        .insert(planUrls.map(url => ({
          project_id: projectId,
          file_url: url,
        })));

      if (error) throw error;
    }
  };

  return { handleSubmit };
};