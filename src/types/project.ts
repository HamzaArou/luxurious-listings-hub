import { z } from "zod";

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