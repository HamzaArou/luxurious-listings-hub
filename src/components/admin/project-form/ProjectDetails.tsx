import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { UseFormReturn } from "react-hook-form";
import { ProjectFormValues } from "@/types/project";
import { Plus, X } from "lucide-react";

interface ProjectDetailsProps {
  form: UseFormReturn<ProjectFormValues>;
  isLoading: boolean;
}

export default function ProjectDetails({ form, isLoading }: ProjectDetailsProps) {
  const addFeature = () => {
    const currentFeatures = form.getValues("features") || [];
    form.setValue("features", [...currentFeatures, ""]);
  };

  const removeFeature = (index: number) => {
    const currentFeatures = form.getValues("features") || [];
    form.setValue(
      "features",
      currentFeatures.filter((_, i) => i !== index)
    );
  };

  const addSpecification = () => {
    const currentSpecs = form.getValues("specifications") || [];
    form.setValue("specifications", [...currentSpecs, ""]);
  };

  const removeSpecification = (index: number) => {
    const currentSpecs = form.getValues("specifications") || [];
    form.setValue(
      "specifications",
      currentSpecs.filter((_, i) => i !== index)
    );
  };

  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>وصف المشروع</FormLabel>
            <FormControl>
              <Textarea 
                {...field} 
                disabled={isLoading} 
                placeholder="أدخل وصف المشروع"
                className="min-h-[150px]"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="space-y-4">
        <h3 className="text-lg font-medium">مميزات المشروع</h3>
        {form.watch("features")?.map((_, index) => (
          <div key={index} className="flex gap-2">
            <FormField
              control={form.control}
              name={`features.${index}`}
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input {...field} disabled={isLoading} placeholder="أدخل ميزة المشروع" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="button"
              variant="destructive"
              size="icon"
              onClick={() => removeFeature(index)}
              disabled={isLoading}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          onClick={addFeature}
          disabled={isLoading}
          className="w-full"
        >
          <Plus className="h-4 w-4 mr-2" />
          إضافة ميزة
        </Button>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">مواصفات المشروع</h3>
        {form.watch("specifications")?.map((_, index) => (
          <div key={index} className="flex gap-2">
            <FormField
              control={form.control}
              name={`specifications.${index}`}
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input {...field} disabled={isLoading} placeholder="أدخل مواصفات المشروع" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="button"
              variant="destructive"
              size="icon"
              onClick={() => removeSpecification(index)}
              disabled={isLoading}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          onClick={addSpecification}
          disabled={isLoading}
          className="w-full"
        >
          <Plus className="h-4 w-4 mr-2" />
          إضافة مواصفات
        </Button>
      </div>
    </div>
  );
}