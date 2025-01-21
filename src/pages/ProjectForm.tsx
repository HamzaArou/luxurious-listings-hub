import AdminLayout from "@/components/admin/AdminLayout";
import ProjectForm from "@/components/admin/ProjectForm";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export default function ProjectFormPage() {
  const { id } = useParams();

  const { data: project, isLoading } = useQuery({
    queryKey: ["project", id],
    queryFn: async () => {
      if (!id) return null;
      const { data, error } = await supabase
        .from("projects")
        .select(`
          *,
          project_units (*),
          project_images (
            id,
            media_url
          ),
          project_plans (
            id,
            file_url
          )
        `)
        .eq("id", id)
        .single();

      if (error) throw error;

      // Transform the data to match the expected format
      return {
        ...data,
        gallery_images: data.project_images?.map((image: { id: string; media_url: string }) => ({
          id: image.id,
          image_url: image.media_url // Map media_url to image_url
        })),
        plans: data.project_plans?.map((plan: { file_url: string }) => plan.file_url),
      };
    },
    enabled: !!id,
  });

  if (id && isLoading) {
    return (
      <AdminLayout>
        <div className="text-center">جاري التحميل...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">
          {id ? "تعديل المشروع" : "إنشاء مشروع جديد"}
        </h2>
        <ProjectForm initialData={project} />
      </div>
    </AdminLayout>
  );
}