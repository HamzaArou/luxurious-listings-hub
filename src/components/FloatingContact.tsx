import { Phone, MessageSquare } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const FloatingContact = () => {
  const phoneNumber = "+966505148231";

  const handleCall = () => {
    window.location.href = `tel:${phoneNumber}`;
  };

  const handleWhatsApp = () => {
    window.location.href = `https://wa.me/${phoneNumber}`;
  };

  return (
    <div className="fixed bottom-8 left-8 z-50">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            size="icon"
            className="h-14 w-14 rounded-full bg-gold hover:bg-gold/90 shadow-gold"
          >
            <Phone className="h-6 w-6 text-white" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-[200px]">
          <DropdownMenuItem onClick={handleCall} className="gap-2 cursor-pointer">
            <Phone className="h-4 w-4" />
            <span>اتصل بنا</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={handleWhatsApp}
            className="gap-2 cursor-pointer"
          >
            <MessageSquare className="h-4 w-4 text-[#25D366]" />
            <span>واتساب</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default FloatingContact;