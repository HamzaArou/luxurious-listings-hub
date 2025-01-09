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

export default function ProjectForm({ initialData }: ProjectFormProps) {
  const [isLoading, setIsLoading] = useState(false);
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
      units: 1,
      status: "للبيع",
      project_units: [],
      gallery_type: "coming_soon",
    },
  });

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

      const projectData = {
        name: data.name,
        location: data.location,
        address: data.address,
        lat: data.lat,
        lng: data.lng,
        floors: data.floors,
        units: data.units,
        status: data.status,
        thumbnail_url: thumbnailUrl,
      };

      if (initialData?.id) {
        const { error } = await supabase
          .from("projects")
          .update(projectData)
          .eq("id", initialData.id);

        if (error) throw error;

        // Update project units
        await Promise.all(data.project_units.map(async (unit) => {
          const unitData = {
            name: `Unit ${unit.unit_number}`,
            project_id: initialData.id,
            unit_number: unit.unit_number,
            status: unit.status,
            unit_type: unit.unit_type,
            area: unit.area,
            floor_number: unit.floor_number,
            side: unit.side,
            rooms: unit.rooms,
            bathrooms: unit.bathrooms,
          };

          const { error } = await supabase
            .from("project_units")
            .upsert(unitData);

          if (error) throw error;
        }));

        toast({
          title: "تم التحديث",
          description: "تم تحديث المشروع بنجاح",
        });
      } else {
        const { data: project, error } = await supabase
          .from("projects")
          .insert([projectData])
          .select()
          .single();

        if (error) throw error;

        // Insert project units
        if (data.project_units.length > 0) {
          const { error } = await supabase
            .from("project_units")
            .insert(data.project_units.map(unit => ({
              name: `Unit ${unit.unit_number}`,
              project_id: project.id,
              unit_number: unit.unit_number,
              status: unit.status,
              unit_type: unit.unit_type,
              area: unit.area,
              floor_number: unit.floor_number,
              side: unit.side,
              rooms: unit.rooms,
              bathrooms: unit.bathrooms,
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
        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="basic">معلومات أساسية</TabsTrigger>
            <TabsTrigger value="gallery">صور المشروع</TabsTrigger>
            <TabsTrigger value="location">الموقع</TabsTrigger>
            <TabsTrigger value="plans">المخططات</TabsTrigger>
            <TabsTrigger value="units">الوحدات</TabsTrigger>
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
              units={form.watch("project_units") || []}
              onAddUnit={() => {
                const currentUnits = form.getValues("project_units") || [];
                form.setValue("project_units", [
                  ...currentUnits,
                  {
                    unit_number: currentUnits.length + 1,
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

        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/admin")}
            disabled={isLoading}
          >
            إلغاء
          </Button>
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
        </div>
      </form>
    </Form>
  );
}
