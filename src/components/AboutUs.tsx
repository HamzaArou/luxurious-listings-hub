const AboutUs = () => {
  return (
    <section className="py-24 bg-[#f5f5f5]">
      <div className="container mx-auto px-4 max-w-[960px]">
        <h2 className="text-4xl font-bold text-darkBlue text-center mb-12">
          عن الشركة
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="order-2 md:order-1">
            <p className="text-gray-600 leading-relaxed mb-6">
              الفيصل للتطوير العقاري تأسست في عام 2015، وهي متخصصة في تقديم حلول عقارية مبتكرة تلبي احتياجات السوق المحلي. تركز الشركة على تطوير مشاريع سكنية وتجارية بمعايير عالية تجمع بين الجودة والاستدامة. تسعى الفيصل إلى تحقيق رضا العملاء من خلال تصميمات عصرية وخدمات مميزة تعكس رؤيتها الريادية في السوق العقاري.
            </p>
          </div>
          <div className="order-1 md:order-2 -mt-8">
            <img
              src="/lovable-uploads/248348ba-2c7a-4a5a-a40f-768a1ace462a.png"
              alt="مجموعة الفيصل العقارية - نموذج معماري"
              className="w-full h-auto max-w-[800px] mx-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;