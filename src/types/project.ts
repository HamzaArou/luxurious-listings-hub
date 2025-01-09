import { z } from "zod";
import { Json } from "@/integrations/supabase/types";

export const projectFormSchema = z.object({
  name: z.string().min(1, "اسم المشروع مطلوب"),
  location: z.string().min(1, "الموقع مطلوب"),
  floors: z.coerce.number().min(1, "عدد الطوابق يجب أن يكون أكبر من 0"),
  units: z.coerce.number().min(1, "عدد الوحدات يجب أن يكون أكبر من 0"),
  status: z.enum(["للبيع", "قريباً", "مكتمل"]),
  thumbnail_url: z.string().optional(),
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
  details?: Json;
  project_id?: string;
  created_at?: string;
  updated_at?: string;
}