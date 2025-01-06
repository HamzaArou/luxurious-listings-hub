import { useState } from "react";
import { Button } from "./ui/button";
import ProjectSearch from "./projects/ProjectSearch";
import ProjectCard from "./projects/ProjectCard";

const projects = [
  {
    id: 1,
    name: "HAVEN 1",
    image: "/lovable-uploads/9da07a5e-838b-40c6-92f1-f39fdeaa9617.png",
    details: "12 طابق | 48 شقة",
    status: "للبيع",
    location: "الروضة",
    floors: 4,
    apartments: 8,
    annexes: 2,
    projectLabel: "مشروع",
  },
  {
    id: 2,
    name: "HAVEN 2",
    image: "/lovable-uploads/db55941a-5021-4dc1-bf90-c9d97fd3e82c.png",
    details: "10 طوابق | 40 شقة",
    status: "قريباً",
    location: "الروضة",
    floors: 4,
    apartments: 8,
    annexes: 2,
    projectLabel: "مشروع",
  },
  {
    id: 3,
    name: "HAVEN 3",
    image: "/lovable-uploads/5b16b3ac-fca0-469d-9d0e-d71d66fc32bb.png",
    details: "14 طابق | 56 شقة",
    status: "قريباً",
    location: "الروضة",
    floors: 5,
    apartments: 10,
    annexes: 3,
    projectLabel: "مشروع",
  },
  {
    id: 4,
    name: "HAVEN 4",
    image: "/lovable-uploads/1ba76971-acaa-4990-9013-dd2668ead092.png",
    details: "11 طابق | 44 شقة",
    status: "للبيع",
    location: "الروضة",
    floors: 4,
    apartments: 8,
    annexes: 2,
    projectLabel: "مشروع",
  },
  {
    id: 5,
    name: "HAVEN 5",
    image: "/lovable-uploads/0e258d86-2d59-4857-b552-75ee813f4987.png",
    details: "13 طابق | 52 شقة",
    status: "قريباً",
    location: "الروضة",
    floors: 5,
    apartments: 9,
    annexes: 3,
    projectLabel: "مشروع",
  },
  {
    id: 6,
    name: "HAVEN 6",
    image: "/lovable-uploads/3d3cf84c-e710-4000-96a1-a8e3970e5ec9.png",
    details: "15 طابق | 60 شقة",
    status: "للبيع",
    location: "الروضة",
    floors: 6,
    apartments: 11,
    annexes: 4,
    projectLabel: "مشروع",
  },
  {
    id: 7,
    name: "HAVEN 7",
    image: "/lovable-uploads/5b16b3ac-fca0-469d-9d0e-d71d66fc32bb.png",
    details: "12 طابق | 48 شقة",
    status: "قريباً",
    location: "الروضة",
    floors: 4,
    apartments: 8,
    annexes: 2,
    projectLabel: "مشروع",
  },
  {
    id: 8,
    name: "HAVEN 8",
    image: "/lovable-uploads/1ba76971-acaa-4990-9013-dd2668ead092.png",
    details: "16 طابق | 64 شقة",
    status: "للبيع",
    location: "الروضة",
    floors: 6,
    apartments: 12,
    annexes: 4,
    projectLabel: "مشروع",
  },
  {
    id: 9,
    name: "HAVEN 9",
    image: "/lovable-uploads/0e258d86-2d59-4857-b552-75ee813f4987.png",
    details: "14 طابق | 56 شقة",
    status: "قريباً",
    location: "الروضة",
    floors: 5,
    apartments: 10,
    annexes: 3,
    projectLabel: "مشروع",
  },
];

const FeaturedProjects = () => {
  const [displayCount, setDisplayCount] = useState(6);
  const displayedProjects = projects.slice(0, displayCount);
  const hasMoreProjects = projects.length > displayCount;

  const handleLoadMore = () => {
    setDisplayCount(prev => Math.min(prev + 3, projects.length));
  };

  return (
    <section className="pt-8 pb-24 bg-[#f5f5f5]">
      <div className="container mx-auto px-4 max-w-[960px]">
        <div className="mb-6 flex justify-end">
          <h2 className="text-3xl font-bold text-white inline-block bg-darkBlue px-4 py-2 rounded-tl-[100px] rounded-tr-[100px] rounded-br rounded-bl">
            مشاريع الفيصل
          </h2>
        </div>

        <ProjectSearch />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {hasMoreProjects && (
          <div className="flex justify-end mt-8">
            <Button 
              onClick={handleLoadMore}
              className="bg-gold hover:bg-gold/90 text-white px-6 py-2 rounded-full"
            >
              تحميل المزيد...
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProjects;