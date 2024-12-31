import { Building2, Home } from "lucide-react";
import { Card, CardContent, CardFooter } from "./ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const projects = [
  {
    id: 1,
    name: "HAVEN 1",
    image: "/lovable-uploads/haven1.jpg",
    details: "12 طابق | 48 شقة",
    status: "للبيع",
  },
  {
    id: 2,
    name: "HAVEN 2",
    image: "/lovable-uploads/haven2.jpg",
    details: "10 طوابق | 40 شقة",
    status: "قريباً",
  },
  // Add more projects as needed
];

const FeaturedProjects = () => {
  return (
    <section className="pt-8 pb-24 bg-[#f5f5f5]">
      <div className="container mx-auto px-4 max-w-[960px]">
        <div className="mb-6 text-center">
          <h2 className="text-3xl font-bold text-white inline-block bg-black px-4 py-2 rounded-tl-[100px] rounded-tr-[100px] rounded-br rounded-bl">
            مشاريع الفيصل
          </h2>
        </div>

        <div className="flex items-center justify-between bg-black rounded-full px-6 w-full max-w-[462px] h-[54px] mb-4 mx-auto">
          <div className="flex gap-2 flex-1">
            <Select>
              <SelectTrigger className="w-full bg-white rounded-full border-none">
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="haven1">HAVEN 1</SelectItem>
                <SelectItem value="haven2">HAVEN 2</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="w-full bg-white rounded-full border-none">
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="started">بدأ البيع</SelectItem>
                <SelectItem value="sold">تم البيع بالكامل</SelectItem>
                <SelectItem value="coming">قريباً</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <span className="text-white text-xl font-semibold ml-4">
            ابحث عن وحدتك
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card key={project.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="relative h-48">
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-full object-cover"
                />
                <span
                  className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm ${
                    project.status === "للبيع"
                      ? "bg-gold text-white"
                      : "bg-darkBlue text-white"
                  }`}
                >
                  {project.status}
                </span>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-darkBlue mb-2">
                  {project.name}
                </h3>
                <p className="text-gray-600 flex items-center gap-2">
                  <Building2 className="w-4 h-4" />
                  {project.details}
                </p>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <button className="w-full luxury-button-secondary">
                  عرض التفاصيل
                </button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;