const AboutUs = () => {
  return (
    <section className="py-24 bg-[#2B2B2B]">
      <div className="container mx-auto px-4 max-w-[1200px]">
        <h2 className="text-4xl font-bold text-white text-center mb-12">
          عن الشركة
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <p className="text-white/90 leading-relaxed mb-6 text-lg">
              الفيصل للتطوير العقاري تأسست في عام 2015، وهي متخصصة في تقديم حلول عقارية مبتكرة تلبي احتياجات السوق المحلي. تركز الشركة على تطوير مشاريع سكنية وتجارية بمعايير عالية تجمع بين الجودة والاستدامة. تسعى الفيصل إلى تحقيق رضا العملاء من خلال تصميمات عصرية وخدمات مميزة تعكس رؤيتها الريادية في السوق العقاري.
            </p>
          </div>
          <div className="order-1 md:order-2 transform translate-y-[-2rem]">
            <div className="relative overflow-hidden rounded-xl shadow-2xl">
              <img
                src="/lovable-uploads/65942aab-0bc6-4ca1-a449-bdd1443be97e.png"
                alt="مجموعة الفيصل العقارية - نموذج معماري"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;