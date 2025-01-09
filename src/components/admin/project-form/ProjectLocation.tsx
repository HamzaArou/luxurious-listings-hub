import { useEffect } from "react";
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { ProjectFormValues } from "@/types/project";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix for default marker icon
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface ProjectLocationProps {
  form: UseFormReturn<ProjectFormValues>;
  isLoading: boolean;
}

function LocationMarker({ form }: { form: UseFormReturn<ProjectFormValues> }) {
  const map = useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      form.setValue("lat", lat);
      form.setValue("lng", lng);
    },
  });

  const position: L.LatLngExpression = [
    form.watch("lat") || 24.7136,
    form.watch("lng") || 46.6753,
  ];

  return <Marker position={position} />;
}

export default function ProjectLocation({ form, isLoading }: ProjectLocationProps) {
  const defaultPosition: L.LatLngExpression = [24.7136, 46.6753];

  useEffect(() => {
    if (!form.watch("lat") && !form.watch("lng")) {
      form.setValue("lat", defaultPosition[0]);
      form.setValue("lng", defaultPosition[1]);
    }
  }, [form]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="lat"
          render={({ field }) => (
            <FormItem>
              <FormLabel>خط العرض</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="any"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  disabled={isLoading}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="lng"
          render={({ field }) => (
            <FormItem>
              <FormLabel>خط الطول</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="any"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  disabled={isLoading}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </div>

      <div className="h-[400px] border rounded-lg overflow-hidden">
        <MapContainer
          center={defaultPosition}
          zoom={13}
          style={{ height: "100%", width: "100%" }}
          key={`${form.watch("lat")}-${form.watch("lng")}`}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LocationMarker form={form} />
        </MapContainer>
      </div>
    </div>
  );
}