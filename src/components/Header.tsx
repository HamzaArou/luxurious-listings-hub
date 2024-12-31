import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? "h-[67px] bg-white/95 shadow-md" : "h-[67px] bg-white/95"
      }`}
    >
      <div className="max-w-[960px] mx-auto h-full flex items-center justify-between px-4">
        {/* Logo Section - Left side */}
        <div className="flex items-center order-last">
          <img
            src="/lovable-uploads/452d0f08-89bf-4863-9d95-46a23971500f.png"
            alt="مجموعة الفيصل العقارية"
            className="h-12 transition-all duration-300"
          />
        </div>

        {/* Desktop Navigation - Center */}
        <nav className="hidden lg:flex items-center space-x-8 rtl">
          <a href="#home" className="nav-link font-ibm-arabic text-lg">الرئيسية</a>
          <a href="#about" className="nav-link font-ibm-arabic text-lg">عن الشركة</a>
          <a href="#services" className="nav-link font-ibm-arabic text-lg">خدماتنا</a>
          <a href="#projects" className="nav-link font-ibm-arabic text-lg">مشاريعنا</a>
          <a href="#contact" className="nav-link font-ibm-arabic text-lg">اتصل بنا</a>
        </nav>

        {/* CTA Button - Right side for RTL */}
        <div className="hidden lg:block order-first">
          <button className="luxury-button-primary font-ibm-arabic">استفسر الآن</button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2 order-first"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "إغلاق القائمة" : "فتح القائمة"}
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6 text-darkBlue" />
          ) : (
            <Menu className="h-6 w-6 text-darkBlue" />
          )}
        </button>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full right-0 left-0 bg-white shadow-lg animate-slide-in">
            <nav className="flex flex-col p-4 rtl">
              <a href="#home" className="nav-link py-3 font-ibm-arabic text-lg">الرئيسية</a>
              <a href="#about" className="nav-link py-3 font-ibm-arabic text-lg">عن الشركة</a>
              <a href="#services" className="nav-link py-3 font-ibm-arabic text-lg">خدماتنا</a>
              <a href="#projects" className="nav-link py-3 font-ibm-arabic text-lg">مشاريعنا</a>
              <a href="#contact" className="nav-link py-3 font-ibm-arabic text-lg">اتصل بنا</a>
              <button className="luxury-button-primary mt-4 w-full font-ibm-arabic">
                استفسر الآن
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;