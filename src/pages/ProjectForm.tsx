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
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      return data;
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