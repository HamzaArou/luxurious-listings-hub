import { useState } from "react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const ContactUs = ({ projectId, projectName }: { projectId?: string, projectName?: string }) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
  });

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
            email: formData.message,
          }
        ]);

      if (error) throw error;

      toast({
        title: "تم إرسال الطلب بنجاح",
        description: "سنقوم بالتواصل معك قريباً",
      });

      setFormData({
        name: "",
        phone: "",
        message: "",
      });
    } catch (error) {
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
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-newsGreen mb-8 text-center">
              سجل اهتمامك
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <input
                  type="text"
                  placeholder="الاسم - Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={cn(
                    "w-full px-4 py-3 rounded-lg bg-offWhite border-0",
                    "placeholder:text-gray-400 focus:ring-2 focus:ring-gold",
                    "transition duration-200 text-right"
                  )}
                  required
                />
              </div>
              
              <div>
                <PhoneInput
                  country={'sa'}
                  value={formData.phone}
                  onChange={(phone) => setFormData({ ...formData, phone })}
                  inputClass="!w-full !px-4 !py-3 !rounded-lg !bg-offWhite !border-0 !text-right"
                  containerClass="!w-full"
                  buttonClass="!bg-offWhite !border-0 !rounded-lg"
                  dropdownClass="!bg-white"
                  enableSearch={false}
                  disableSearchIcon
                  inputProps={{
                    required: true,
                    placeholder: "الجوال - Mobile"
                  }}
                />
              </div>

              <div>
                <select
                  value={projectId || ""}
                  className={cn(
                    "w-full px-4 py-3 rounded-lg bg-offWhite border-0",
                    "text-gray-600 focus:ring-2 focus:ring-gold",
                    "transition duration-200 text-right"
                  )}
                  disabled={!!projectId}
                >
                  <option value="">{projectName || "المشروع - Project"}</option>
                </select>
              </div>

              <div>
                <textarea
                  placeholder="الطلب - Looking for"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className={cn(
                    "w-full px-4 py-3 rounded-lg bg-offWhite border-0",
                    "placeholder:text-gray-400 focus:ring-2 focus:ring-gold",
                    "transition duration-200 text-right min-h-[120px] resize-none"
                  )}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={cn(
                  "w-full py-3 px-6 rounded-lg",
                  "bg-gold text-white font-semibold",
                  "hover:bg-gold/90 transition duration-200",
                  "disabled:opacity-50 disabled:cursor-not-allowed"
                )}
              >
                {isSubmitting ? "جاري الإرسال..." : "Send - إرسال"}
              </button>
            </form>
          </div>

          {/* Map Section */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden h-[600px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3710.3071156427584!2d39.1728231!3d21.5922997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15c3db6c1f4b0043%3A0x10e77978803d4c82!2sAs%20Salamah%2C%20Jeddah%20Saudi%20Arabia!5e0!3m2!1sen!2sus!4v1647789012345!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;