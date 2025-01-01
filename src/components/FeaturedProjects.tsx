import { Building2 } from "lucide-react";
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
    location: "الروضة",
    floors: 4,
    apartments: 8,
    annexes: 2,
    projectLabel: "مشروع",
  },
  {
    id: 2,
    name: "HAVEN 2",
    image: "/lovable-uploads/haven2.jpg",
    details: "10 طوابق | 40 شقة",
    status: "قريباً",
    location: "الروضة",
    floors: 4,
    apartments: 8,
    annexes: 2,
    projectLabel: "مشروع",
  },
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card key={project.id} className="overflow-hidden h-[432px] bg-white rounded-[40px] shadow-lg">
              <div className="p-2 text-center">
                <p className="text-gold text-lg mb-1">{project.projectLabel}</p>
                <h3 className="text-3xl font-bold text-gold mb-1">
                  {project.name}
                </h3>
                <p className="text-darkBlue text-lg">{project.location}</p>
              </div>
              
              <div className="relative h-[243px] w-[277px] mx-auto">
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-4 left-4 px-4 py-1 bg-gold text-white rounded-full text-sm">
                  قريباً
                </span>
              </div>

              <div className="flex justify-between items-center bg-gray-100 mx-4 mt-0 rounded-lg p-2">
                <div className="text-center">
                  <p className="text-xl font-bold text-darkBlue">{project.annexes}</p>
                  <p className="text-sm text-gray-600">الملاحق</p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold text-darkBlue">{project.apartments}</p>
                  <p className="text-sm text-gray-600">الشقق</p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold text-darkBlue">{project.floors}</p>
                  <p className="text-sm text-gray-600">الأدوار</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;