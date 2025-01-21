import { UseFormReturn } from "react-hook-form";
import { ProjectFormValues } from "@/types/project";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
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

  const uploadFile = async (file: File, bucket: "project-images" | "project-plans") => {
    const fileExt = file.name.split(".").pop();
    const fileName = `${crypto.randomUUID()}.${fileExt}`;

    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(fileName, file, {
        cacheControl: "3600",
        upsert: true,
      });

    if (error) throw error;

    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(data.path);

    return publicUrl;
  };

  const uploadFiles = async (files: FileList, bucket: "project-images" | "project-plans") => {
    const urls: string[] = [];
    
    for (let i = 0; i < files.length; i++) {
      const url = await uploadFile(files[i], bucket);
      urls.push(url);
    }

    return urls;
  };

  const submitForm = async (data: ProjectFormValues) => {
    console.log("Starting form submission with data:", data);
    setIsLoading(true);

    try {
      // Upload thumbnail
      let thumbnailUrl = initialData?.thumbnail_url;
      if (thumbnail) {
        console.log("Uploading thumbnail...");
        thumbnailUrl = await uploadFile(thumbnail, "project-images");
      }

      if (!thumbnailUrl) {
        throw new Error("صورة المشروع مطلوبة");
      }

      // Prepare project data
      const projectData = {
        name: data.name,
        location: data.location,
        address: data.address || null,
        lat: data.lat || null,
        lng: data.lng || null,
        floors: data.floors,
        units: data.units,
        status: data.status,
        thumbnail_url: thumbnailUrl,
      };

      console.log("Project data to be inserted:", projectData);

      // Create or update project
      const { data: project, error: projectError } = initialData?.id
        ? await supabase
            .from("projects")
            .update(projectData)
            .eq("id", initialData.id)
            .select()
            .single()
        : await supabase
            .from("projects")
            .insert(projectData)
            .select()
            .single();

      if (projectError) throw projectError;
      if (!project) throw new Error("Failed to create/update project");

      const projectId = project.id;

      // Handle units
      if (data.project_units && data.project_units.length > 0) {
        if (initialData?.id) {
          // Delete existing units
          await supabase
            .from("project_units")
            .delete()
            .eq("project_id", projectId);
        }

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

        const { error: unitsError } = await supabase
          .from("project_units")
          .insert(unitsData);

        if (unitsError) throw unitsError;
      }

      // Handle gallery images
      if (data.gallery_type === "images" && galleryImages?.length) {
        if (initialData?.id) {
          // Delete existing gallery images
          await supabase
            .from("project_images")
            .delete()
            .eq("project_id", projectId)
            .eq("content_type", "gallery");
        }

        const urls = await uploadFiles(galleryImages, "project-images");
        
        const { error: imagesError } = await supabase
          .from("project_images")
          .insert(
            urls.map(url => ({
              project_id: projectId,
              media_url: url,
              content_type: "gallery",
              media_type: "image"
            }))
          );

        if (imagesError) throw imagesError;
      }

      // Handle plans
      if (plans?.length) {
        if (initialData?.id) {
          // Delete existing plans
          await supabase
            .from("project_plans")
            .delete()
            .eq("project_id", projectId);
        }

        const urls = await uploadFiles(plans, "project-plans");
        
        const { error: plansError } = await supabase
          .from("project_plans")
          .insert(
            urls.map(url => ({
              project_id: projectId,
              file_url: url,
            }))
          );

        if (plansError) throw plansError;
      }

      navigate("/admin");
    } catch (error: any) {
      console.error("Error during form submission:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { submitForm };
};