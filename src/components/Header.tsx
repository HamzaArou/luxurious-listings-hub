import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Only apply scroll-hiding behavior on the home page
      if (!location.pathname.includes('/project/')) {
        const newsSection = document.querySelector('section:nth-of-type(2)');
        const header = document.querySelector('header');
        
        if (newsSection && header) {
          const headerBottom = header.getBoundingClientRect().height;
          const newsSectionTop = newsSection.getBoundingClientRect().top + window.scrollY;
          setIsVisible(currentScrollY + headerBottom <= newsSectionTop);
        }
      }

      setIsScrolled(currentScrollY > 50);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, location.pathname]);

  const scrollToSection = (sectionId: string) => {
    const isProjectPage = location.pathname.includes('/project/');
    
    if (isProjectPage) {
      // If on project page, first navigate to home
      navigate('/');
      // Then scroll after a small delay to ensure navigation is complete
      setTimeout(() => {
        const section = document.getElementById(sectionId);
        if (section) {
          const headerHeight = document.querySelector('header')?.getBoundingClientRect().height || 0;
          const sectionTop = section.offsetTop - headerHeight;
          window.scrollTo({
            top: sectionTop,
            behavior: 'smooth'
          });
        }
      }, 100);
    } else {
      // On homepage, just scroll
      const section = document.getElementById(sectionId);
      if (section) {
        const headerHeight = document.querySelector('header')?.getBoundingClientRect().height || 0;
        const sectionTop = section.offsetTop - headerHeight;
        window.scrollTo({
          top: sectionTop,
          behavior: 'smooth'
        });
      }
    }
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { href: "hero", text: "الرئيسية" },
    { href: "news", text: "مشاريعنا" },
    { href: "services", text: "خدماتنا" },
    { href: "stats", text: "مميزاتنا" },
    { href: "about", text: "عن الشركة" },
    { href: "contact", text: "اتصل بنا" },
  ];

  const isProjectPage = location.pathname.includes('/project/');

  return (
    <header
      className={`${
        isProjectPage ? 'absolute' : 'fixed'
      } top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/95 shadow-md" : "bg-white/95"
      } h-[120px] transform ${
        !isProjectPage && !isVisible ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="w-full h-full flex items-center px-10" dir="ltr">
        {/* Logo Section - Left side */}
        <div className="flex items-center">
          <button onClick={() => scrollToSection('hero')}>
            <img
              src="/lovable-uploads/452d0f08-89bf-4863-9d95-46a23971500f.png"
              alt="مجموعة الفيصل العقارية"
              className="w-[110px] h-[115px] object-contain transition-all duration-300"
            />
          </button>
        </div>

        {/* Navigation Container - Centered */}
        <div className="flex-1 max-w-[960px] mx-auto px-4">
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center justify-start rtl">
            <div className="flex gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  className="nav-link font-ibm-arabic text-[#3a3a3a] font-medium text-lg hover:text-gold transition-colors duration-300"
                >
                  {link.text}
                </button>
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
                <button
                  key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  className="nav-link py-3 font-ibm-arabic text-lg hover:text-gold transition-colors duration-300 text-right w-full"
                >
                  {link.text}
                </button>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;