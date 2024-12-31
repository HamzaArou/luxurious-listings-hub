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
        isScrolled
          ? "h-20 bg-white shadow-md"
          : "h-32 bg-white/95"
      }`}
    >
      <div className="container mx-auto h-full flex items-center justify-between px-4">
        <div className="flex items-center">
          <img
            src="/logo.png"
            alt="Al Faisal Real Estate"
            className={`transition-all duration-300 ${
              isScrolled ? "h-12" : "h-16"
            }`}
          />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          <a href="#home" className="nav-link">الرئيسية</a>
          <a href="#about" className="nav-link">عن الشركة</a>
          <a href="#services" className="nav-link">خدماتنا</a>
          <a href="#projects" className="nav-link">مشاريعنا</a>
          <a href="#contact" className="nav-link">اتصل بنا</a>
          <button className="luxury-button-primary">استفسر الآن</button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6 text-darkBlue" />
          ) : (
            <Menu className="h-6 w-6 text-darkBlue" />
          )}
        </button>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-lg animate-slide-in">
            <nav className="flex flex-col p-4">
              <a href="#home" className="nav-link py-2">الرئيسية</a>
              <a href="#about" className="nav-link py-2">عن الشركة</a>
              <a href="#services" className="nav-link py-2">خدماتنا</a>
              <a href="#projects" className="nav-link py-2">مشاريعنا</a>
              <a href="#contact" className="nav-link py-2">اتصل بنا</a>
              <button className="luxury-button-primary mt-4">استفسر الآن</button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;