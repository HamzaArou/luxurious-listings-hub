import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const newsSection = document.querySelector('section:nth-of-type(2)');
      const header = document.querySelector('header');
      
      if (newsSection && header) {
        const headerBottom = header.getBoundingClientRect().height;
        const newsSectionTop = newsSection.getBoundingClientRect().top + window.scrollY;
        setIsVisible(currentScrollY + headerBottom <= newsSectionTop);
      }

      setIsScrolled(currentScrollY > 50);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const navLinks = [
    { href: "/", text: "الرئيسية" },
    { href: "/projects", text: "مشاريعنا" },
    { href: "/services", text: "خدماتنا" },
    { href: "/features", text: "مميزاتنا" },
    { href: "/about", text: "عن الشركة" },
    { href: "/contact", text: "اتصل بنا" },
  ];

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/95 shadow-md" : "bg-white/95"
      } h-[120px] transform ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="w-full h-full flex items-center" dir="ltr">
        {/* Logo Section - Left side */}
        <div className="flex items-center mr-8">
          <img
            src="/lovable-uploads/452d0f08-89bf-4863-9d95-46a23971500f.png"
            alt="مجموعة الفيصل العقارية"
            className="w-[110px] h-[115px] object-contain transition-all duration-300"
          />
        </div>

        {/* Navigation Container - Centered */}
        <div className="flex-1 max-w-[960px] mx-auto px-4">
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center justify-start rtl">
            <div className="flex gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="nav-link font-ibm-arabic text-[#3a3a3a] font-medium text-lg hover:text-gold transition-colors duration-300"
                >
                  {link.text}
                </a>
              ))}
            </div>
          </nav>
        </div>

        {/* Mobile Menu Button - Right side */}
        <div className="lg:hidden px-4">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "إغلاق القائمة" : "فتح القائمة"}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6 text-darkBlue" />
            ) : (
              <Menu className="h-6 w-6 text-darkBlue" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full right-0 left-0 bg-white shadow-lg animate-slide-in">
            <nav className="flex flex-col p-4 rtl">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="nav-link py-3 font-ibm-arabic text-lg hover:text-gold transition-colors duration-300"
                >
                  {link.text}
                </a>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;