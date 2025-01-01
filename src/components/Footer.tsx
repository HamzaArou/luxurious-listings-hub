import { Facebook, Twitter, Instagram, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-darkBlue text-white py-16">
      <div className="container mx-auto px-4 max-w-[960px]">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="text-center md:text-right">
            <img
              src="/lovable-uploads/3f96563e-0fb6-4f64-b584-79204ea99e21.png"
              alt="مجموعة الفيصل العقارية"
              className="h-24 w-auto mb-4 mx-auto md:mx-0"
            />
            <p className="text-white/80">
              نرتقي بتجربة التملك العقاري
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">روابط سريعة</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="hover:text-gold transition-colors">
                  الرئيسية
                </a>
              </li>
              <li>
                <a href="/projects" className="hover:text-gold transition-colors">
                  مشاريعنا
                </a>
              </li>
              <li>
                <a href="/services" className="hover:text-gold transition-colors">
                  خدماتنا
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-gold transition-colors">
                  عن الشركة
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-gold transition-colors">
                  اتصل بنا
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">تواصل معنا</h3>
            <div className="flex space-x-4 justify-center md:justify-start">
              <a
                href="#"
                className="text-white hover:text-gold transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-6 h-6" />
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
