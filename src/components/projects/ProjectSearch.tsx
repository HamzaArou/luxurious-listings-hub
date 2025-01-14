import { useMemo } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { staticProjects } from "../FeaturedProjects";

interface ProjectSearchProps {
  onFilterChange: (neighborhood: string, status: string) => void;
}

const ProjectSearch = ({ onFilterChange }: ProjectSearchProps) => {
  // Memoize unique neighborhoods to prevent recalculation on every render
  const uniqueNeighborhoods = useMemo(() => {
    return Array.from(
      new Set(staticProjects.map(project => project.location))
    ).sort();
  }, []); // Empty dependency array since staticProjects is constant

  const handleNeighborhoodChange = (value: string) => {
    onFilterChange(value, "all");
  };

  const handleStatusChange = (value: string) => {
    onFilterChange("all", value);
  };

  return (
    <div className="flex flex-col items-center justify-center bg-deepBlue rounded-[30px] px-4 md:px-8 py-4 w-full max-w-[500px] mb-4 mx-auto gap-3">
      <span className="text-white text-xl md:text-2xl font-semibold mb-2">
        ابحث عن وحدتك
      </span>
      
      <div className="flex flex-col w-full gap-3">
        <Select onValueChange={handleNeighborhoodChange}>
          <SelectTrigger className="w-full h-12 bg-white rounded-full border-none text-right">
            <SelectValue placeholder="جميع الأحياء" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">جميع الأحياء</SelectItem>
            {uniqueNeighborhoods.map((neighborhood) => (
              <SelectItem key={neighborhood} value={neighborhood}>
                {neighborhood}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select onValueChange={handleStatusChange}>
          <SelectTrigger className="w-full h-12 bg-white rounded-full border-none text-right">
            <SelectValue placeholder="حالة المشروع" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">الكل</SelectItem>
            <SelectItem value="بدأ البيع">بدأ البيع</SelectItem>
            <SelectItem value="تم البيع بالكامل">تم البيع بالكامل</SelectItem>
            <SelectItem value="قريباً">قريباً</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default ProjectSearch;