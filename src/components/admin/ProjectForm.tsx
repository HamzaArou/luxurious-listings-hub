import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProjectImageUpload from "./ProjectImageUpload";
import { ProjectFormProps, projectFormSchema, ProjectFormValues } from "@/types/project";
import ProjectBasicInfo from "./project-form/ProjectBasicInfo";
import ProjectLocation from "./project-form/ProjectLocation";
import ProjectPlans from "./project-form/ProjectPlans";
import ProjectUnits from "./project-form/ProjectUnits";
import ProjectGallery from "./project-form/ProjectGallery";

const TABS = ["basic", "gallery", "location", "plans", "units"] as const;
type TabType = typeof TABS[number];

export default function ProjectForm({ initialData }: ProjectFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [currentTab, setCurrentTab] = useState<TabType>("basic");
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [galleryImages, setGalleryImages] = useState<FileList | null>(null);
  const [plans, setPlans] = useState<FileList | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: initialData || {
      name: "",
      location: "",
      address: "",
      floors: 1,
      status: "للبيع",
      thumbnail_url: "",
      project_units: [],
      gallery_type: "coming_soon",
    },
    mode: "onChange",
  });

  const currentTabIndex = TABS.indexOf(currentTab);
  const isLastTab = currentTabIndex === TABS.length - 1;
  const isFirstTab = currentTabIndex === 0;

  const validateCurrentTab = async () => {
    let isValid = true;
    const values = form.getValues();

    switch (currentTab) {
      case "basic":
        isValid = await form.trigger(["name", "location", "floors", "status", "thumbnail_url"]);
        if (!thumbnail && !initialData?.thumbnail_url) {
          toast({
            title: "خطأ",
            description: "الرجاء اختيار صورة للمشروع",
            variant: "destructive",
          });
          return false;
        }
        break;
      case "gallery":
        isValid = await form.trigger("gallery_type");
        if (values.gallery_type === "images" && !galleryImages && !initialData?.gallery_images?.length) {
          toast({
            title: "خطأ",
            description: "الرجاء اختيار صور للمعرض",
            variant: "destructive",
          });
          return false;
        }
        break;
      case "location":
        isValid = await form.trigger("address");
        break;
      case "plans":
        if (!plans && !initialData?.plans?.length) {
          toast({
            title: "خطأ",
            description: "الرجاء إضافة مخططات للمشروع",
            variant: "destructive",
          });
          return false;
        }
        break;
      case "units":
        const units = form.getValues("project_units");
        if (!units || units.length === 0) {
          toast({
            title: "خطأ",
            description: "الرجاء إضافة وحدة واحدة على الأقل",
            variant: "destructive",
          });
          return false;
        }
        isValid = await form.trigger("project_units");
        break;
    }

    if (!isValid) {
      toast({
        title: "خطأ",
        description: "الرجاء إكمال جميع الحقول المطلوبة",
        variant: "destructive",
      });
    }

    return isValid;
  };

  const handleNext = async () => {
    const isValid = await validateCurrentTab();
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
    try {
      setIsLoading(true);

      let thumbnailUrl = initialData?.thumbnail_url;

      if (thumbnail) {
        const fileExt = thumbnail.name.split(".").pop();
        const fileName = `${crypto.randomUUID()}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from("project-images")
          .upload(fileName, thumbnail);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from("project-images")
          .getPublicUrl(fileName);

        thumbnailUrl = publicUrl;
      }

      if (!thumbnailUrl) {
        throw new Error("صورة المشروع مطلوبة");
      }

      // Upload gallery images if any
      const galleryImageUrls: string[] = [];
      if (data.gallery_type === "images" && galleryImages) {
        for (let i = 0; i < galleryImages.length; i++) {
          const image = galleryImages[i];
          const fileExt = image.name.split(".").pop();
          const fileName = `${crypto.randomUUID()}.${fileExt}`;

          const { error: uploadError } = await supabase.storage
            .from("project-images")
            .upload(fileName, image);

          if (uploadError) throw uploadError;

          const { data: { publicUrl } } = supabase.storage
            .from("project-images")
            .getPublicUrl(fileName);

          galleryImageUrls.push(publicUrl);
        }
      }

      // Upload plans if any
      const planUrls: string[] = [];
      if (plans) {
        for (let i = 0; i < plans.length; i++) {
          const plan = plans[i];
          const fileExt = plan.name.split(".").pop();
          const fileName = `${crypto.randomUUID()}.${fileExt}`;

          const { error: uploadError } = await supabase.storage
            .from("project-plans")
            .upload(fileName, plan);

          if (uploadError) throw uploadError;

          const { data: { publicUrl } } = supabase.storage
            .from("project-plans")
            .getPublicUrl(fileName);

          planUrls.push(publicUrl);
        }
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
        // Update existing project
        const { error } = await supabase
          .from("projects")
          .update(projectData)
          .eq("id", initialData.id);

        if (error) throw error;

        // Update project units
        for (const unit of data.project_units) {
          const unitData = {
            project_id: initialData.id,
            name: `Unit ${unit.unit_number}`,
            area: unit.area,
            unit_number: unit.unit_number,
            status: unit.status,
            unit_type: unit.unit_type,
            floor_number: unit.floor_number,
            side: unit.side,
            rooms: unit.rooms,
            bathrooms: unit.bathrooms,
          };

          const { error: unitError } = await supabase
            .from("project_units")
            .upsert({
              ...unitData,
              id: unit.id,
            });

          if (unitError) throw unitError;
        }

        // Insert gallery images
        if (galleryImageUrls.length > 0) {
          const { error } = await supabase
            .from("project_images")
            .insert(galleryImageUrls.map(url => ({
              project_id: initialData.id,
              image_url: url,
              image_type: "gallery",
            })));

          if (error) throw error;
        }

        // Insert plans
        if (planUrls.length > 0) {
          const { error } = await supabase
            .from("project_plans")
            .insert(planUrls.map(url => ({
              project_id: initialData.id,
              file_url: url,
            })));

          if (error) throw error;
        }

        toast({
          title: "تم التحديث",
          description: "تم تحديث المشروع بنجاح",
        });
      } else {
        // Create new project
        const { data: project, error } = await supabase
          .from("projects")
          .insert([projectData])
          .select()
          .single();

        if (error) throw error;

        // Insert project units
        if (data.project_units.length > 0) {
          const unitsData = data.project_units.map(unit => ({
            project_id: project.id,
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

          const { error: unitsError } = await supabase
            .from("project_units")
            .insert(unitsData);

          if (unitsError) throw unitsError;
        }

        // Insert gallery images
        if (galleryImageUrls.length > 0) {
          const { error } = await supabase
            .from("project_images")
            .insert(galleryImageUrls.map(url => ({
              project_id: project.id,
              image_url: url,
              image_type: "gallery",
            })));

          if (error) throw error;
        }

        // Insert plans
        if (planUrls.length > 0) {
          const { error } = await supabase
            .from("project_plans")
            .insert(planUrls.map(url => ({
              project_id: project.id,
              file_url: url,
            })));

          if (error) throw error;
        }

        toast({
          title: "تم الإنشاء",
          description: "تم إنشاء المشروع بنجاح",
        });
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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Tabs value={currentTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="basic" disabled>معلومات أساسية</TabsTrigger>
            <TabsTrigger value="gallery" disabled>صور المشروع</TabsTrigger>
            <TabsTrigger value="location" disabled>الموقع</TabsTrigger>
            <TabsTrigger value="plans" disabled>المخططات</TabsTrigger>
            <TabsTrigger value="units" disabled>الوحدات</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-4">
            <ProjectBasicInfo form={form} isLoading={isLoading} />
            <ProjectImageUpload
              initialThumbnailUrl={initialData?.thumbnail_url}
              isLoading={isLoading}
              onFileChange={setThumbnail}
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

          <TabsContent value="plans">
            <ProjectPlans
              form={form}
              isLoading={isLoading}
              onPlansChange={setPlans}
              initialPlans={initialData?.plans}
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
                    name: `Unit ${currentUnits.length + 1}`,
                    status: "للبيع",
                    unit_type: "",
                    area: 0,
                    floor_number: 1,
                    side: "شمال",
                    rooms: 1,
                    bathrooms: 1,
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

        <div className="flex justify-between gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/admin")}
            disabled={isLoading}
          >
            إلغاء
          </Button>

          <div className="flex gap-2">
            {!isFirstTab && (
              <Button
                type="button"
                variant="outline"
                onClick={handlePrevious}
                disabled={isLoading}
              >
                السابق
              </Button>
            )}

            {!isLastTab ? (
              <Button
                type="button"
                onClick={handleNext}
                disabled={isLoading}
              >
                التالي
              </Button>
            ) : (
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  "جاري الحفظ..."
                ) : (
                  <>
                    <Save className="ml-2 h-4 w-4" />
                    {initialData ? "تحديث المشروع" : "إنشاء المشروع"}
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </form>
    </Form>
  );
}