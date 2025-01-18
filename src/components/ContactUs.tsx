import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import ProjectsMap from "./ProjectsMap";

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export default function ContactUs() {
  const { toast } = useToast();
  const { register, handleSubmit, reset } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      toast({
        title: "Success",
        description: "Your message has been sent successfully!",
      });
      reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">تواصل معنا</h2>
          <p className="text-gray-600">نحن هنا للإجابة على استفساراتك</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <Input
                  {...register("name")}
                  placeholder="الاسم"
                  className="w-full"
                />
              </div>
              <div>
                <Input
                  {...register("email")}
                  type="email"
                  placeholder="البريد الإلكتروني"
                  className="w-full"
                />
              </div>
              <div>
                <Textarea
                  {...register("message")}
                  placeholder="رسالتك"
                  className="w-full h-32"
                />
              </div>
              <Button type="submit" className="w-full">
                إرسال
              </Button>
            </form>
          </div>

          <div className="h-[400px] md:h-auto">
            <ProjectsMap />
          </div>
        </div>
      </div>
    </section>
  );
}