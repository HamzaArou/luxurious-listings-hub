import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { ProjectFormValues } from "@/types/project";
import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface ProjectLocationProps {
  form: UseFormReturn<ProjectFormValues>;
  isLoading: boolean;
}

export default function ProjectLocation({ form, isLoading }: ProjectLocationProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapError, setMapError] = useState<string | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    try {
      const token = import.meta.env.VITE_MAPBOX_TOKEN;
      
      if (!token) {
        setMapError("Mapbox token is not configured");
        return;
      }

      mapboxgl.accessToken = token;

      const initialLat = form.getValues("lat") || 24.7136;
      const initialLng = form.getValues("lng") || 46.6753;

      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/light-v11",
        center: [initialLng, initialLat],
        zoom: 12,
      });

      const marker = new mapboxgl.Marker({
        draggable: !isLoading,
      })
        .setLngLat([initialLng, initialLat])
        .addTo(map.current);

      marker.on("dragend", () => {
        const lngLat = marker.getLngLat();
        form.setValue("lat", lngLat.lat);
        form.setValue("lng", lngLat.lng);
      });

      map.current.addControl(new mapboxgl.NavigationControl(), "top-right");

      // Handle map load errors
      map.current.on('error', () => {
        setMapError("Error loading map");
      });

    } catch (error) {
      console.error("Map initialization error:", error);
      setMapError("Error initializing map");
    }

    return () => {
      map.current?.remove();
    };
  }, [form, isLoading]);

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

      <div className="h-[400px] rounded-lg overflow-hidden relative">
        {mapError ? (
          <Alert variant="destructive" className="absolute inset-0 m-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {mapError}
            </AlertDescription>
          </Alert>
        ) : (
          <div ref={mapContainer} className="w-full h-full" />
        )}
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
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}