import { Building2, Store, Wrench, Headphones, Building } from "lucide-react";
import { Card, CardContent } from "./ui/card";

const services = [
  {
    icon: Building,
    title: "الوساطة العقارية",
    description:
      "نقدم خدمات الوساطة العقارية المتكاملة مع التركيز على تلبية احتياجات عملائنا بكفاءة عالية",
  },
  {
    icon: Store,
    title: "التسويق العقاري",
    description:
      "نوفر حلول تسويقية مبتكرة تساعد في الوصول إلى العملاء المستهدفين بفعالية",
  },
  {
    icon: Wrench,
    title: "البناء والمقاولات",
    description:
      "نقدم خدمات البناء والمقاولات بأعلى معايير الجودة والاحترافية في التنفيذ",
  },
  {
    icon: Headphones,
    title: "التشغيل",
    description:
      "نضمن تشغيل وإدارة المشاريع العقارية بكفاءة عالية لتحقيق أفضل النتائج",
  },
  {
    icon: Building2,
    title: "التطوير العقاري",
    description:
      "نطور مشاريع عقارية متميزة تلبي تطلعات عملائنا وتضيف قيمة للمجتمع",
  },
];

const Services = () => {
  return (
    <section className="pt-12 pb-24 bg-[#f5f5f5]">
      <div className="container mx-auto px-4 max-w-[960px]">
        <div className="mb-12 text-right">
          <h2 className="text-3xl font-bold text-white inline-block bg-black px-4 py-2 rounded-tl-[100px] rounded-tr rounded-br rounded-bl">
            خدمات الفيصل
          </h2>
        </div>

        <div className="flex flex-nowrap overflow-x-auto gap-4 pb-4">
          {services.map((service, index) => (
            <Card
              key={index}
              className="flex-shrink-0 w-[200px] bg-white hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#234F27]/10 to-[#234F27]/20 flex items-center justify-center">
                  <service.icon className="w-8 h-8 text-[#234F27]" />
                </div>
                <h3 className="text-lg font-bold text-darkBlue mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {service.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;