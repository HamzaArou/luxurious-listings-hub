import { Card } from "../ui/card";
import { useNavigate } from "react-router-dom";
import { useCallback, memo } from "react";
import { Badge } from "../ui/badge";

interface Project {
  id: string;
  name: string;
  location: string;
  status: string;
  floors: number;
  units: number;
  thumbnail_url: string;
  price?: number;
  price_max?: number;
  details: string;
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

const formatPrice = (price?: number, maxPrice?: number) => {
  if (!price) return "السعر عند الطلب";
  if (maxPrice) {
    return `السعر يبدأ من ${price.toLocaleString('en-US')} إلى ${maxPrice.toLocaleString('en-US')} ريال`;
  }
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

  return (
    <div 
      onClick={handleClick} 
      className="cursor-pointer group h-full"
      role="button"
      tabIndex={0}
    >
      <Card className="overflow-hidden bg-white rounded-[20px] shadow-lg hover:shadow-xl transition-all duration-300 transform group-hover:scale-[1.02] h-full flex flex-col">
        {/* Image Section with contain fit */}
        <div className="relative h-[320px] bg-gray-100">
          <img
            src={project.thumbnail_url}
            alt={project.name}
            className="w-full h-full object-contain"
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

        {/* Content Section */}
        <div className="p-4 flex flex-col flex-grow">
          {/* Title and Location */}
          <div className="text-right mb-3">
            <h3 className="text-lg font-bold text-darkBlue">
              {project.name}
            </h3>
            <p className="text-sm text-gray-600">
              {project.location}
            </p>
          </div>

          {/* Details Grid */}
          <div className="bg-gray-50 rounded-lg p-3 mb-3">
            <p className="text-base text-gray-600 text-right">
              {project.details}
            </p>
          </div>

          {/* Price Section */}
          <div className="mt-auto text-center">
            <p className="text-sm font-medium text-gray-600 mb-1">السعر</p>
            <p className="text-lg font-bold text-gold">
              {formatPrice(project.price, project.price_max)}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
});

ProjectCard.displayName = 'ProjectCard';

export default ProjectCard;