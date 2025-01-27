import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LandingFloatingContact from "@/components/LandingFloatingContact";
import RegisterInterestDialog from "@/components/RegisterInterestDialog";

const LandingPage = () => {
  const [showRegisterDialog, setShowRegisterDialog] = useState(false);

  useEffect(() => {
    // Scroll to top on component mount
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