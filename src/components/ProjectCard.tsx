import { Card } from "../ui/card";
import { lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import { Project } from "@/types/project";

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <Link to={`/projects/${project.id}`}>
      <Card key={project.id} className="overflow-hidden h-[432px] bg-white rounded-[40px] shadow-lg hover:shadow-xl transition-shadow">
      <div className="p-0.5 text-center">
        <p className="text-gold text-lg mb-0">{project.projectLabel}</p>
        <h3 className="text-3xl font-bold text-gold mb-0">
          {project.name}
        </h3>
        <p className="text-darkBlue text-lg">{project.location}</p>
      </div>
      
      <div className="relative h-[243px] w-[277px] mx-auto">
        <Suspense fallback={<div className="w-full h-full bg-gray-200 animate-pulse rounded-[15px]" />}>
          <img
            src={project.image}
            alt={project.name}
            className="w-full h-full object-cover rounded-[15px]"
            loading="lazy"
            decoding="async"
          />
        </Suspense>
        <span className="absolute bottom-4 left-4 px-4 py-1 bg-gold text-white rounded-full text-sm">
          {project.status}
        </span>
      </div>

      <div className="flex justify-between items-center bg-[#E7EDF7] mx-4 mt-2 rounded-[40px] px-6 py-2">
        <div className="text-center px-2">
          <p className="text-xl font-bold text-darkBlue">{project.annexes}</p>
          <p className="text-sm text-gray-600 whitespace-nowrap">الملاحق</p>
        </div>
        <div className="text-center px-2">
          <p className="text-xl font-bold text-darkBlue">{project.units}</p>
          <p className="text-sm text-gray-600 whitespace-nowrap">الشقق</p>
        </div>
        <div className="text-center px-2">
          <p className="text-xl font-bold text-darkBlue">{project.floors}</p>
          <p className="text-sm text-gray-600 whitespace-nowrap">الأدوار</p>
        </div>
      </div>
      </Card>
    </Link>
  );
};

export default ProjectCard;