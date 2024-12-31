const AboutUs = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 max-w-[960px]">
        <h2 className="text-4xl font-bold text-darkBlue text-center mb-12">
          عن الشركة
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="order-2 md:order-1">
            <p className="text-gray-600 leading-relaxed mb-6">
              مجموعة الفيصل العقارية هي شركة رائدة في مجال التطوير العقاري، تأسست
              بهدف تقديم حلول سكنية مبتكرة تلبي تطلعات عملائنا. نحن نؤمن بأن كل
              مشروع هو فرصة لإضافة قيمة حقيقية للمجتمع وتحسين جودة الحياة.
            </p>
            <p className="text-gray-600 leading-relaxed">
              نحن نجمع بين الخبرة العميقة في السوق العقاري والرؤية المستقبلية
              المبتكرة لتطوير مشاريع تتميز بالجودة العالية والتصميم المعماري
              الفريد. هدفنا هو تجاوز توقعات عملائنا وتقديم تجربة سكنية استثنائية.
            </p>
          </div>
          <div className="order-1 md:order-2">
            <img
              src="/lovable-uploads/about-image.jpg"
              alt="مجموعة الفيصل العقارية"
              className="rounded-lg shadow-lg w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;