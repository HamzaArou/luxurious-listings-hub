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
              انطلقت مجموعة الفيصل العقارية من خلال مؤسسة صغيرة بمدينة مكة المكرمة من مهندسين وإداريين، اما اليوم حققت الشركة ولله الحمد قفزات عملاقة حتى أصبحت تغطي خدماتها معظم أحياء مدينة مكة من خلال عدة مشاريع وبطاقم فني وإداري كبير بخبرات طويلة وكفاءة عالية مدعوما ومجهزا بأحدث ما توصلت إليه الابتكارات في المجال.
            </p>
          </div>
          <div className="order-1 md:order-2 -mt-8">
            <img
              src="/uploads/3ac7b96d-eb11-49c6-9323-81eb68b103b0.png"
              alt="مجموعة الفيصل العقارية - شعار الشركة"
              className="w-full h-auto max-w-[800px] mx-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;