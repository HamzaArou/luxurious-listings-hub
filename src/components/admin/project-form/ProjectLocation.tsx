import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UseFormReturn } from "react-hook-form";
import { ProjectFormValues } from "@/types/project";
import { useState, useEffect, useRef } from "react";
import { MapPin } from "lucide-react";
import Script from "@/components/ui/script";

interface ProjectLocationProps {
  form: UseFormReturn<ProjectFormValues>;
  isLoading: boolean;
}

export default function ProjectLocation({ form, isLoading }: ProjectLocationProps) {
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  useEffect(() => {
    if (scriptLoaded && inputRef.current) {
      autocompleteRef.current = new google.maps.places.Autocomplete(inputRef.current, {
        componentRestrictions: { country: "sa" },
        types: ["address"],
      });

      autocompleteRef.current.addListener("place_changed", () => {
        const place = autocompleteRef.current?.getPlace();
        if (place && place.formatted_address) {
          form.setValue("address", place.formatted_address);
          if (place.geometry?.location) {
            form.setValue("lat", place.geometry.location.lat());
            form.setValue("lng", place.geometry.location.lng());
          }
          handleAddressChange(place.formatted_address);
        }
      });
    }
  }, [scriptLoaded, form]);

  const handleAddressChange = (address: string) => {
    form.setValue("address", address);
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      address + ", Saudi Arabia"
    )}`;
    setPreviewUrl(googleMapsUrl);
  };

  return (
    <div className="space-y-4">
      <Script
        src="https://maps.googleapis.com/maps/api/js?libraries=places"
        onLoad={() => setScriptLoaded(true)}
      />

      <FormField
        control={form.control}
        name="address"
        render={({ field }) => (
          <FormItem>
            <FormLabel>عنوان المشروع</FormLabel>
            <FormControl>
              <Input
                {...field}
                ref={inputRef}
                disabled={isLoading}
                onChange={(e) => {
                  field.onChange(e);
                  handleAddressChange(e.target.value);
                }}
                placeholder="أدخل عنوان المشروع (مثال: حي النرجس، الرياض)"
                className="text-right"
                dir="rtl"
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