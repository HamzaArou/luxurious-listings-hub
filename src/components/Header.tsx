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
      const heroSection = document.querySelector('section'); // Gets the first section (hero)
      
      // Check if we're past the hero section
      if (heroSection) {
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
        setIsVisible(currentScrollY < heroBottom);
      }

      // Update scroll direction and header shadow
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
      <div className="max-w-[960px] mx-auto h-full flex items-center justify-between px-8">
        {/* Mobile Menu Button - Left side */}
        <button
          className="lg:hidden p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "إغلاق القائمة" : "فتح القائمة"}
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6 text-darkBlue" />
          ) : (
            <Menu className="h-6 w-6 text-darkBlue" />
          )}
        </button>

        {/* Desktop Navigation - Center */}
        <nav className="hidden lg:flex items-center space-x-8 mr-8 rtl">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="nav-link font-ibm-arabic text-lg hover:text-gold transition-colors duration-300"
            >
              {link.text}
            </a>
          ))}
        </nav>

        {/* Logo Section - Right side */}
        <div className="flex items-center justify-end">
          <img
            src="/lovable-uploads/452d0f08-89bf-4863-9d95-46a23971500f.png"
            alt="مجموعة الفيصل العقارية"
            className="h-[84px] w-auto object-contain transition-all duration-300"
          />
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