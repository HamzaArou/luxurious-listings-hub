import { ShieldCheck, Home, BarChart3, Users } from "lucide-react";
import { Card, CardContent } from "./ui/card";

const services = [
  {
    icon: Home,
    title: "التطوير العقاري",
    description:
      "نقدم خدمات التطوير العقاري المتكاملة مع التركيز على الجودة والابتكار في كل مشروع",
  },
  {
    icon: BarChart3,
    title: "التسويق العقاري",
    description:
      "نوفر حلول تسويقية مبتكرة تساعد في الوصول إلى العملاء المستهدفين بفعالية",
  },
  {
    icon: ShieldCheck,
    title: "إدارة الأملاك",
    description:
      "نقدم خدمات إدارة الأملاك الشاملة لضمان الحفاظ على قيمة الاستثمار العقاري",
  },
  {
    icon: Users,
    title: "الاستشارات العقارية",
    description:
      "نقدم استشارات عقارية احترافية تساعد عملائنا في اتخاذ القرارات الاستثمارية الصحيحة",
  },
];

const Services = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 max-w-[960px]">
        <div className="mb-12 text-right">
          <h2 className="text-3xl font-bold text-white inline-block bg-black px-4 py-2 rounded-tl-[100px] rounded-tr rounded-br rounded-bl">
            خدمات الفيصل
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <Card
              key={index}
              className="bg-warmBeige hover:shadow-lg transition-shadow duration-300"
            >
              <CardContent className="p-6 text-center">
                <service.icon className="w-12 h-12 text-gold mx-auto mb-4" />
                <h3 className="text-xl font-bold text-darkBlue mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;