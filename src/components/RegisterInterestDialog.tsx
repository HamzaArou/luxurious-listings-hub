import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

interface RegisterInterestDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const RegisterInterestDialog = ({ open, onOpenChange }: RegisterInterestDialogProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    preferredContact: "phone",
    acceptNews: false,
    acceptPrivacy: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name) {
      toast({
        title: "خطأ",
        description: "يرجى إدخال الاسم الكامل",
        variant: "destructive",
      });
      return;
    }

    if (!formData.phone) {
      toast({
        title: "خطأ",
        description: "يرجى إدخال رقم الجوال",
        variant: "destructive",
      });
      return;
    }

    if (!formData.acceptPrivacy) {
      toast({
        title: "خطأ",
        description: "يرجى الموافقة على سياسة الخصوصية",
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
            message: `تسجيل اهتمام جديد
البريد الإلكتروني: ${formData.email}
طريقة التواصل المفضلة: ${formData.preferredContact === 'phone' ? 'الهاتف' : 'البريد الإلكتروني'}
يرغب في تلقي الأخبار والعروض: ${formData.acceptNews ? 'نعم' : 'لا'}`,
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

      onOpenChange(false);
      setFormData({
        name: "",
        phone: "",
        email: "",
        preferredContact: "phone",
        acceptNews: false,
        acceptPrivacy: false,
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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center mb-4">
            سجل اهتمامك
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="الاسم الكامل *"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 rounded-lg bg-gray-100 border-0 text-right"
              required
            />
          </div>
          
          <div className="phone-input-container">
            <PhoneInput
              country={'sa'}
              value={formData.phone}
              onChange={(phone) => setFormData({ ...formData, phone })}
              inputClass="!w-full !px-4 !py-3 !rounded-lg !bg-gray-100 !border-0 !text-right"
              containerClass="!w-full !dir-ltr"
              buttonClass="!bg-gray-100 !border-0 !rounded-lg !left-0 !right-auto"
              dropdownClass="!bg-white !left-0 !right-auto"
              enableSearch={false}
              disableSearchIcon
              inputProps={{
                required: true,
                placeholder: "رقم الجوال *",
              }}
            />
          </div>

          <div>
            <input
              type="email"
              placeholder="البريد الإلكتروني"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 rounded-lg bg-gray-100 border-0 text-right"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">طريقة التواصل المفضلة *</label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="preferredContact"
                  value="phone"
                  checked={formData.preferredContact === "phone"}
                  onChange={(e) => setFormData({ ...formData, preferredContact: e.target.value })}
                />
                <span>الهاتف</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="preferredContact"
                  value="email"
                  checked={formData.preferredContact === "email"}
                  onChange={(e) => setFormData({ ...formData, preferredContact: e.target.value })}
                />
                <span>البريد الإلكتروني</span>
              </label>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="acceptNews"
              checked={formData.acceptNews}
              onChange={(e) => setFormData({ ...formData, acceptNews: e.target.checked })}
              className="rounded border-gray-300"
            />
            <label htmlFor="acceptNews" className="text-sm">
              أود تلقي الأخبار والعروض
            </label>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="acceptPrivacy"
              checked={formData.acceptPrivacy}
              onChange={(e) => setFormData({ ...formData, acceptPrivacy: e.target.checked })}
              className="rounded border-gray-300"
              required
            />
            <label htmlFor="acceptPrivacy" className="text-sm">
              لقد قرأت وأوافق على <a href="/privacy-policy" className="text-gold hover:underline">سياسة الخصوصية</a> *
            </label>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 px-6 rounded-lg bg-gold text-white font-semibold hover:bg-gold/90 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "جاري الإرسال..." : "إرسال"}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RegisterInterestDialog;