import { Button } from "@/components/ui/button";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { ProjectFormValues } from "@/types/project";
import { Plus, Trash2 } from "lucide-react";

interface ProjectUnitsProps {
  form: UseFormReturn<ProjectFormValues>;
  isLoading: boolean;
  onAddUnit: () => void;
  onRemoveUnit: (index: number) => void;
}

export default function ProjectUnits({ form, isLoading, onAddUnit, onRemoveUnit }: ProjectUnitsProps) {
  const units = form.watch("project_units") || [];

  return (
    <div className="space-y-6">
      {units.map((_, index) => (
        <div key={index} className="p-4 border rounded-lg space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="text-lg font-medium">الوحدة {index + 1}</h4>
            <Button
              type="button"
              variant="destructive"
              size="icon"
              onClick={() => onRemoveUnit(index)}
              disabled={isLoading}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name={`project_units.${index}.unit_number`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>رقم الوحدة</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={`project_units.${index}.status`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>حالة الوحدة</FormLabel>
                  <Select
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر حالة الوحدة" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="متاح">متاح</SelectItem>
                      <SelectItem value="محجوز">محجوز</SelectItem>
                      <SelectItem value="مباع">مباع</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={`project_units.${index}.unit_type`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>نوع الوحدة</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isLoading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={`project_units.${index}.area`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>المساحة</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={`project_units.${index}.floor_number`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>رقم الطابق</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={`project_units.${index}.side`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>الجهة</FormLabel>
                  <Select
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر الجهة" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="شمال">شمال</SelectItem>
                      <SelectItem value="جنوب">جنوب</SelectItem>
                      <SelectItem value="شرق">شرق</SelectItem>
                      <SelectItem value="غرب">غرب</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={`project_units.${index}.rooms`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>عدد الغرف</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={`project_units.${index}.bathrooms`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>عدد دورات المياه</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      ))}

      <Button
        type="button"
        variant="outline"
        onClick={onAddUnit}
        disabled={isLoading}
        className="w-full"
      >
        <Plus className="h-4 w-4 mr-2" />
        إضافة وحدة جديدة
      </Button>
    </div>
  );
}