import { useState } from "react";
import { Building2 } from "lucide-react";
import { Card, CardContent, CardFooter } from "./ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";

const projects = [
  {
    id: 1,
    name: "HAVEN 1",
    image: "/lovable-uploads/9da07a5e-838b-40c6-92f1-f39fdeaa9617.png",
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
    image: "/lovable-uploads/db55941a-5021-4dc1-bf90-c9d97fd3e82c.png",
    details: "10 طوابق | 40 شقة",
    status: "قريباً",
    location: "الروضة",
    floors: 4,
    apartments: 8,
    annexes: 2,
    projectLabel: "مشروع",
  },
  {
    id: 3,
    name: "HAVEN 3",
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
    details: "14 طابق | 56 شقة",
    status: "قريباً",
    location: "الروضة",
    floors: 5,
    apartments: 10,
    annexes: 3,
    projectLabel: "مشروع",
  },
  {
    id: 4,
    name: "HAVEN 4",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    details: "11 طابق | 44 شقة",
    status: "للبيع",
    location: "الروضة",
    floors: 4,
    apartments: 8,
    annexes: 2,
    projectLabel: "مشروع",
  },
  {
    id: 5,
    name: "HAVEN 5",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
    details: "13 طابق | 52 شقة",
    status: "قريباً",
    location: "الروضة",
    floors: 5,
    apartments: 9,
    annexes: 3,
    projectLabel: "مشروع",
  },
  {
    id: 6,
    name: "HAVEN 6",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
    details: "15 طابق | 60 شقة",
    status: "للبيع",
    location: "الروضة",
    floors: 6,
    apartments: 11,
    annexes: 4,
    projectLabel: "مشروع",
  },
  {
    id: 7,
    name: "HAVEN 7",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    details: "12 طابق | 48 شقة",
    status: "قريباً",
    location: "الروضة",
    floors: 4,
    apartments: 8,
    annexes: 2,
    projectLabel: "مشروع",
  },
  {
    id: 8,
    name: "HAVEN 8",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    details: "16 طابق | 64 شقة",
    status: "للبيع",
    location: "الروضة",
    floors: 6,
    apartments: 12,
    annexes: 4,
    projectLabel: "مشروع",
  },
  {
    id: 9,
    name: "HAVEN 9",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
    details: "14 طابق | 56 شقة",
    status: "قريباً",
    location: "الروضة",
    floors: 5,
    apartments: 10,
    annexes: 3,
    projectLabel: "مشروع",
  },
];

const FeaturedProjects = () => {
  const [displayCount, setDisplayCount] = useState(9);
  const displayedProjects = projects.slice(0, displayCount);
  const hasMoreProjects = projects.length > displayCount;

  const handleLoadMore = () => {
    setDisplayCount(prev => prev + 9);
  };

  return (
    <section className="pt-8 pb-24 bg-[#f5f5f5]">
      <div className="container mx-auto px-4 max-w-[960px]">
        <div className="mb-6 text-center">
          <h2 className="text-3xl font-bold text-white inline-block bg-[#004bad] px-4 py-2 rounded-tl-[100px] rounded-tr-[100px] rounded-br rounded-bl">
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
          {displayedProjects.map((project) => (
            <Card key={project.id} className="overflow-hidden h-[432px] bg-white rounded-[40px] shadow-lg">
              <div className="p-0.5 text-center">
                <p className="text-gold text-lg mb-0">{project.projectLabel}</p>
                <h3 className="text-3xl font-bold text-gold mb-0">
                  {project.name}
                </h3>
                <p className="text-darkBlue text-lg">{project.location}</p>
              </div>
              
              <div className="relative h-[243px] w-[277px] mx-auto">
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-full object-cover rounded-[15px]"
                />
                <span className="absolute bottom-4 left-4 px-4 py-1 bg-gold text-white rounded-full text-sm">
                  {project.status}
                </span>
              </div>

              <div className="flex justify-between items-center bg-[#E7EDF7] mx-4 mt-2 rounded-[40px] px-6 py-2">
                <div className="text-center px-2">
                  <p className="text-xl font-bold text-darkBlue">{project.annexes}</p>
                  <p className="text-sm text-gray-600 whitespace-nowrap">الملاحق</p>
                </div>
                <div className="text-center px-2">
                  <p className="text-xl font-bold text-darkBlue">{project.apartments}</p>
                  <p className="text-sm text-gray-600 whitespace-nowrap">الشقق</p>
                </div>
                <div className="text-center px-2">
                  <p className="text-xl font-bold text-darkBlue">{project.floors}</p>
                  <p className="text-sm text-gray-600 whitespace-nowrap">الأدوار</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="flex justify-end mt-8">
          <Button 
            onClick={handleLoadMore}
            disabled={!hasMoreProjects}
            className="bg-gold hover:bg-gold/90 text-white px-6 py-2 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            تحميل المزيد...
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
