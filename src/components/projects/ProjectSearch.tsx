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
    <div className="flex items-center justify-between bg-darkBlue rounded-full px-6 w-full max-w-[462px] h-[54px] mb-4 mx-auto">
      <div className="flex gap-2 flex-1">
        <Select onValueChange={handleNeighborhoodChange}>
          <SelectTrigger className="w-full bg-white rounded-full border-none">
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
          <SelectTrigger className="w-full bg-white rounded-full border-none">
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
      
      <span className="text-white text-xl font-semibold mr-4">
        ابحث عن وحدتك
      </span>
    </div>
  );
};

export default ProjectSearch;