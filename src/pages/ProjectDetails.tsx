import { useParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import ProjectGallery from "@/components/projects/ProjectGallery";
import ProjectUnits from "@/components/projects/ProjectUnits";
import ProjectLocation from "@/components/projects/ProjectLocation";
import { staticProjects } from "@/components/FeaturedProjects";

export default function ProjectDetails() {
  const { id } = useParams();
  const project = staticProjects.find(p => p.id === id);

  if (!project) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold text-gray-900">المشروع غير موجود</h1>
      </div>
    );
  }

  // Create mock data for gallery images based on thumbnail
  const mockGalleryImages = [
    {
      id: '1',
      image_url: project.thumbnail_url,
      image_type: 'gallery'
    }
  ];

  // Create mock units based on project data
  const mockUnits = Array.from({ length: project.units }, (_, index) => ({
    id: `unit-${index + 1}`,
    name: `وحدة ${index + 1}`,
    area: 120 + (index * 10), // Mock different areas
    rooms: 3,
    bathrooms: 2
  }));

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="mb-12 text-center">
        <p className="text-gold text-lg mb-2">مشروع</p>
        <h1 className="text-5xl font-bold text-gold mb-3">{project.name}</h1>
        <p className="text-2xl text-darkBlue mb-8">{project.location}</p>
        
        {/* Large Project Image */}
        <div className="relative w-full max-w-4xl mx-auto">
          <div className="w-[531px] h-[503px] mx-auto rounded-3xl overflow-hidden shadow-xl">
            <img
              src={project.thumbnail_url}
              alt={project.name}
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <Tabs defaultValue="gallery" className="space-y-4">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="gallery">صور المشروع</TabsTrigger>
          <TabsTrigger value="units">وحدات المشروع</TabsTrigger>
          <TabsTrigger value="location">الموقع الجغرافي</TabsTrigger>
        </TabsList>

        <TabsContent value="gallery">
          <ProjectGallery images={mockGalleryImages} />
        </TabsContent>

        <TabsContent value="units">
          <ProjectUnits units={mockUnits} />
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