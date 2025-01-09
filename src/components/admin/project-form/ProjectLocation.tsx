import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { ProjectFormValues } from "@/types/project";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

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

function MapUpdater({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lng], map.getZoom());
  }, [lat, lng, map]);
  return null;
}

export default function ProjectLocation({ form, isLoading }: ProjectLocationProps) {
  // Default to Riyadh coordinates if no position is set
  const [position, setPosition] = useState<[number, number]>([
    form.getValues("lat") || 24.7136,
    form.getValues("lng") || 46.6753
  ]);

  const handleMarkerDrag = (e: L.LeafletEvent) => {
    const marker = e.target;
    const position = marker.getLatLng();
    setPosition([position.lat, position.lng]);
    form.setValue("lat", position.lat);
    form.setValue("lng", position.lng);
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
              <Input {...field} disabled={isLoading} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="h-[400px] rounded-lg overflow-hidden relative border border-gray-200">
        <MapContainer
          center={position}
          zoom={13}
          style={{ height: "100%", width: "100%" }}
          key={`${position[0]}-${position[1]}`}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker
            position={position}
            draggable={!isLoading}
            eventHandlers={{
              dragend: handleMarkerDrag,
            }}
          />
          <MapUpdater lat={position[0]} lng={position[1]} />
        </MapContainer>
      </div>

      <div className="grid grid-cols-2 gap-4">
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
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    field.onChange(value);
                    setPosition([value, position[1]]);
                  }}
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
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
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    field.onChange(value);
                    setPosition([position[0], value]);
                  }}
                  disabled={isLoading}
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