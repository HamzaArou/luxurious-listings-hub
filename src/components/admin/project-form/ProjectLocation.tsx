import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UseFormReturn } from "react-hook-form";
import { ProjectFormValues } from "@/types/project";
import { useState } from "react";
import { MapPin } from "lucide-react";

interface ProjectLocationProps {
  form: UseFormReturn<ProjectFormValues>;
  isLoading: boolean;
}

export default function ProjectLocation({ form, isLoading }: ProjectLocationProps) {
  const [previewUrl, setPreviewUrl] = useState<string>("");

  const handleAddressChange = (address: string) => {
    form.setValue("address", address);
    // Generate Google Maps search URL
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address + ", Saudi Arabia")}`;
    setPreviewUrl(googleMapsUrl);
  };

  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="address"
        render={({ field }) => (
          <FormItem>
            <FormLabel>عنوان المشروع</FormLabel>
            <FormControl>
              <Input 
                {...field} 
                disabled={isLoading}
                onChange={(e) => {
                  field.onChange(e);
                  handleAddressChange(e.target.value);
                }}
                placeholder="أدخل عنوان المشروع (مثال: حي النرجس، الرياض)"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {previewUrl && (
        <div className="mt-4">
          <a 
            href={previewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary hover:underline"
          >
            <MapPin className="h-4 w-4" />
            عرض الموقع على خريطة جوجل
          </a>
        </div>
      )}
    </div>
  );
}