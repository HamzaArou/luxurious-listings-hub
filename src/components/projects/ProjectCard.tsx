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
      return "bg-darkBlue text-white";
    default:
      return "bg-gray-500 text-white";
  }
};

const formatPrice = (price?: number) => {
  if (!price) return "السعر عند الطلب";
  return `${price.toLocaleString('ar-SA')} ريال`;
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
      className="cursor-pointer group"
      role="button"
      tabIndex={0}
    >
      <Card className="overflow-hidden bg-white rounded-[20px] shadow-lg hover:shadow-xl transition-all duration-300 transform group-hover:scale-[1.02]">
        {/* Image Section */}
        <div className="relative">
          <img
            src={project.thumbnail_url}
            alt={project.name}
            className="w-full h-[240px] object-cover"
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
        <div className="p-6 space-y-4">
          {/* Title and Location */}
          <div className="text-right">
            <h3 className="text-2xl font-bold text-darkBlue mb-2">
              {project.name}
            </h3>
            <p className="text-gray-600 text-lg">
              {project.location}
            </p>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-4 py-4 border-y border-gray-100">
            <div className="text-center">
              <p className="text-xl font-bold text-darkBlue">{project.floors}</p>
              <p className="text-sm text-gray-600">الطوابق</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold text-darkBlue">{project.units}</p>
              <p className="text-sm text-gray-600">الشقق</p>
            </div>
          </div>

          {/* Price Section */}
          <div className="text-center">
            <p className="text-lg font-medium text-gray-600">السعر</p>
            <p className="text-2xl font-bold text-gold">
              {formatPrice(project.price)}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
});

ProjectCard.displayName = 'ProjectCard';

export default ProjectCard;