import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Upload, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const projectFormSchema = z.object({
  name: z.string().min(1, "اسم المشروع مطلوب"),
  location: z.string().min(1, "الموقع مطلوب"),
  floors: z.string().transform(Number).pipe(
    z.number().min(1, "عدد الطوابق يجب أن يكون أكبر من 0")
  ),
  units: z.string().transform(Number).pipe(
    z.number().min(1, "عدد الوحدات يجب أن يكون أكبر من 0")
  ),
  status: z.enum(["للبيع", "قريباً", "مكتمل"]),
});

type ProjectFormValues = z.infer<typeof projectFormSchema>;

interface ProjectFormProps {
  initialData?: ProjectFormValues & { id?: string };
}

export default function ProjectForm({ initialData }: ProjectFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: initialData || {
      name: "",
      location: "",
      floors: "",
      units: "",
      status: "قريباً",
    },
  });

  const onSubmit = async (data: ProjectFormValues) => {
    try {
      setIsLoading(true);

      let thumbnailUrl = initialData?.thumbnail_url;

      if (thumbnail) {
        const fileExt = thumbnail.name.split(".").pop();
        const fileName = `${crypto.randomUUID()}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from("project-images")
          .upload(fileName, thumbnail);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from("project-images")
          .getPublicUrl(fileName);

        thumbnailUrl = publicUrl;
      }

      if (!thumbnailUrl) {
        throw new Error("صورة المشروع مطلوبة");
      }

      const projectData = {
        name: data.name,
        location: data.location,
        floors: data.floors,
        units: data.units,
        status: data.status,
        thumbnail_url: thumbnailUrl,
      };

      if (initialData?.id) {
        const { error } = await supabase
          .from("projects")
          .update(projectData)
          .eq("id", initialData.id);

        if (error) throw error;

        toast({
          title: "تم التحديث",
          description: "تم تحديث المشروع بنجاح",
        });
      } else {
        const { error } = await supabase
          .from("projects")
          .insert([projectData]);

        if (error) throw error;

        toast({
          title: "تم الإنشاء",
          description: "تم إنشاء المشروع بنجاح",
        });
      }

      navigate("/admin");
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء حفظ المشروع",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>اسم المشروع</FormLabel>
              <FormControl>
                <Input {...field} disabled={isLoading} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>الموقع</FormLabel>
              <FormControl>
                <Input {...field} disabled={isLoading} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="floors"
            render={({ field }) => (
              <FormItem>
                <FormLabel>عدد الطوابق</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min="1"
                    {...field}
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="units"
            render={({ field }) => (
              <FormItem>
                <FormLabel>عدد الوحدات</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min="1"
                    {...field}
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>حالة المشروع</FormLabel>
              <Select
                disabled={isLoading}
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر حالة المشروع" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="للبيع">للبيع</SelectItem>
                  <SelectItem value="قريباً">قريباً</SelectItem>
                  <SelectItem value="مكتمل">مكتمل</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-4">
          <FormLabel>صورة المشروع</FormLabel>
          <div className="flex items-center gap-4">
            {initialData?.thumbnail_url && (
              <img
                src={initialData.thumbnail_url}
                alt="Project thumbnail"
                className="w-20 h-20 object-cover rounded-md"
              />
            )}
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => setThumbnail(e.target.files?.[0] || null)}
              disabled={isLoading}
            />
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/admin")}
            disabled={isLoading}
          >
            إلغاء
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              "جاري الحفظ..."
            ) : (
              <>
                <Save className="ml-2 h-4 w-4" />
                {initialData ? "تحديث المشروع" : "إنشاء المشروع"}
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}