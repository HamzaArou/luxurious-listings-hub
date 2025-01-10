import { z } from "zod";
import { Database } from "@/integrations/supabase/types";

// Database project status type
export type DbProjectStatus = Database["public"]["Enums"]["project_status"];

// Project unit schema for form validation
export const projectUnitSchema = z.object({
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
});

// Project form schema
export const projectFormSchema = z.object({
  name: z.string().min(1, "اسم المشروع مطلوب"),
  location: z.string().min(1, "الموقع مطلوب"),
  address: z.string().optional(),
  lat: z.number().optional(),
  lng: z.number().optional(),
  floors: z.number().min(1, "عدد الطوابق يجب أن يكون أكبر من 0"),
  units: z.number().min(1, "عدد الشقق يجب أن يكون أكبر من 0"),
  status: z.enum(["بدأ البيع", "تم البيع بالكامل", "قريباً"] as const),
  thumbnail_url: z.string().min(1, "صورة المشروع مطلوبة"),
  project_units: z.array(projectUnitSchema),
  gallery_type: z.enum(["images", "coming_soon"]),
  gallery_images: z.any().optional(),
  plans: z.any().optional(),
});

export type ProjectFormValues = z.infer<typeof projectFormSchema>;

// Project unit interface
export interface ProjectUnit {
  id: string;
  name: string;
  unit_number: number;
  status: string;
  unit_type: string;
  area: number;
  floor_number: number;
  side: string;
  rooms: number;
  bathrooms: number;
  details?: Record<string, any>;
}

// Project interface
export interface Project {
  id: string;
  name: string;
  location: string;
  floors: number;
  units: number;
  status: DbProjectStatus;
  thumbnail_url: string;
  created_at: string;
  updated_at: string;
  address?: string;
  lat?: number;
  lng?: number;
  // Display properties
  displayStatus?: string;
  displayUnits?: string;
}

export interface ProjectFormProps {
  initialData?: ProjectFormValues & {
    id?: string;
    gallery_images?: { id: string; image_url: string }[];
    plans?: string[];
  };
}

// Helper function to convert database status to display status
export const convertProjectStatus = (status: DbProjectStatus): string => {
  switch (status) {
    case "بدأ البيع":
      return "متاح";
    case "تم البيع بالكامل":
      return "مباع";
    case "قريباً":
      return "قريباً";
    default:
      return "متاح";
  }
};

// Helper function to convert display status to database status
export const convertToDbStatus = (status: string): DbProjectStatus => {
  switch (status) {
    case "متاح":
      return "بدأ البيع";
    case "مباع":
      return "تم البيع بالكامل";
    case "قريباً":
      return "قريباً";
    default:
      return "قريباً";
  }
};