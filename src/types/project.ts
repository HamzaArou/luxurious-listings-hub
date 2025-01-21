import { z } from "zod";

export const view360Schema = z.object({
  title: z.string().min(1, "عنوان الجولة مطلوب"),
  url: z.string().url("الرجاء إدخال رابط صحيح")
});

export const projectFormSchema = z.object({
  name: z.string().min(1, "اسم المشروع مطلوب"),
  location: z.string().min(1, "الموقع مطلوب"),
  address: z.string().optional(),
  lat: z.number().optional(),
  lng: z.number().optional(),
  floors: z.number().min(1, "عدد الطوابق يجب أن يكون أكبر من 0"),
  units: z.number().min(1, "عدد الشقق يجب أن يكون أكبر من 0"),
  status: z.enum(["بدأ البيع", "تم البيع بالكامل", "قريباً"] as const),
  thumbnail_url: z.string().optional(),
  description: z.string().optional(),
  features: z.array(z.string()).optional(),
  specifications: z.array(z.string()).optional(),
  project_units: z.array(z.object({
    id: z.string(),
    unit_number: z.number().min(1, "رقم الوحدة مطلوب"),
    name: z.string().min(1, "اسم الوحدة مطلوب"),
    status: z.string().min(1, "حالة الوحدة مطلوبة"),
    unit_type: z.string().min(1, "نوع الوحدة مطلوب"),
    area: z.number().min(1, "المساحة مطلوبة"),
    floor_number: z.number().min(0, "رقم الطابق مطلوب"),
    side: z.string().min(1, "الجهة مطلوبة"),
    rooms: z.number().min(1, "عدد الغرف مطلوب"),
    bathrooms: z.number().min(1, "عدد دورات المياه مطلوب"),
  })),
  gallery_type: z.enum(["images", "coming_soon"]),
  views360: z.array(view360Schema).optional(),
});

export type ProjectFormValues = z.infer<typeof projectFormSchema>;

export interface ProjectFormProps {
  initialData?: ProjectFormValues & {
    id?: string;
    gallery_images?: { id: string; image_url: string }[];
  };
}

export type TabType = "basic" | "gallery" | "location" | "360views" | "units";