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
    <section className="py-24 bg-warmBeige">
      <div className="container mx-auto px-4 max-w-[960px]">
        <h2 className="text-4xl font-bold text-darkBlue text-center mb-2">
          مشاريع الفيصل
        </h2>
        <div className="w-24 h-1 bg-gold mx-auto mb-12"></div>

        <div className="flex justify-center gap-4 mb-8">
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="اسم المشروع" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="haven1">HAVEN 1</SelectItem>
              <SelectItem value="haven2">HAVEN 2</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="حالة المشروع" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sale">للبيع</SelectItem>
              <SelectItem value="coming">قريباً</SelectItem>
            </SelectContent>
          </Select>
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