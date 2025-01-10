import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { ProjectFormValues, projectFormSchema } from "@/types/project";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import ProjectBasicInfo from "./project-form/ProjectBasicInfo";
import ProjectGallery from "./project-form/ProjectGallery";
import ProjectLocation from "./project-form/ProjectLocation";
import ProjectPlans from "./project-form/ProjectPlans";
import ProjectUnits from "./project-form/ProjectUnits";
import FormTabs, { TabType } from "./project-form/FormTabs";
import { useFormValidation } from "./project-form/FormValidation";
import { useFormSubmission } from "./project-form/FormSubmission";
import ProjectImageUpload from "./ProjectImageUpload";

interface ProjectFormProps {
  initialData?: any;
}

export default function ProjectForm({ initialData }: ProjectFormProps) {
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState<TabType>("basic");
  const [isLoading, setIsLoading] = useState(false);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [galleryImages, setGalleryImages] = useState<FileList | null>(null);
  const [plans, setPlans] = useState<FileList | null>(null);

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      name: initialData?.name || "",
      location: initialData?.location || "",
      address: initialData?.address || "",
      lat: initialData?.lat || undefined,
      lng: initialData?.lng || undefined,
      floors: initialData?.floors || 1,
      status: initialData?.status || "قريباً",
      gallery_type: "images",
      project_units: initialData?.project_units || [],
    },
  });

  const { validateTab } = useFormValidation(
    form,
    thumbnail,
    initialData,
    galleryImages,
    plans
  );

  const { handleSubmit } = useFormSubmission(
    form,
    thumbnail,
    galleryImages,
    plans,
    initialData,
    navigate,
    setIsLoading
  );

  const onAddUnit = () => {
    const currentUnits = form.getValues("project_units") || [];
    form.setValue("project_units", [
      ...currentUnits,
      {
        id: crypto.randomUUID(),
        name: "",
        area: 0,
        unit_number: 0,
        status: "",
        unit_type: "",
        floor_number: 0,
        side: "",
        rooms: 0,
        bathrooms: 0,
      },
    ]);
  };

  const onRemoveUnit = (index: number) => {
    const currentUnits = form.getValues("project_units") || [];
    form.setValue(
      "project_units",
      currentUnits.filter((_, i) => i !== index)
    );
  };

  const onSubmit = async () => {
    console.log("Form submission started");
    const isValid = await validateTab(currentTab);
    if (!isValid) {
      console.log("Form validation failed");
      return;
    }
    console.log("Form validation passed, proceeding with submission");
    await handleSubmit(form.getValues());
  };

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormTabs currentTab={currentTab} setCurrentTab={setCurrentTab} />

          <Tabs value={currentTab} className="space-y-6">
            <TabsContent value="basic" className="space-y-6">
              <div className="space-y-6">
                <ProjectImageUpload
                  value={initialData?.thumbnail_url}
                  onChange={(file) => setThumbnail(file)}
                  onRemove={() => setThumbnail(null)}
                  disabled={isLoading}
                />
                <ProjectBasicInfo form={form} isLoading={isLoading} />
              </div>
            </TabsContent>

            <TabsContent value="gallery" className="space-y-6">
              <ProjectGallery
                form={form}
                isLoading={isLoading}
                onGalleryImagesChange={setGalleryImages}
                initialImages={initialData?.gallery_images}
              />
            </TabsContent>

            <TabsContent value="location" className="space-y-6">
              <ProjectLocation form={form} isLoading={isLoading} />
            </TabsContent>

            <TabsContent value="plans" className="space-y-6">
              <ProjectPlans
                form={form}
                isLoading={isLoading}
                onPlansChange={setPlans}
                initialPlans={initialData?.plans}
              />
            </TabsContent>

            <TabsContent value="units" className="space-y-6">
              <ProjectUnits
                form={form}
                isLoading={isLoading}
                onAddUnit={onAddUnit}
                onRemoveUnit={onRemoveUnit}
              />
            </TabsContent>
          </Tabs>

          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-darkBlue hover:bg-darkBlue/90"
            >
              {initialData ? "تحديث المشروع" : "إنشاء المشروع"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}