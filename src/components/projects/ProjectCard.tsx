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
  project_details?: {
    description?: string;
  }[];
  project_units?: {
    count: number;
  }[];
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
      return "bg-black text-white";
    default:
      return "bg-gray-500 text-white";
  }
};

const ProjectCard = memo(({ project }: ProjectCardProps) => {
  const navigate = useNavigate();

  const handleClick = useCallback((e: React.MouseEvent) => {
    if (window.getSelection()?.toString()) {
      return;
    }
    navigate(`/project/${project.id}`);
  }, [navigate, project.id]);

  const minPrice = project.price_single_street || project.price;
  const maxPrice = project.price;
  
  const priceDisplay = () => {
    if (!minPrice && !maxPrice) return "السعر عند الطلب";
    if (minPrice && maxPrice && minPrice !== maxPrice) {
      return `${minPrice.toLocaleString('ar-SA')} - ${maxPrice.toLocaleString('ar-SA')} ريال`;
    }
    return `${(maxPrice || minPrice).toLocaleString('ar-SA')} ريال`;
  };

  return (
    <div 
      onClick={handleClick} 
      className="cursor-pointer group h-full"
      role="button"
      tabIndex={0}
    >
      <Card className="overflow-hidden bg-white rounded-[32px] shadow-lg hover:shadow-xl transition-all duration-300 transform group-hover:scale-[1.02] h-full flex flex-col">
        {/* Image Section */}
        <div className="relative h-[350px] bg-gray-100">
          <img
            src={project.thumbnail_url}
            alt={project.name}
            className="w-full h-full object-cover"
            loading="lazy"
            decoding="async"
            fetchPriority="high"
          />
          <Badge 
            className={`absolute top-6 right-6 px-6 py-2 rounded-full text-lg font-medium ${getStatusColor(project.status)}`}
          >
            {project.status}
          </Badge>
        </div>

        {/* Content Section */}
        <div className="p-6 flex flex-col flex-grow space-y-4">
          {/* Title and Location */}
          <div className="text-right">
            <h3 className="text-2xl font-bold text-darkBlue mb-2">
              {project.name}
            </h3>
            <p className="text-lg text-gray-600">
              {project.location}
            </p>
          </div>

          {/* Details */}
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-lg text-gray-600 text-right leading-relaxed">
              {`${project.units} وحدات | المساحات من ٢٠٠ م² إلى ٤٠٠ م²`}
            </p>
          </div>

          {/* Price Section */}
          <div className="mt-auto">
            <p className="text-gray-500 text-right mb-1">السعر</p>
            <p className="text-xl font-bold text-darkBlue text-right">
              {priceDisplay()}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
});

ProjectCard.displayName = 'ProjectCard';

export default ProjectCard;