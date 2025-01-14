import { useState, useEffect } from "react";
import { Menu, X, Phone } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  const phoneNumber = "+966505148231";
  const whatsappNumber = "966505148231";

  const handleCall = () => {
    window.location.href = `tel:${phoneNumber}`;
  };

  const handleWhatsApp = () => {
    window.location.href = `https://wa.me/${whatsappNumber}`;
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
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
      navigate('/');
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
    { href: "projects", text: "العقارات" },
    { href: "services", text: "من نحن" },
    { href: "stats", text: "تمويل" },
    { href: "about", text: "أملاك عقارية" },
    { href: "contact", text: "طلب استثمار" },
    { href: "login", text: "تسجيل" },
  ];

  const isProjectPage = location.pathname.includes('/project/');

  const renderContactButton = () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="nav-link font-ibm-arabic text-white font-medium text-lg hover:text-gold transition-colors duration-300">
          اتصل بنا
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-[200px]">
        <DropdownMenuItem onClick={handleCall} className="gap-2 cursor-pointer">
          <Phone className="h-5 w-5" />
          <span>اتصل بنا</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleWhatsApp} className="gap-2 cursor-pointer">
          <img 
            src="/lovable-uploads/5a30ecf6-b0b1-41ce-908d-7d07e173fe6e.png" 
            alt="WhatsApp"
            className="h-5 w-5"
          />
          <span>واتساب</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return (
    <header
      className={`${
        isProjectPage ? 'absolute' : 'fixed'
      } top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-black/80 backdrop-blur-sm" : "bg-transparent"
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
                  className="nav-link font-ibm-arabic text-white font-medium text-lg hover:text-gold transition-colors duration-300"
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
            className="text-white"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full right-0 left-0 bg-black/90 backdrop-blur-sm shadow-lg animate-slide-in">
            <nav className="flex flex-col p-4 rtl">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  className="nav-link py-3 font-ibm-arabic text-lg text-white hover:text-gold transition-colors duration-300 text-right w-full"
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