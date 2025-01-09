import { z } from "zod";

export const projectUnitSchema = z.object({
  unit_number: z.number().min(1, "رقم الوحدة مطلوب"),
  status: z.enum(["للبيع", "قريباً", "مكتمل"]),
  unit_type: z.string().min(1, "نوع الوحدة مطلوب"),
  area: z.number().min(1, "المساحة مطلوبة"),
  floor_number: z.number().min(0, "رقم الطابق مطلوب"),
  side: z.string().min(1, "الجهة مطلوبة"),
  rooms: z.number().min(1, "عدد الغرف مطلوب"),
  bathrooms: z.number().min(1, "عدد دورات المياه مطلوب"),
});

export const projectFormSchema = z.object({
  name: z.string().min(1, "اسم المشروع مطلوب"),
  location: z.string().min(1, "الموقع مطلوب"),
  address: z.string().min(1, "العنوان مطلوب"),
  lat: z.number().optional(),
  lng: z.number().optional(),
  floors: z.number().min(1, "عدد الطوابق يجب أن يكون أكبر من 0"),
  status: z.enum(["للبيع", "قريباً", "مكتمل"]),
  project_units: z.array(projectUnitSchema),
  gallery_type: z.enum(["images", "coming_soon"]),
  gallery_images: z.array(z.any()).optional(),
  plans: z.array(z.string()).optional(),
});

export type ProjectFormValues = z.infer<typeof projectFormSchema>;

export interface ProjectFormProps {
  initialData?: ProjectFormValues & { id?: string };
}

export interface ProjectUnit {
  id: string;
  name: string;
  area: number;
  bedrooms?: number;
  bathrooms?: number;
  details?: Record<string, any>;
}

export interface Project {
  id: string;
  name: string;
  image: string;
  details: string;
  status: "للبيع" | "قريباً" | "مكتمل";
  location: string;
  floors: number;
  apartments: number;
  annexes: number;
  projectLabel: string;
}