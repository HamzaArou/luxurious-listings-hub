import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LandingFloatingContact from "@/components/LandingFloatingContact";
import RegisterInterestDialog from "@/components/RegisterInterestDialog";
import { Building2, MapPin, Tag } from "lucide-react";

const LandingPage = () => {
  const [showRegisterDialog, setShowRegisterDialog] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white pb-16">
      {/* Hero Section */}
      <section className="relative h-screen">
        <div className="absolute inset-0">
          <img
            src="/lovable-uploads/6fc860b8-1756-41bd-90cb-d1103f9913d7.png"
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
            <button
              onClick={() => setShowRegisterDialog(true)}
              className="bg-gold hover:bg-gold/90 text-white px-8 py-4 rounded-lg text-lg font-bold transition-all duration-300"
            >
              سجل اهتمامك
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-6">
            اكتشف شقق الفيصل
          </h2>
          <p className="text-lg text-center max-w-4xl mx-auto mb-16 text-gray-600 leading-relaxed">
            توفر مجموعة الفيصل العقارية تجربة سكنية متكاملة بفضل تصميمات حديثة ومواقع متميزة في مكة المكرمة. تتميز الشقق بمساحات متعددة تلبي مختلف الاحتياجات، مع مراعاة التفاصيل الدقيقة لتحقيق الراحة والجمال.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Bedrooms Feature */}
            <div className="text-center p-6 rounded-lg">
              <div className="flex justify-center mb-4">
                <Building2 className="w-12 h-12 text-gold" />
              </div>
              <h3 className="text-xl font-bold mb-2">غرف متنوعة</h3>
              <p className="text-gray-600">شقق بغرف متعددة تناسب الجميع</p>
            </div>

            {/* Price Feature */}
            <div className="text-center p-6 rounded-lg">
              <div className="flex justify-center mb-4">
                <Tag className="w-12 h-12 text-gold" />
              </div>
              <h3 className="text-xl font-bold mb-2">الأسعار تبدأ من 400,000 ريال</h3>
              <p className="text-gray-600">خطط مرنة تناسب ميزانيتك</p>
            </div>

            {/* Location Feature */}
            <div className="text-center p-6 rounded-lg">
              <div className="flex justify-center mb-4">
                <MapPin className="w-12 h-12 text-gold" />
              </div>
              <h3 className="text-xl font-bold mb-2">مواقع مميزة في مكة المكرمة</h3>
              <p className="text-gray-600">سهولة الوصول إلى جميع الخدمات</p>
            </div>
          </div>
        </div>
      </section>

      {/* Landing Floating Contact */}
      <LandingFloatingContact onRegisterClick={() => setShowRegisterDialog(true)} />

      {/* Register Interest Dialog */}
      <RegisterInterestDialog 
        open={showRegisterDialog} 
        onOpenChange={setShowRegisterDialog}
      />
    </div>
  );
};

export default LandingPage;