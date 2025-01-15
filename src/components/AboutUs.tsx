const AboutUs = () => {
  return (
    <section className="py-24 bg-[#2B2B2B] overflow-hidden">
      <div className="container mx-auto px-4 max-w-[1200px]">
        <h2 className="text-4xl font-bold text-white text-center mb-12">
          عن الشركة
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1 relative">
            {/* Oblique background with slanted corners */}
            <div className="absolute inset-0 bg-[#234F27] transform -skew-x-6 -skew-y-2 rounded-[20px] -z-10"></div>
            
            {/* Content with padding to prevent text clipping */}
            <div className="relative p-8">
              <p className="text-white/90 leading-relaxed mb-6 text-lg">
                الفيصل للتطوير العقاري تأسست في عام 2015، وهي متخصصة في تقديم حلول عقارية مبتكرة تلبي احتياجات السوق المحلي. تركز الشركة على تطوير مشاريع سكنية وتجارية بمعايير عالية تجمع بين الجودة والاستدامة. تسعى الفيصل إلى تحقيق رضا العملاء من خلال تصميمات عصرية وخدمات مميزة تعكس رؤيتها الريادية في السوق العقاري.
              </p>
            </div>
          </div>
          
          <div className="order-1 md:order-2 transform translate-y-[-1rem]">
            <div className="relative overflow-hidden rounded-[50px] shadow-2xl">
              <img
                src="/lovable-uploads/553bf2ea-8559-47f8-8a5d-d23e8dadffc6.png"
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