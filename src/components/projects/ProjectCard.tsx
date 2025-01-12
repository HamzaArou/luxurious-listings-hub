import { Card } from "../ui/card";
import { useNavigate } from "react-router-dom";
import { useCallback, memo } from "react";

interface Project {
  id: string;
  name: string;
  location: string;
  status: string;
  floors: number;
  units: number;
  annexes: number;
  thumbnail_url: string;
}

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = memo(({ project }: ProjectCardProps) => {
  const navigate = useNavigate();

  const handleClick = useCallback((e: React.MouseEvent) => {
    // Prevent navigation if the user is dragging or selecting text
    if (window.getSelection()?.toString()) {
      return;
    }
    
    navigate(`/project/${project.id}`);
  }, [navigate, project.id]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'قريباً':
        return 'bg-[#F1F0FB] text-gray-700'; // Soft gray
      case 'بدأ البيع':
        return 'bg-gold text-white'; // Golden yellow
      case 'تم البيع بالكامل':
        return 'bg-newsGreen text-white'; // Dark green
      default:
        return 'bg-[#F1F0FB] text-gray-700';
    }
  };

  return (
    <div 
      onClick={handleClick} 
      className="cursor-pointer group"
      role="button"
      tabIndex={0}
    >
      <Card className="overflow-hidden bg-white rounded-[20px] shadow-lg hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-1">
        <div className="relative">
          <img
            src={project.thumbnail_url}
            alt={project.name}
            className="w-full h-[240px] object-cover"
            loading="lazy"
            decoding="async"
            fetchPriority="high"
          />
          <span className={`absolute top-4 left-4 px-4 py-1.5 rounded-full text-sm font-medium ${getStatusColor(project.status)}`}>
            {project.status}
          </span>
        </div>

        <div className="p-6">
          <h3 className="text-2xl font-bold text-darkBlue mb-2 line-clamp-1">
            {project.name}
          </h3>
          <p className="text-gray-600 mb-4 text-lg">
            {project.location}
          </p>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-warmBeige rounded-lg">
              <p className="text-xl font-bold text-darkBlue">{project.floors}</p>
              <p className="text-sm text-gray-600">الطوابق</p>
            </div>
            <div className="text-center p-3 bg-warmBeige rounded-lg">
              <p className="text-xl font-bold text-darkBlue">{project.units}</p>
              <p className="text-sm text-gray-600">الشقق</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
});

ProjectCard.displayName = 'ProjectCard';

export default ProjectCard;