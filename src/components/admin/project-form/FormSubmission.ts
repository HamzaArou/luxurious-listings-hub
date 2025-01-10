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

  const submitForm = async (data: ProjectFormValues) => {
    try {
      console.log("Starting form submission with data:", data);

      // Upload thumbnail
      let thumbnailUrl = initialData?.thumbnail_url;
      if (thumbnail) {
        console.log("Uploading thumbnail...");
        thumbnailUrl = await uploadFile(thumbnail, "project-images");
      }

      if (!thumbnailUrl) {
        throw new Error("صورة المشروع مطلوبة");
      }

      // Upload gallery images if any
      const galleryImageUrls: string[] = [];
      if (data.gallery_type === "images" && galleryImages) {
        console.log("Uploading gallery images...");
        const urls = await uploadFiles(galleryImages, "project-images");
        galleryImageUrls.push(...urls);
      }

      // Upload plans if any
      const planUrls: string[] = [];
      if (plans) {
        console.log("Uploading plans...");
        const urls = await uploadFiles(plans, "project-plans");
        planUrls.push(...urls);
      }

      // Prepare project data
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

      console.log("Project data prepared:", projectData);

      let projectId: string;
      if (initialData?.id) {
        // Update existing project
        console.log("Updating existing project...");
        const { error: updateError } = await supabase
          .from("projects")
          .update(projectData)
          .eq("id", initialData.id)
          .select()
          .single();

        if (updateError) {
          console.error("Error updating project:", updateError);
          throw updateError;
        }
        projectId = initialData.id;

        toast({
          title: "تم التحديث",
          description: "تم تحديث المشروع بنجاح",
        });
      } else {
        // Create new project
        console.log("Creating new project...");
        const { data: newProject, error: insertError } = await supabase
          .from("projects")
          .insert([projectData])
          .select()
          .single();

        if (insertError) {
          console.error("Error creating project:", insertError);
          throw insertError;
        }
        if (!newProject) {
          throw new Error("Failed to create project - no data returned");
        }
        projectId = newProject.id;
        console.log("New project created with ID:", projectId);

        toast({
          title: "تم الإنشاء",
          description: "تم إنشاء المشروع بنجاح",
        });
      }

      // Handle units
      if (data.project_units.length > 0) {
        console.log("Handling project units...");
        const unitsData = data.project_units.map(unit => ({
          project_id: projectId,
          name: unit.name,
          area: unit.area,
          unit_number: unit.unit_number,
          status: unit.status,
          unit_type: unit.unit_type,
          floor_number: unit.floor_number,
          side: unit.side,
          rooms: unit.rooms,
          bathrooms: unit.bathrooms,
        }));

        // If updating, first delete existing units
        if (initialData?.id) {
          console.log("Deleting existing units...");
          const { error: deleteError } = await supabase
            .from("project_units")
            .delete()
            .eq("project_id", projectId);

          if (deleteError) {
            console.error("Error deleting existing units:", deleteError);
            throw deleteError;
          }
        }

        console.log("Inserting new units:", unitsData);
        const { error: unitsError } = await supabase
          .from("project_units")
          .insert(unitsData);

        if (unitsError) {
          console.error("Error inserting units:", unitsError);
          throw unitsError;
        }
      }

      // Handle gallery images
      if (galleryImageUrls.length > 0) {
        console.log("Handling gallery images...");
        // If updating, first delete existing gallery images
        if (initialData?.id) {
          console.log("Deleting existing gallery images...");
          const { error: deleteError } = await supabase
            .from("project_images")
            .delete()
            .eq("project_id", projectId)
            .eq("image_type", "gallery");

          if (deleteError) {
            console.error("Error deleting existing gallery images:", deleteError);
            throw deleteError;
          }
        }

        console.log("Inserting new gallery images:", galleryImageUrls);
        const { error: imagesError } = await supabase
          .from("project_images")
          .insert(galleryImageUrls.map(url => ({
            project_id: projectId,
            image_url: url,
            image_type: "gallery",
          })));

        if (imagesError) {
          console.error("Error inserting gallery images:", imagesError);
          throw imagesError;
        }
      }

      // Handle plans
      if (planUrls.length > 0) {
        console.log("Handling project plans...");
        // If updating, first delete existing plans
        if (initialData?.id) {
          console.log("Deleting existing plans...");
          const { error: deleteError } = await supabase
            .from("project_plans")
            .delete()
            .eq("project_id", projectId);

          if (deleteError) {
            console.error("Error deleting existing plans:", deleteError);
            throw deleteError;
          }
        }

        console.log("Inserting new plans:", planUrls);
        const { error: plansError } = await supabase
          .from("project_plans")
          .insert(planUrls.map(url => ({
            project_id: projectId,
            file_url: url,
          })));

        if (plansError) {
          console.error("Error inserting plans:", plansError);
          throw plansError;
        }
      }

      console.log("Form submission completed successfully!");
      navigate("/admin");
    } catch (error) {
      console.error("Error during form submission:", error);
      toast({
        title: "خطأ",
        description: error.message || "حدث خطأ أثناء حفظ المشروع",
        variant: "destructive",
      });
      throw error;
    }
  };

  return { submitForm };
};