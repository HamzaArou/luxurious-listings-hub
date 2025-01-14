import { useState, useMemo, useCallback } from "react";
import { Button } from "./ui/button";
import ProjectSearch from "./projects/ProjectSearch";
import ProjectCard from "./projects/ProjectCard";
import MortgageCalculator from "./MortgageCalculator";

export const staticProjects = [
  {
    id: "24de3b37-8a7e-4221-ae5e-14779e6522b9",
    name: "شقق تمليك وروف - مدينة مكة",
    location: "حي الشوقية - مخطط الشرائع 12",
    details: "4 وحدات | المساحات من 200 م² إلى 400 م²",
    status: "بدأ البيع",
    floors: 1,
    units: 4,
    price: 750000,
    price_max: 1400000,
    projectLabel: "مشروع",
    thumbnail_url: "/lovable-uploads/24de3b37-8a7e-4221-ae5e-14779e6522b9.png",
  }
];

const FeaturedProjects = () => {
  const [displayCount, setDisplayCount] = useState(6);
  const [selectedNeighborhood, setSelectedNeighborhood] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const filteredProjects = useMemo(() => {
    return staticProjects.filter((project) => {
      if (selectedNeighborhood === "all" && selectedStatus === "all") {
        return true;
      }
      const neighborhoodMatch = selectedNeighborhood === "all" || project.location === selectedNeighborhood;
      const statusMatch = selectedStatus === "all" || project.status === selectedStatus;
      return neighborhoodMatch && statusMatch;
    });
  }, [selectedNeighborhood, selectedStatus]);

  const displayedProjects = useMemo(() => {
    return filteredProjects.slice(0, displayCount);
  }, [filteredProjects, displayCount]);

  const hasMoreProjects = filteredProjects.length > displayCount;

  const handleLoadMore = useCallback(() => {
    setDisplayCount(prev => Math.min(prev + 3, filteredProjects.length));
  }, [filteredProjects.length]);

  const handleFilterChange = useCallback((neighborhood: string, status: string) => {
    setSelectedNeighborhood(neighborhood);
    setSelectedStatus(status);
    setDisplayCount(6);
  }, []);

  return (
    <>
      <section id="projects" className="pt-8 pb-24 bg-[#f5f5f5]">
        <div className="container mx-auto px-4">
          <div className="mb-6 text-right">
            <h2 className="text-3xl font-bold text-white inline-block bg-deepBlue px-4 py-2 rounded-tl-[100px] rounded-tr-[5px] rounded-br-[100px] rounded-bl-[5px]">
              مشاريع الفيصل
            </h2>
          </div>

          <div className="max-w-[960px] mx-auto">
            <ProjectSearch onFilterChange={handleFilterChange} />

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