import { Mail, Phone, MapPin } from "lucide-react";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface ContactUsProps {
  projectId?: string;
  projectName?: string;
  location?: string;
  lat?: number;
  lng?: number;
}

const ContactUs = ({ projectId, projectName, location, lat = 24.7136, lng = 46.6752 }: ContactUsProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: '',
  });

  useEffect(() => {
    // Initialize Google Maps
    const initMap = () => {
      const map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
        center: { lat, lng },
        zoom: 15,
      });

      new google.maps.Marker({
        position: { lat, lng },
        map,
        title: location,
      });
    };

    // Load Google Maps script if not already loaded
    if (!window.google) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_MAPS_API_KEY}`;
      script.async = true;
      script.defer = true;
      script.onload = initMap;
      document.head.appendChild(script);
    } else {
      initMap();
    }
  }, [lat, lng, location]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('interest_forms')
        .insert([
          {
            project_id: projectId,
            full_name: formData.name,
            phone: formData.phone,
            email: 'not_provided@example.com', // Required field in the database
          }
        ]);

      if (error) throw error;

      toast({
        title: "تم إرسال الطلب بنجاح",
        description: "سنتواصل معك قريباً",
      });

      setFormData({ name: '', phone: '', message: '' });
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "حدث خطأ",
        description: "الرجاء المحاولة مرة أخرى",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-12 bg-offWhite">
      <div className="container mx-auto px-4 max-w-[960px]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-3xl font-bold text-darkBlue mb-8 text-center">سجل اهتمامك</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  الاسم
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gold"
                  required
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  الجوال
                </label>
                <PhoneInput
                  country={'sa'}
                  value={formData.phone}
                  onChange={(phone) => setFormData(prev => ({ ...prev, phone }))}
                  inputClass="!w-full !px-4 !py-2 !rounded-lg !border !border-gray-300 focus:!outline-none focus:!ring-2 focus:!ring-gold"
                  containerClass="!w-full"
                  buttonClass="!border !border-gray-300 !rounded-lg"
                  dropdownClass="!bg-white"
                  enableSearch={false}
                  disableSearchIcon
                />
              </div>

              <div>
                <label htmlFor="project" className="block text-sm font-medium text-gray-700 mb-1">
                  المشروع
                </label>
                <input
                  type="text"
                  id="project"
                  value={projectName}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-gray-50"
                  disabled
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  الطلب
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  rows={4}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gold"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={cn(
                  "w-full py-3 bg-gold text-white font-bold rounded-lg",
                  "hover:bg-opacity-90 transition-colors",
                  "disabled:opacity-50 disabled:cursor-not-allowed"
                )}
              >
                {isSubmitting ? "جاري الإرسال..." : "Send"}
              </button>
            </form>
          </div>

          {/* Map */}
          <div className="h-[500px] rounded-lg overflow-hidden shadow-md">
            <div id="map" className="w-full h-full"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;