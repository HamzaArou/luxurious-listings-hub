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
    <div className="flex flex-col md:flex-row items-center justify-between bg-deepBlue rounded-full px-3 md:px-6 py-3 md:py-0 w-full max-w-[462px] min-h-[54px] mb-4 mx-auto gap-2 md:gap-0">
      <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto order-2 md:order-1">
        <Select onValueChange={handleNeighborhoodChange}>
          <SelectTrigger className="w-full md:w-[140px] bg-white rounded-full border-none">
            <SelectValue placeholder="اسم الحي" />
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
          <SelectTrigger className="w-full md:w-[140px] bg-white rounded-full border-none">
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
      
      <span className="text-white text-lg md:text-xl font-semibold order-1 md:order-2 md:mr-4">
        ابحث عن وحدتك
      </span>
    </div>
  );
};

export default ProjectSearch;