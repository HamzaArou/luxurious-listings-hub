import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { UseFormReturn } from "react-hook-form";
import { ProjectFormValues } from "@/types/project";
import { Label } from "@/components/ui/label";

interface ProjectGalleryProps {
  form: UseFormReturn<ProjectFormValues>;
  isLoading: boolean;
  onGalleryImagesChange: (files: FileList | null) => void;
  initialImages?: { id: string; image_url: string }[];
}

export default function ProjectGallery({
  form,
  isLoading,
  onGalleryImagesChange,
  initialImages,
}: ProjectGalleryProps) {
  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="gallery_type"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>صور المشروع</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex flex-col space-y-1"
                disabled={isLoading}
              >
                <div className="flex items-center space-x-2 space-x-reverse">
                  <RadioGroupItem value="images" id="images" />
                  <Label htmlFor="images">إضافة صور</Label>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <RadioGroupItem value="coming_soon" id="coming_soon" />
                  <Label htmlFor="coming_soon">قريباً</Label>
                </div>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {form.watch("gallery_type") === "images" && (
        <div className="space-y-4">
          {initialImages?.map((image, index) => (
            <div key={image.id} className="flex items-center gap-2">
              <img
                src={image.image_url}
                alt={`Gallery image ${index + 1}`}
                className="w-20 h-20 object-cover rounded-md"
              />
            </div>
          ))}
          <FormField
            control={form.control}
            name="gallery_images"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => {
                      field.onChange(e.target.files);
                      onGalleryImagesChange(e.target.files);
                    }}
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      )}
    </div>
  );
}