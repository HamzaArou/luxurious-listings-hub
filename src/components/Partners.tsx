const partners = [
  {
    name: "إعمار العقارية",
    logo: "/lovable-uploads/9da07a5e-838b-40c6-92f1-f39fdeaa9617.png",
  },
  {
    name: "الدار العقارية",
    logo: "/lovable-uploads/db55941a-5021-4dc1-bf90-c9d97fd3e82c.png",
  },
  {
    name: "شركة دار الأركان",
    logo: "/lovable-uploads/452d0f08-89bf-4863-9d95-46a23971500f.png",
  },
  {
    name: "مجموعة طلعت مصطفى",
    logo: "/lovable-uploads/9da07a5e-838b-40c6-92f1-f39fdeaa9617.png",
  },
  {
    name: "شركة جبل عمر للتطوير",
    logo: "/lovable-uploads/db55941a-5021-4dc1-bf90-c9d97fd3e82c.png",
  },
  {
    name: "شركة مكة للإنشاء والتعمير",
    logo: "/lovable-uploads/452d0f08-89bf-4863-9d95-46a23971500f.png",
  },
  {
    name: "الشركة العقارية السعودية",
    logo: "/lovable-uploads/9da07a5e-838b-40c6-92f1-f39fdeaa9617.png",
  },
  {
    name: "شركة البحر الأحمر العالمية",
    logo: "/lovable-uploads/db55941a-5021-4dc1-bf90-c9d97fd3e82c.png",
  },
  {
    name: "مدينة نيوم",
    logo: "/lovable-uploads/452d0f08-89bf-4863-9d95-46a23971500f.png",
  },
  {
    name: "شركة المراكز العربية",
    logo: "/lovable-uploads/9da07a5e-838b-40c6-92f1-f39fdeaa9617.png",
  },
];

const Partners = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-darkBlue">
          شركاؤنا في النجاح
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center p-4 rounded-lg hover:shadow-lg transition-shadow duration-300"
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className="w-24 h-24 object-contain mb-4"
              />
              <p className="text-center text-gray-700 font-medium">{partner.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partners;