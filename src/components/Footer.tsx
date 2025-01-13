import { Twitter, Instagram, Linkedin, Mail, Phone } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Footer = () => {
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
  };

  return (
    <footer className="bg-darkBlue text-white py-16">
      <div className="container mx-auto px-4 max-w-[960px]">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="text-center md:text-right">
            <img
              src="/lovable-uploads/3f96563e-0fb6-4f64-b584-79204ea99e21.png"
              alt="مجموعة الفيصل العقارية"
              className="w-[160px] h-[180px] object-contain mb-4 mx-auto md:mx-0"
            />
            <p className="text-white/80">
              نرتقي بتجربة التملك العقاري
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">روابط سريعة</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => scrollToSection('hero')}
                  className="hover:text-gold transition-colors"
                >
                  الرئيسية
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('projects')}
                  className="hover:text-gold transition-colors"
                >
                  مشاريعنا
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('services')}
                  className="hover:text-gold transition-colors"
                >
                  خدماتنا
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('stats')}
                  className="hover:text-gold transition-colors"
                >
                  مميزاتنا
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('about')}
                  className="hover:text-gold transition-colors"
                >
                  عن الشركة
                </button>
              </li>
              <li>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="hover:text-gold transition-colors">
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
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">تواصل معنا</h3>
            <div className="flex gap-4 justify-center md:justify-start">
              <a
                href="#"
                className="text-white hover:text-gold transition-colors"
                aria-label="Snapchat"
              >
                <svg
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                </svg>
              </a>
              <a
                href="#"
                className="text-white hover:text-gold transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-6 h-6" />
              </a>
              <a
                href="#"
                className="text-white hover:text-gold transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-6 h-6" />
              </a>
              <a
                href="#"
                className="text-white hover:text-gold transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">النشرة البريدية</h3>
            <div className="flex">
              <input
                type="email"
                placeholder="البريد الإلكتروني"
                className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-r focus:outline-none focus:border-gold"
              />
              <button
                className="px-4 py-2 bg-gold text-darkBlue rounded-l hover:bg-opacity-90 transition-colors"
                aria-label="اشتراك"
              >
                <Mail className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 text-center">
          <p className="text-white/60">
            © جميع الحقوق محفوظة لمجموعة الفيصل العقارية {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;