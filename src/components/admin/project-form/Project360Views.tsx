import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UseFormReturn } from "react-hook-form";
import { ProjectFormValues } from "@/types/project";
import { Plus, Trash2 } from "lucide-react";

interface Project360ViewsProps {
  form: UseFormReturn<ProjectFormValues>;
  isLoading: boolean;
}

export default function Project360Views({ form, isLoading }: Project360ViewsProps) {
  const views = form.watch("views360") || [];

  const addView = () => {
    const currentViews = form.getValues("views360") || [];
    form.setValue("views360", [
      ...currentViews,
      { id: crypto.randomUUID(), title: "", url: "" }
    ]);
  };

  const removeView = (index: number) => {
    const currentViews = form.getValues("views360") || [];
    form.setValue(
      "views360",
      currentViews.filter((_, i) => i !== index)
    );
  };

  return (
    <div className="space-y-6">
      {views.map((_, index) => (
        <div key={index} className="p-4 border rounded-lg space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="text-lg font-medium">جولة {index + 1}</h4>
            <Button
              type="button"
              variant="destructive"
              size="icon"
              onClick={() => removeView(index)}
              disabled={isLoading}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name={`views360.${index}.title`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>عنوان الجولة</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isLoading} placeholder="أدخل عنوان الجولة" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={`views360.${index}.url`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>رابط الجولة</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isLoading} placeholder="أدخل رابط الجولة" />
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
        onClick={addView}
        disabled={isLoading}
        className="w-full"
      >
        <Plus className="h-4 w-4 mr-2" />
        إضافة جولة جديدة
      </Button>
    </div>
  );
}