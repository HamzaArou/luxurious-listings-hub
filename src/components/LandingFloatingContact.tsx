import { Phone, MessageSquare, FileText, Facebook, Instagram, Youtube } from "lucide-react";

interface LandingFloatingContactProps {
  onRegisterClick: () => void;
}

const LandingFloatingContact = ({ onRegisterClick }: LandingFloatingContactProps) => {
  const phoneNumber = "+966505148231";
  const whatsappNumber = "966505148231"; // Removed the + for WhatsApp API format

  const handleCall = () => {
    window.location.href = `tel:${phoneNumber}`;
  };

  const handleWhatsApp = () => {
    window.location.href = `https://wa.me/${whatsappNumber}`;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white shadow-lg border-t border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-3">
          {/* Social Media Links */}
          <div className="flex gap-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold hover:text-gold/90 transition-colors"
            >
              <Facebook className="h-6 w-6" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold hover:text-gold/90 transition-colors"
            >
              <Instagram className="h-6 w-6" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold hover:text-gold/90 transition-colors"
            >
              <Youtube className="h-6 w-6" />
            </a>
          </div>

          {/* Contact Buttons */}
          <div className="flex gap-6">
            {/* Enquiry Button */}
            <button
              onClick={onRegisterClick}
              className="flex flex-col items-center gap-1 text-gold hover:text-gold/90 transition-colors"
            >
              <FileText className="h-6 w-6" />
              <span className="text-xs font-medium">سجل اهتمامك</span>
            </button>

            {/* Call Button */}
            <button
              onClick={handleCall}
              className="flex flex-col items-center gap-1 text-gold hover:text-gold/90 transition-colors"
            >
              <Phone className="h-6 w-6" />
              <span className="text-xs font-medium">اتصل بنا</span>
            </button>

            {/* WhatsApp Button */}
            <button
              onClick={handleWhatsApp}
              className="flex flex-col items-center gap-1 text-gold hover:text-gold/90 transition-colors"
            >
              <MessageSquare className="h-6 w-6" />
              <span className="text-xs font-medium">واتساب</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingFloatingContact;