import { useState } from "react";
import { useForm } from "react-hook-form";
import { ProjectFormValues, TabType } from "@/types/project";
import { useFormValidation } from "./project-form/FormValidation";
import { useFormSubmission } from "./project-form/FormSubmission";
import { useFileUploadHandler } from "./project-form/FileUploadHandler";
import FormTabs from "./project-form/FormTabs";
import FormNavigation from "./project-form/FormNavigation";
import ProjectBasicInfo from "./project-form/ProjectBasicInfo";
import ProjectGallery from "./project-form/ProjectGallery";
import ProjectLocation from "./project-form/ProjectLocation";
import Project360Views from "./project-form/Project360Views";
import ProjectUnits from "./project-form/ProjectUnits";
import ProjectPlans from "./project-form/ProjectPlans";

const ProjectForm = ({ initialData }: { initialData?: any }) => {
  const [currentTab, setCurrentTab] = useState<TabType>("basic");
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [galleryImages, setGalleryImages] = useState<FileList | null>(null);
  const [views360, setViews360] = useState<any[]>([]);
  const [plans, setPlans] = useState<FileList | null>(null);

  const form = useForm<ProjectFormValues>({
    defaultValues: {
      name: initialData?.name || "",
      location: initialData?.location || "",
      floors: initialData?.floors || 0,
      units: initialData?.units || 0,
      status: initialData?.status || "قريباً",
      address: initialData?.address || "",
      lat: initialData?.lat || 0,
      lng: initialData?.lng || 0,
      gallery_type: initialData?.gallery_type || "images",
      project_units: initialData?.project_units || [],
      views360: initialData?.views360 || [],
      plans: initialData?.plans || [],
    },
  });

  const { validateTab } = useFormValidation(
    form,
    thumbnail,
    initialData,
    galleryImages,
    views360
  );

  const { handleSubmit, isSubmitting } = useFormSubmission(
    form,
    thumbnail,
    Array.from(galleryImages || []),
    initialData,
    views360
  );

  const { handleFileUpload } = useFileUploadHandler();

  const onSubmit = async (data: ProjectFormValues) => {
    await handleSubmit(data);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FormTabs currentTab={currentTab} setCurrentTab={setCurrentTab} />
      <FormNavigation isSubmitting={isSubmitting} />
      {currentTab === "basic" && (
        <ProjectBasicInfo form={form} setThumbnail={setThumbnail} />
      )}
      {currentTab === "gallery" && (
        <ProjectGallery form={form} setGalleryImages={setGalleryImages} />
      )}
      {currentTab === "location" && (
        <ProjectLocation form={form} />
      )}
      {currentTab === "360views" && (
        <Project360Views form={form} setViews360={setViews360} />
      )}
      {currentTab === "units" && (
        <ProjectUnits form={form} />
      )}
      {currentTab === "plans" && (
        <ProjectPlans onFileChange={setPlans} />
      )}
    </form>
  );
};

export default ProjectForm;
