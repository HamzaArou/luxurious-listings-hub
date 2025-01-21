import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { UseFormReturn } from "react-hook-form";
import { ProjectFormValues } from "@/types/project";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

interface ProjectGalleryProps {
  form: UseFormReturn<ProjectFormValues>;
  isLoading: boolean;
  onGalleryImagesChange: (files: FileList | null) => void;
  initialImages?: { id: string; media_url: string }[];
}

export default function ProjectGallery({
  form,
  isLoading,
  onGalleryImagesChange,
  initialImages,
}: ProjectGalleryProps) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  useEffect(() => {
    setPreviewUrls([]);
    const formFiles = form.getValues("gallery_images");
    if (formFiles) {
      const filesArray = Array.from(formFiles) as File[];
      setSelectedFiles(filesArray);
      
      filesArray.forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewUrls(prev => [...prev, reader.result as string]);
        };
        reader.readAsDataURL(file);
      });
    }
  }, [form]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const filesArray = Array.from(files) as File[];
      const newFiles = [...selectedFiles, ...filesArray];
      setSelectedFiles(newFiles);
      
      filesArray.forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewUrls(prev => [...prev, reader.result as string]);
        };
        reader.readAsDataURL(file);
      });

      const dataTransfer = new DataTransfer();
      newFiles.forEach(file => dataTransfer.items.add(file));
      onGalleryImagesChange(dataTransfer.files);
      form.setValue("gallery_images", dataTransfer.files);
    }
  };

  const removeImage = (index: number) => {
    setSelectedFiles(prev => {
      const newFiles = [...prev];
      newFiles.splice(index, 1);
      
      const dataTransfer = new DataTransfer();
      newFiles.forEach(file => dataTransfer.items.add(file));
      onGalleryImagesChange(dataTransfer.files);
      form.setValue("gallery_images", dataTransfer.files);
      
      return newFiles;
    });

    setPreviewUrls(prev => {
      const newUrls = [...prev];
      newUrls.splice(index, 1);
      return newUrls;
    });
  };

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
          {initialImages && initialImages.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {initialImages.map((image) => (
                <div key={image.id} className="relative group">
                  <img
                    src={image.media_url}
                    alt="Gallery image"
                    className="w-full h-32 object-cover rounded-md"
                  />
                </div>
              ))}
            </div>
          )}

          {previewUrls.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {previewUrls.map((url, index) => (
                <div key={index} className="relative group">
                  <img
                    src={url}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-32 object-cover rounded-md"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => removeImage(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}

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
                    onChange={handleFileChange}
                    disabled={isLoading}
                    className="cursor-pointer"
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