import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import ProjectGallery from "@/components/projects/ProjectGallery";
import ProjectUnits from "@/components/projects/ProjectUnits";
import ProjectLocation from "@/components/projects/ProjectLocation";
import { ProjectUnit } from "@/types/project";

export default function ProjectDetails() {
  const { id } = useParams();

  const { data: project, isLoading } = useQuery({
    queryKey: ["project", id],
    queryFn: async () => {
      if (!id) throw new Error("No project ID provided");
      
      const { data: project, error } = await supabase
        .from("projects")
        .select(`
          *,
          project_details(*),
          project_images(*),
          project_units(*)
        `)
        .eq("id", id)
        .maybeSingle();

      if (error) throw error;

      // Transform project_units to match ProjectUnit interface
      const transformedUnits = project?.project_units?.map(unit => ({
        id: unit.id,
        name: unit.name,
        area: unit.area,
        unit_number: unit.unit_number || 0,
        status: unit.status || "",
        unit_type: unit.unit_type || "",
        floor_number: unit.floor_number || 0,
        side: unit.side || "",
        rooms: unit.rooms || 0,
        bathrooms: unit.bathrooms || 0,
        details: unit.details as Record<string, any>,
      })) as ProjectUnit[];

      return {
        ...project,
        project_units: transformedUnits,
      };
    },
    enabled: !!id,
  });

  if (isLoading) {
    return <ProjectDetailsSkeleton />;
  }

  if (!project) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold text-gray-900">المشروع غير موجود</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-darkBlue">{project.name}</h1>
        <p className="text-xl text-gray-600">{project.location}</p>
      </div>

      <Tabs defaultValue="gallery" className="space-y-4">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="gallery">صور المشروع</TabsTrigger>
          <TabsTrigger value="units">وحدات المشروع</TabsTrigger>
          <TabsTrigger value="location">الموقع الجغرافي</TabsTrigger>
        </TabsList>

        <TabsContent value="gallery">
          <ProjectGallery images={project.project_images} />
        </TabsContent>

        <TabsContent value="units">
          <ProjectUnits units={project.project_units} />
        </TabsContent>

        <TabsContent value="location">
          <ProjectLocation location={project.location} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function ProjectDetailsSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Skeleton className="h-10 w-64 mb-2" />
        <Skeleton className="h-6 w-48" />
      </div>
      <Skeleton className="h-[400px] w-full rounded-lg" />
    </div>
  );
}