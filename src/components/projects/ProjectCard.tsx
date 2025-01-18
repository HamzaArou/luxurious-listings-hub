import { Card } from "../ui/card";
import { useNavigate } from "react-router-dom";
import { useCallback, memo } from "react";
import { Badge } from "../ui/badge";
import { supabase } from "@/integrations/supabase/client";

interface Project {
  id: string;
  name: string;
  location: string;
  status: string;
  floors: number;
  units: number;
  thumbnail_url: string;
  price?: number;
  price_single_street?: number;
}

interface ProjectCardProps {
  project: Project;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "تم البيع بالكامل":
      return "bg-gold text-white";
    case "قريباً":
      return "bg-newsGreen text-white";
    case "بدأ البيع":
      return "bg-deepBlue text-white";
    default:
      return "bg-gray-500 text-white";
  }
};

const formatPrice = (price?: number) => {
  if (!price) return "السعر عند الطلب";
  return `${price.toLocaleString('en-US')} ريال`;
};

const ProjectCard = memo(({ project }: ProjectCardProps) => {
  const navigate = useNavigate();

  const handleClick = useCallback((e: React.MouseEvent) => {
    if (window.getSelection()?.toString()) {
      return;
    }
    navigate(`/project/${project.id}`);
  }, [navigate, project.id]);

  // Get the public URL for the thumbnail
  const imageUrl = project.thumbnail_url.includes('project-images/') 
    ? supabase.storage
        .from('project-images')
        .getPublicUrl(project.thumbnail_url.replace('project-images/', ''))
        .data.publicUrl
    : project.thumbnail_url;

  console.log('Project thumbnail URL:', project.thumbnail_url); // Debug original URL
  console.log('Processed image URL:', imageUrl); // Debug processed URL

  return (
    <div 
      onClick={handleClick} 
      className="cursor-pointer group h-full"
      role="button"
      tabIndex={0}
    >
      <Card className="overflow-hidden bg-white rounded-[20px] shadow-lg hover:shadow-xl transition-all duration-300 transform group-hover:scale-[1.02] h-full flex flex-col">
        <div className="relative h-[320px] bg-gray-100">
          <img
            src={imageUrl}
            alt={project.name}
            className="w-full h-full object-cover"
            loading="lazy"
            decoding="async"
            fetchPriority="high"
          />
          <Badge 
            className={`absolute top-4 left-4 px-4 py-1 rounded-full text-sm font-medium ${getStatusColor(project.status)}`}
          >
            {project.status}
          </Badge>
        </div>

        <div className="p-4 flex flex-col flex-grow">
          <div className="text-right mb-3">
            <h3 className="text-lg font-bold text-darkBlue">
              {project.name}
            </h3>
            <p className="text-sm text-gray-600">
              مدينة مكة - {project.location}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 mb-3">
            <div className="bg-gray-50 rounded-lg p-2">
              <p className="text-base font-bold text-darkBlue">{project.floors}</p>
              <p className="text-sm text-gray-600">الطوابق</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-2">
              <p className="text-base font-bold text-darkBlue">{project.units}</p>
              <p className="text-sm text-gray-600">الشقق</p>
            </div>
          </div>

          <div className="mt-auto text-center">
            <p className="text-sm font-medium text-gray-600 mb-1">السعر</p>
            {project.price_single_street ? (
              <div className="space-y-1">
                <p className="text-base font-bold text-gold">
                  على شارعين: {formatPrice(project.price)}
                </p>
                <p className="text-base font-bold text-gold">
                  على شارع واحد: {formatPrice(project.price_single_street)}
                </p>
              </div>
            ) : (
              <p className="text-lg font-bold text-gold">
                {formatPrice(project.price)}
              </p>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
});

ProjectCard.displayName = 'ProjectCard';

export default ProjectCard;