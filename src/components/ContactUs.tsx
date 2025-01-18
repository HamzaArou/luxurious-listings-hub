import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const ContactUs = ({ projectId, projectName }: { projectId?: string, projectName?: string }) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
    selectedProject: projectId || "",
  });

  const { data: projects = [] } = useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*');
      if (error) throw error;
      return data || [];
    },
  });

  // Update selected project when projectId prop changes
  useEffect(() => {
    if (projectId) {
      setFormData(prev => ({
        ...prev,
        selectedProject: projectId
      }));
    }
  }, [projectId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.phone) {
      toast({
        title: "خطأ",
        description: "يرجى إدخال رقم الجوال",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          service_id: 'service_vsb08u9',
          template_id: 'template_31x8lw5',
          user_id: 'DJX_dy28zAjctAAIj',
          template_params: {
            to_email: 'pr@wtd.com.sa',
            from_name: formData.name,
            phone_number: formData.phone,
            project: projectName || (formData.selectedProject ? projects.find(p => p.id === formData.selectedProject)?.name : ''),
            message: formData.message || 'No message provided',
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`EmailJS error: ${response.status} ${await response.text()}`);
      }

      toast({
        title: "تم إرسال الطلب بنجاح",
        description: "سنقوم بالتواصل معك قريباً",
      });

      setFormData({
        name: "",
        phone: "",
        message: "",
        selectedProject: projectId || "",
      });
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
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-darkBlue mb-8 text-center">
              {projectId ? "سجل اهتمامك بهذا المشروع" : "سجل اهتمامك"}
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
              
              <div className="phone-input-container">
                <PhoneInput
                  country={'sa'}
                  value={formData.phone}
                  onChange={(phone) => setFormData({ ...formData, phone })}
                  inputClass="!w-full !px-4 !py-3 !rounded-lg !bg-offWhite !border-0 !text-right"
                  containerClass="!w-full !dir-ltr"
                  buttonClass="!bg-offWhite !border-0 !rounded-lg !left-0 !right-auto"
                  dropdownClass="!bg-white !left-0 !right-auto"
                  enableSearch={false}
                  disableSearchIcon
                  inputProps={{
                    required: true,
                    placeholder: "الجوال - Mobile*",
                  }}
                />
              </div>

              {!projectId && (
                <div>
                  <select
                    value={formData.selectedProject}
                    onChange={(e) => setFormData({ ...formData, selectedProject: e.target.value })}
                    className={cn(
                      "w-full px-4 py-3 rounded-lg bg-offWhite border-0",
                      "text-gray-600 focus:ring-2 focus:ring-gold",
                      "transition duration-200 text-right"
                    )}
                  >
                    <option value="">اختر المشروع - Select Project</option>
                    {projects.map((project) => (
                      <option key={project.id} value={project.id}>
                        {project.name} - {project.location}
                      </option>
                    ))}
                  </select>
                </div>
              )}

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
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden h-[600px] relative">
            {!isMapLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-offWhite">
                <div className="text-darkBlue text-lg">جاري تحميل الخريطة...</div>
              </div>
            )}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d119183.79087230945!2d39.7421!3d21.3891!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15c21b4ced818775%3A0x98ab2469cf70c9ce!2sMakkah%20Saudi%20Arabia!5e0!3m2!1sar!2ssa!4v1647789012345!5m2!1sar!2ssa&z=11&t=m&language=ar&region=SA"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="موقعنا في مكة المكرمة"
              className="w-full h-full"
              onLoad={() => setIsMapLoaded(true)}
            />
          </div>
        </div>
      </div>

      <style>{`
        .phone-input-container .react-tel-input .form-control {
          text-align: right;
          padding-left: 48px !important;
          padding-right: 16px !important;
          direction: ltr;
        }
        .phone-input-container .react-tel-input .flag-dropdown {
          border: none !important;
          background: transparent !important;
          left: 0 !important;
          right: auto !important;
        }
        .phone-input-container .react-tel-input .selected-flag {
          background: transparent !important;
          padding-left: 8px !important;
        }
        .phone-input-container .react-tel-input .country-list {
          left: 0 !important;
          right: auto !important;
        }
      `}</style>
    </section>
  );
};

export default ContactUs;
