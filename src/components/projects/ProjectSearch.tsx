import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const ProjectSearch = () => {
  return (
    <div className="flex items-center justify-between bg-darkBlue rounded-full px-6 w-full max-w-[462px] h-[54px] mb-4 mx-auto">
      <div className="flex gap-2 flex-1">
        <Select>
          <SelectTrigger className="w-full bg-white rounded-full border-none">
            <SelectValue placeholder="اسم الحي" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="haven1">HAVEN 1</SelectItem>
            <SelectItem value="haven2">HAVEN 2</SelectItem>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger className="w-full bg-white rounded-full border-none">
            <SelectValue placeholder="حالة المشروع" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="started">بدأ البيع</SelectItem>
            <SelectItem value="sold">تم البيع بالكامل</SelectItem>
            <SelectItem value="coming">قريباً</SelectItem>
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