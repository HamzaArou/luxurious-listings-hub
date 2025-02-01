import { useState, useMemo, useCallback } from "react";
import { Button } from "./ui/button";
import ProjectSearch from "./projects/ProjectSearch";
import ProjectCard from "./projects/ProjectCard";
import MortgageCalculator from "./MortgageCalculator";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "./ui/use-toast";

const FeaturedProjects = () => {
  const [displayCount, setDisplayCount] = useState(6);
  const [selectedNeighborhood, setSelectedNeighborhood] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const { toast } = useToast();

  const { data: projects = [], isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from('projects')
          .select(`
            *,
            project_units(count),
            project_details(*)
          `);

        if (error) throw error;
        return data || [];
      } catch (error) {
        console.error('Error fetching projects:', error);
        toast({
          title: "خطأ في تحميل المشاريع",
          description: "حدث خطأ أثناء تحميل المشاريع. يرجى المحاولة مرة أخرى.",
          variant: "destructive",
        });
        return [];
      }
    },
    staleTime: 1000 * 60 * 5, // Consider data fresh for 5 minutes
    gcTime: 1000 * 60 * 30, // Keep unused data in cache for 30 minutes
    refetchOnMount: true, // Refetch when component mounts
    refetchOnWindowFocus: false, // Don't refetch on window focus
    retry: 2, // Retry failed requests twice
  });

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      if (selectedNeighborhood === "all" && selectedStatus === "all") {
        return true;
      }
      const neighborhoodMatch = selectedNeighborhood === "all" || project.location === selectedNeighborhood;
      const statusMatch = selectedStatus === "all" || project.status === selectedStatus;
      return neighborhoodMatch && statusMatch;
    });
  }, [projects, selectedNeighborhood, selectedStatus]);

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

  if (isLoading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="text-xl text-gray-600">جاري تحميل المشاريع...</div>
      </div>
    );
  }

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