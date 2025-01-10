import { Card } from "../ui/card";
import { Link } from "react-router-dom";
import { Project, convertProjectStatus } from "@/types/project";
import { Building2, Home, Layers } from "lucide-react";

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const displayStatus = convertProjectStatus(project.status);
  const annexes = Math.ceil(project.units / 4);

  return (
    <Link to={`/projects/${project.id}`}>
      <Card className="group overflow-hidden bg-white rounded-[40px] shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <div className="p-4 text-center space-y-1">
          <p className="text-gold text-sm font-medium">مشروع</p>
          <h3 className="text-2xl font-bold text-darkBlue group-hover:text-gold transition-colors">
            {project.name}
          </h3>
          <p className="text-gray-600">{project.location}</p>
        </div>
        
        <div className="relative mx-4 mb-4">
          <div className="aspect-[4/3] rounded-[30px] overflow-hidden">
            <img
              src={project.thumbnail_url}
              alt={project.name}
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
              decoding="async"
            />
          </div>
          <span className="absolute bottom-4 left-4 px-4 py-1.5 bg-gold text-white rounded-full text-sm font-medium shadow-gold">
            {displayStatus}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2 bg-[#F7F9FC] mx-4 mb-4 rounded-[30px] p-4">
          <div className="text-center space-y-1">
            <div className="mx-auto w-10 h-10 flex items-center justify-center bg-white rounded-full">
              <Building2 className="w-5 h-5 text-darkBlue" />
            </div>
            <p className="text-xl font-bold text-darkBlue">{project.floors}</p>
            <p className="text-sm text-gray-600">الأدوار</p>
          </div>
          
          <div className="text-center space-y-1">
            <div className="mx-auto w-10 h-10 flex items-center justify-center bg-white rounded-full">
              <Home className="w-5 h-5 text-darkBlue" />
            </div>
            <p className="text-xl font-bold text-darkBlue">{project.units}</p>
            <p className="text-sm text-gray-600">الشقق</p>
          </div>
          
          <div className="text-center space-y-1">
            <div className="mx-auto w-10 h-10 flex items-center justify-center bg-white rounded-full">
              <Layers className="w-5 h-5 text-darkBlue" />
            </div>
            <p className="text-xl font-bold text-darkBlue">{annexes}</p>
            <p className="text-sm text-gray-600">الملاحق</p>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default ProjectCard;