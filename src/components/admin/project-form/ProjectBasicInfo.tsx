import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { ProjectFormValues } from "@/types/project";
import ProjectImageUpload from "@/components/admin/ProjectImageUpload";

interface ProjectBasicInfoProps {
  form: UseFormReturn<ProjectFormValues>;
  isLoading: boolean;
  onThumbnailChange: (file: File | null) => void;
  initialThumbnailUrl?: string;
  thumbnailError?: boolean;
}

export default function ProjectBasicInfo({ 
  form, 
  isLoading,
  onThumbnailChange,
  initialThumbnailUrl,
  thumbnailError
}: ProjectBasicInfoProps) {
  return (
    <div className="space-y-4">
      <div className="text-center mb-4">
        <p className="text-gold text-lg">مشروع</p>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input 
                  {...field} 
                  disabled={isLoading} 
                  placeholder="أدخل اسم المشروع" 
                  className="text-3xl font-bold text-center text-gold"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <ProjectImageUpload
        initialThumbnailUrl={initialThumbnailUrl}
        isLoading={isLoading}
        onFileChange={onThumbnailChange}
        error={thumbnailError}
        className="mb-6"
      />

      <FormField
        control={form.control}
        name="location"
        render={({ field }) => (
          <FormItem>
            <FormLabel>الموقع</FormLabel>
            <FormControl>
              <Input {...field} disabled={isLoading} placeholder="أدخل موقع المشروع" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FormField
          control={form.control}
          name="floors"
          render={({ field }) => (
            <FormItem>
              <FormLabel>عدد الأدوار</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min="1"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  disabled={isLoading}
                  placeholder="عدد الأدوار"
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
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  disabled={isLoading}
                  placeholder="عدد الوحدات"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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
                  <SelectItem value="بدأ البيع">بدأ البيع</SelectItem>
                  <SelectItem value="تم البيع بالكامل">تم البيع بالكامل</SelectItem>
                  <SelectItem value="قريباً">قريباً</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>السعر الأساسي</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  disabled={isLoading}
                  placeholder="السعر الأساسي"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="price_single_street"
          render={({ field }) => (
            <FormItem>
              <FormLabel>سعر الشارع الواحد</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  disabled={isLoading}
                  placeholder="سعر الشارع الواحد"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="price_roof"
          render={({ field }) => (
            <FormItem>
              <FormLabel>سعر السطح</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  disabled={isLoading}
                  placeholder="سعر السطح"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}