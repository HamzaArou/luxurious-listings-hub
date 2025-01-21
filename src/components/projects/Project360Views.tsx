import { UseFormReturn } from "react-hook-form";
import { ProjectFormValues } from "@/types/project";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Trash } from "lucide-react";

interface Project360ViewsProps {
  form: UseFormReturn<ProjectFormValues>;
  isLoading: boolean;
}

export default function Project360Views({ form, isLoading }: Project360ViewsProps) {
  const views360 = form.watch("views360") || [];

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
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">جولات افتراضية 360°</h3>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={addView}
          disabled={isLoading}
        >
          <Plus className="h-4 w-4 ml-2" />
          إضافة جولة
        </Button>
      </div>

      {views360.map((_, index) => (
        <div key={index} className="space-y-4 p-4 border rounded-lg relative">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute top-2 left-2"
            onClick={() => removeView(index)}
            disabled={isLoading}
          >
            <Trash className="h-4 w-4" />
          </Button>

          <FormField
            control={form.control}
            name={`views360.${index}.title`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>عنوان الجولة</FormLabel>
                <FormControl>
                  <Input {...field} disabled={isLoading} />
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
                  <Input {...field} disabled={isLoading} dir="ltr" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      ))}
    </div>
  );
}