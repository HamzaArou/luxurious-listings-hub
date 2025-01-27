import { useEffect } from "react";
import { Link } from "react-router-dom";
import FloatingContact from "@/components/FloatingContact";

const LandingPage = () => {
  useEffect(() => {
    // Scroll to top on component mount
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-screen">
        <div className="absolute inset-0">
          <img
            src="/lovable-uploads/61862f08-8050-4654-8e11-e0d6e18625c6.png"
            alt="مجموعة الفيصل العقارية"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>
        <div className="relative z-10 container mx-auto px-4 h-full flex flex-col items-center justify-center text-center text-white">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">
            اكتشف روعة العيش الفاخر
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl">
            في قلب مكة المكرمة، نقدم لك تجربة سكنية استثنائية تجمع بين الفخامة والراحة
          </p>
          <div className="flex gap-4">
            <Link
              to="/"
              className="bg-gold hover:bg-gold/90 text-white px-8 py-4 rounded-lg text-lg font-bold transition-all duration-300"
            >
              اكتشف مشاريعنا
            </Link>
            <Link
              to="/projects"
              className="bg-gold hover:bg-gold/90 text-white px-8 py-4 rounded-lg text-lg font-bold transition-all duration-300"
            >
              سجل اهتمامك
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">
            مميزات مشاريعنا
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-6">
                <img
                  src="/lovable-uploads/c87b89a6-0c42-40a2-947d-51e3a2553341.png"
                  alt="موقع استراتيجي"
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="text-xl font-bold mb-4">موقع استراتيجي</h3>
              <p className="text-gray-600">
                قريب من الحرم المكي الشريف والمرافق الحيوية
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-6">
                <img
                  src="/lovable-uploads/c0b1fc97-9a18-4732-ae45-87e2556beff1.png"
                  alt="تصميم عصري"
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="text-xl font-bold mb-4">تصميم عصري</h3>
              <p className="text-gray-600">
                تصاميم داخلية وخارجية تجمع بين الأصالة والحداثة
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-6">
                <img
                  src="/lovable-uploads/cab06c45-41de-43d7-bbaa-cdf3b3cee32f.png"
                  alt="جودة البناء"
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="text-xl font-bold mb-4">جودة البناء</h3>
              <p className="text-gray-600">
                أعلى معايير الجودة في التنفيذ والتشطيب
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">
            معرض الصور
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <img
              src="/lovable-uploads/e3cb0736-5822-44bc-b9d5-f81c5ef23bc0.png"
              alt="صور المشروع"
              className="w-full h-64 object-cover rounded-lg"
            />
            <img
              src="/lovable-uploads/7874e017-33d2-4303-90ae-cabbd7c02580.png"
              alt="صور المشروع"
              className="w-full h-64 object-cover rounded-lg"
            />
            <img
              src="/lovable-uploads/19ff9208-ea6f-4a12-a927-f964eb3a9f79.png"
              alt="صور المشروع"
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-deepBlue text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">
            تواصل معنا
          </h2>
          <div className="max-w-2xl mx-auto">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="text"
                  placeholder="الاسم الكامل"
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60"
                />
                <input
                  type="tel"
                  placeholder="رقم الجوال"
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60"
                />
              </div>
              <input
                type="email"
                placeholder="البريد الإلكتروني"
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60"
              />
              <textarea
                placeholder="رسالتك"
                rows={4}
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60"
              />
              <button
                type="submit"
                className="w-full bg-gold hover:bg-gold/90 text-white px-8 py-4 rounded-lg text-lg font-bold transition-all duration-300"
              >
                إرسال
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Add FloatingContact component */}
      <FloatingContact />
    </div>
  );
};

export default LandingPage;
