import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { ProjectFormProps, projectFormSchema, ProjectFormValues } from "@/types/project";
import ProjectBasicInfo from "./project-form/ProjectBasicInfo";
import ProjectLocation from "./project-form/ProjectLocation";
import ProjectPlans from "./project-form/ProjectPlans";
import ProjectUnits from "./project-form/ProjectUnits";
import ProjectGallery from "./project-form/ProjectGallery";
import FormNavigation from "./project-form/FormNavigation";
import FormTabs, { TABS, TabType } from "./project-form/FormTabs";
import { useFormValidation } from "./project-form/FormValidation";
import { useFormSubmission } from "./project-form/FormSubmission";
import { useToast } from "@/hooks/use-toast";
import ProjectDetails from "./project-form/ProjectDetails";
import Project360Views from "./project-form/Project360Views";

export default function ProjectForm({ initialData }: ProjectFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [currentTab, setCurrentTab] = useState<TabType>("basic");
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [thumbnailError, setThumbnailError] = useState(false);
  const [galleryImages, setGalleryImages] = useState<FileList | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: initialData || {
      name: "",
      location: "",
      address: "",
      floors: 1,
      units: 1,
      status: "قريباً",
      thumbnail_url: "",
      project_units: [],
      gallery_type: "coming_soon",
      description: "",
      features: [],
      specifications: [],
      views360: [],
      price: 0,
      price_single_street: 0,
      price_roof: 0,
    },
    mode: "onChange",
  });

  const { validateTab } = useFormValidation(form, thumbnail, initialData, galleryImages);
  const { submitForm } = useFormSubmission(
    form,
    thumbnail,
    galleryImages,
    initialData,
    navigate,
    setIsLoading
  );

  const currentTabIndex = TABS.indexOf(currentTab);
  const isLastTab = currentTabIndex === TABS.length - 1;
  const isFirstTab = currentTabIndex === 0;

  const handleNext = async () => {
    const isValid = await validateTab(currentTab);
    if (isValid) {
      const nextIndex = currentTabIndex + 1;
      if (nextIndex < TABS.length) {
        setCurrentTab(TABS[nextIndex]);
      }
    }
  };

  const handlePrevious = () => {
    const prevIndex = currentTabIndex - 1;
    if (prevIndex >= 0) {
      setCurrentTab(TABS[prevIndex]);
    }
  };

  const onSubmit = async (data: ProjectFormValues) => {
    console.log("Starting form submission with data:", data);
    const isValid = await validateTab(currentTab);
    if (!isValid) {
      console.log("Form validation failed");
      return;
    }
    
    try {
      setIsLoading(true);
      await submitForm(data);
      toast({
        title: initialData ? "تم التحديث" : "تم الإنشاء",
        description: initialData ? "تم تحديث المشروع بنجاح" : "تم إنشاء المشروع بنجاح",
      });
    } catch (error) {
      console.error("Form submission error:", error);
      toast({
        title: "خطأ",
        description: error.message || "حدث خطأ أثناء حفظ المشروع",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Tabs value={currentTab} onValueChange={(value) => setCurrentTab(value as TabType)} className="w-full">
          <FormTabs currentTab={currentTab} />

          <TabsContent value="basic" className="space-y-4">
            <ProjectBasicInfo 
              form={form} 
              isLoading={isLoading}
              onThumbnailChange={(file) => {
                setThumbnail(file);
                setThumbnailError(false);
              }}
              initialThumbnailUrl={initialData?.thumbnail_url}
              thumbnailError={thumbnailError}
            />
          </TabsContent>

          <TabsContent value="details">
            <ProjectDetails
              form={form}
              isLoading={isLoading}
            />
          </TabsContent>

          <TabsContent value="gallery">
            <ProjectGallery
              form={form}
              isLoading={isLoading}
              onGalleryImagesChange={setGalleryImages}
              initialImages={initialData?.gallery_images}
            />
          </TabsContent>

          <TabsContent value="location">
            <ProjectLocation form={form} isLoading={isLoading} />
          </TabsContent>

          <TabsContent value="360views">
            <Project360Views
              form={form}
              isLoading={isLoading}
            />
          </TabsContent>

          <TabsContent value="units">
            <ProjectUnits
              form={form}
              isLoading={isLoading}
              onAddUnit={() => {
                const currentUnits = form.getValues("project_units") || [];
                form.setValue("project_units", [
                  ...currentUnits,
                  {
                    id: crypto.randomUUID(),
                    unit_number: currentUnits.length + 1,
                    name: `وحدة ${currentUnits.length + 1}`,
                    status: "متاح",
                    unit_type: "",
                    area: 0,
                    floor_number: 1,
                    side: "شمال",
                    rooms: 1,
                    bathrooms: 1,
                    price: 0,
                  },
                ]);
              }}
              onRemoveUnit={(index: number) => {
                const currentUnits = form.getValues("project_units") || [];
                form.setValue(
                  "project_units",
                  currentUnits.filter((_, i) => i !== index)
                );
              }}
            />
          </TabsContent>
        </Tabs>

        <FormNavigation
          isLoading={isLoading}
          isLastTab={isLastTab}
          isFirstTab={isFirstTab}
          onPrevious={handlePrevious}
          onNext={handleNext}
          onCancel={() => navigate("/admin")}
          isEditing={!!initialData?.id}
        />
      </form>
    </Form>
  );
}
