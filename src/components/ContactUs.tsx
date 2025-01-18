import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import ProjectsMap from "./ProjectsMap";

interface ContactUsProps {
  projectId?: string;
  projectName?: string;
}

const ContactUs = ({ projectId, projectName }: ContactUsProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const { error } = await supabase.from('interest_forms').insert([
        { 
          ...formData,
          project_id: projectId 
        }
      ]);

      if (error) throw error;

      toast({
        title: "تم إرسال رسالتك بنجاح",
        description: "سنتواصل معك قريباً",
      });

      setFormData({
        fullName: "",
        phone: "",
        email: "",
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        variant: "destructive",
        title: "حدث خطأ",
        description: "الرجاء المحاولة مرة أخرى",
      });
    }
  };

  return (
    <section id="contact" className="py-16 bg-[#f5f5f5]">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-white inline-block bg-deepBlue py-2 px-8 rounded-tr-[5px] rounded-tl-[100px] rounded-br-[100px] rounded-bl-[5px]">
            تواصل معنا
          </h2>
          {projectName && (
            <p className="mt-4 text-xl text-gray-600">
              للاستفسار عن {projectName}
            </p>
          )}
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Input
                    placeholder="الاسم الكامل"
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <Input
                    type="tel"
                    placeholder="رقم الجوال"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <Input
                    type="email"
                    placeholder="البريد الإلكتروني"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-gold hover:bg-gold/90 text-white"
                >
                  إرسال
                </Button>
              </form>
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <ProjectsMap />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;