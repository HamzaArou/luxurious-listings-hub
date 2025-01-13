import { Twitter, Instagram, Linkedin, Mail, Phone } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();

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
                <path d="M12 2a10 10 0 0 0-2.45 19.68c-.15-1.36-.37-5.06.05-7.25.37-1.92 2.37-12.32 2.4-12.43a.37.37 0 0 0-.65-.32c-.24.32-2.46 3.45-2.85 4.22-1.55 3.08-1.87 6.11-1.87 6.11-.51.29-1.91-.33-2.91-.95a.4.4 0 0 0-.58.42c.16.61 1.45 2.15 2.61 2.47 1.17.32 2.05.14 2.05.14s-.13 1.73-.17 2.33c-.04.6-.24 1.11.31 1.55.55.44 1.65.86 2.24 1.09.59.23 1.16.38 1.52.38.36 0 .93-.15 1.52-.38.59-.23 1.69-.65 2.24-1.09.55-.44.35-.95.31-1.55-.04-.6-.17-2.33-.17-2.33s.88.18 2.05-.14c1.16-.32 2.45-1.86 2.61-2.47a.4.4 0 0 0-.58-.42c-1 .62-2.4 1.24-2.91.95 0 0-.32-3.03-1.87-6.11-.39-.77-2.61-3.9-2.85-4.22a.37.37 0 0 0-.65.32c.03.11 2.03 10.51 2.4 12.43.42 2.19.2 5.89.05 7.25A10 10 0 0 0 12 2z"/>
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
