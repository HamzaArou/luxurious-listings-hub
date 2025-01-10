import { Card } from "../ui/card";

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

const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <div>
      <Card className="overflow-hidden bg-white rounded-[20px] shadow-lg hover:shadow-xl transition-shadow">
        <div className="p-4 text-center">
          <p className="text-gold text-lg mb-1">مشروع</p>
          <h3 className="text-2xl font-bold text-gold mb-1">
            {project.name}
          </h3>
          <p className="text-darkBlue text-lg mb-4">{project.location}</p>
        </div>
        
        <div className="relative">
          <img
            src={project.thumbnail_url}
            alt={project.name}
            className="w-full h-[200px] object-cover"
            loading="lazy"
            decoding="async"
          />
          <span className="absolute bottom-4 right-4 px-4 py-1 bg-gold text-white rounded-full text-sm">
            {project.status}
          </span>
        </div>

        <div className="flex justify-between items-center p-4">
          <div className="text-center flex-1">
            <p className="text-xl font-bold text-darkBlue">{project.floors}</p>
            <p className="text-sm text-gray-600">الأدوار</p>
          </div>
          <div className="text-center flex-1">
            <p className="text-xl font-bold text-darkBlue">{project.units}</p>
            <p className="text-sm text-gray-600">الشقق</p>
          </div>
          <div className="text-center flex-1">
            <p className="text-xl font-bold text-darkBlue">{project.annexes}</p>
            <p className="text-sm text-gray-600">الملاحق</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ProjectCard;