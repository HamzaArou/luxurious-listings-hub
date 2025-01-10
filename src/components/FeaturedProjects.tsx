import { useState } from "react";
import { Button } from "./ui/button";
import ProjectSearch from "./projects/ProjectSearch";
import ProjectCard from "./projects/ProjectCard";
import MortgageCalculator from "./MortgageCalculator";

const staticProjects = [
  {
    id: "1",
    name: "برج السلام",
    location: "حي النزهة",
    details: "12 طابق | 48 شقة",
    status: "بدأ البيع",
    floors: 12,
    units: 48,
    apartments: 48,
    annexes: 12,
    projectLabel: "مشروع",
    thumbnail_url: "/lovable-uploads/452d0f08-89bf-4863-9d95-46a23971500f.png",
  },
  {
    id: "2",
    name: "برج الفيصل",
    location: "حي الروضة",
    details: "10 طابق | 40 شقة",
    status: "قريباً",
    floors: 10,
    units: 40,
    apartments: 40,
    annexes: 10,
    projectLabel: "مشروع",
    thumbnail_url: "/lovable-uploads/3d3cf84c-e710-4000-96a1-a8e3970e5ec9.png",
  },
  {
    id: "3",
    name: "برج النخيل",
    location: "حي المروج",
    details: "15 طابق | 60 شقة",
    status: "تم البيع بالكامل",
    floors: 15,
    units: 60,
    apartments: 60,
    annexes: 15,
    projectLabel: "مشروع",
    thumbnail_url: "/lovable-uploads/7c585eb4-1d55-4430-8b20-b1d80a628aad.png",
  },
  {
    id: "4",
    name: "برج الأمير",
    location: "حي الملقا",
    details: "14 طابق | 56 شقة",
    status: "بدأ البيع",
    floors: 14,
    units: 56,
    apartments: 56,
    annexes: 14,
    projectLabel: "مشروع",
    thumbnail_url: "/lovable-uploads/452d0f08-89bf-4863-9d95-46a23971500f.png",
  },
  {
    id: "5",
    name: "برج المملكة",
    location: "حي العليا",
    details: "16 طابق | 64 شقة",
    status: "قريباً",
    floors: 16,
    units: 64,
    apartments: 64,
    annexes: 16,
    projectLabel: "مشروع",
    thumbnail_url: "/lovable-uploads/3d3cf84c-e710-4000-96a1-a8e3970e5ec9.png",
  },
  {
    id: "6",
    name: "برج الياسمين",
    location: "حي الورود",
    details: "11 طابق | 44 شقة",
    status: "بدأ البيع",
    floors: 11,
    units: 44,
    apartments: 44,
    annexes: 11,
    projectLabel: "مشروع",
    thumbnail_url: "/lovable-uploads/7c585eb4-1d55-4430-8b20-b1d80a628aad.png",
  },
  {
    id: "7",
    name: "برج الصفا",
    location: "حي الصحافة",
    details: "13 طابق | 52 شقة",
    status: "قريباً",
    floors: 13,
    units: 52,
    apartments: 52,
    annexes: 13,
    projectLabel: "مشروع",
    thumbnail_url: "/lovable-uploads/452d0f08-89bf-4863-9d95-46a23971500f.png",
  },
  {
    id: "8",
    name: "برج المروة",
    location: "حي النخيل",
    details: "9 طابق | 36 شقة",
    status: "بدأ البيع",
    floors: 9,
    units: 36,
    apartments: 36,
    annexes: 9,
    projectLabel: "مشروع",
    thumbnail_url: "/lovable-uploads/3d3cf84c-e710-4000-96a1-a8e3970e5ec9.png",
  },
  {
    id: "9",
    name: "برج الريحان",
    location: "حي الياسمين",
    details: "17 طابق | 68 شقة",
    status: "قريباً",
    floors: 17,
    units: 68,
    apartments: 68,
    annexes: 17,
    projectLabel: "مشروع",
    thumbnail_url: "/lovable-uploads/7c585eb4-1d55-4430-8b20-b1d80a628aad.png",
  }
];

const FeaturedProjects = () => {
  const [displayCount, setDisplayCount] = useState(6);
  const displayedProjects = staticProjects.slice(0, displayCount);
  const hasMoreProjects = staticProjects.length > displayCount;

  const handleLoadMore = () => {
    setDisplayCount(prev => Math.min(prev + 3, staticProjects.length));
  };

  return (
    <>
      <section className="pt-8 pb-24 bg-[#f5f5f5]">
        <div className="container mx-auto px-4">
          <div className="mb-6 text-right">
            <h2 className="text-3xl font-bold text-white inline-block bg-darkBlue px-4 py-2 rounded-tl-[100px] rounded-tr-[5px] rounded-br-[100px] rounded-bl-[5px]">
              مشاريع الفيصل
            </h2>
          </div>

          <div className="max-w-[960px] mx-auto">
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
                  عرض المزيد..
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>
      <MortgageCalculator />
    </>
  );
};

export default FeaturedProjects;