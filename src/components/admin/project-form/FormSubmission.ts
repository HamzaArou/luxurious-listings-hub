import { UseFormReturn } from "react-hook-form";
import { ProjectFormValues } from "@/types/project";
import { uploadFile, uploadMultipleFiles } from "./FileUploadHandler";
import { supabase } from "@/integrations/supabase/client";
import { NavigateFunction } from "react-router-dom";
import { Toast } from "@/components/ui/toast";

export function useFormSubmission(
  form: UseFormReturn<ProjectFormValues>,
  thumbnail: File | null,
  galleryImages: FileList | null,
  plans: FileList | null,
  initialData: ProjectFormValues & { id?: string } | undefined,
  navigate: NavigateFunction,
  setIsLoading: (loading: boolean) => void,
  showToast: (toast: Toast) => void
) {
  const submitForm = async (data: ProjectFormValues) => {
    console.log("Starting form submission with data:", data);
    try {
      setIsLoading(true);

      // Upload thumbnail if provided
      let thumbnailUrl = initialData?.thumbnail_url || "";
      if (thumbnail) {
        console.log("Uploading thumbnail...");
        thumbnailUrl = await uploadFile(thumbnail, "project-images", showToast);
      }

      // Upload gallery images if provided
      let galleryUrls: string[] = [];
      if (galleryImages && galleryImages.length > 0) {
        console.log("Uploading gallery images...");
        galleryUrls = await uploadMultipleFiles(galleryImages, "project-images", showToast);
      }

      // Upload plans if provided
      let planUrls: string[] = [];
      if (plans && plans.length > 0) {
        console.log("Uploading plans...");
        planUrls = await uploadMultipleFiles(plans, "project-plans", showToast);
      }

      const projectData = {
        ...data,
        thumbnail_url: thumbnailUrl,
      };

      let projectId = initialData?.id;

      if (projectId) {
        // Update existing project
        const { error: updateError } = await supabase
          .from("projects")
          .update(projectData)
          .eq("id", projectId);

        if (updateError) throw updateError;
      } else {
        // Create new project
        const { data: newProject, error: insertError } = await supabase
          .from("projects")
          .insert(projectData)
          .select()
          .single();

        if (insertError) throw insertError;
        projectId = newProject.id;
      }

      // Handle gallery images
      if (galleryUrls.length > 0) {
        const galleryData = galleryUrls.map(url => ({
          project_id: projectId,
          image_url: url,
          image_type: "gallery"
        }));

        const { error: galleryError } = await supabase
          .from("project_images")
          .insert(galleryData);

        if (galleryError) throw galleryError;
      }

      // Handle plans
      if (planUrls.length > 0) {
        const plansData = planUrls.map(url => ({
          project_id: projectId,
          file_url: url
        }));

        const { error: plansError } = await supabase
          .from("project_plans")
          .insert(plansData);

        if (plansError) throw plansError;
      }

      // Handle units
      if (data.project_units && data.project_units.length > 0) {
        const unitsData = data.project_units.map(unit => ({
          ...unit,
          project_id: projectId
        }));

        if (initialData?.id) {
          // Delete existing units first
          const { error: deleteError } = await supabase
            .from("project_units")
            .delete()
            .eq("project_id", projectId);

          if (deleteError) throw deleteError;
        }

        // Insert new units
        const { error: unitsError } = await supabase
          .from("project_units")
          .insert(unitsData);

        if (unitsError) throw unitsError;
      }

      showToast({
        title: initialData?.id ? "تم تحديث المشروع" : "تم إنشاء المشروع",
        description: "تم حفظ البيانات بنجاح",
      });

      navigate("/admin");
    } catch (error: any) {
      console.error("Form submission error:", error);
      showToast({
        title: "خطأ",
        description: error.message || "حدث خطأ أثناء حفظ البيانات",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { submitForm };
}