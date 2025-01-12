import { MapPin } from 'lucide-react';
import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface ProjectLocationProps {
  location: string;
  lat?: number;
  lng?: number;
}

export default function ProjectLocation({ location, lat, lng }: ProjectLocationProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const marker = useRef<mapboxgl.Marker | null>(null);
  
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location + ", Saudi Arabia")}`;

  useEffect(() => {
    if (!mapContainer.current || !lat || !lng) return;

    mapboxgl.accessToken = 'pk.eyJ1IjoibG92YWJsZSIsImEiOiJjbHNkOWh2NmswMDdqMmpxbzB4NXY2ZHlsIn0.LwqMKPcbRXrF0bZQy8sctw';
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [lng, lat],
      zoom: 15,
    });

    marker.current = new mapboxgl.Marker()
      .setLngLat([lng, lat])
      .addTo(map.current);

    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    return () => {
      map.current?.remove();
    };
  }, [lat, lng]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">الموقع</h3>
        <a
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-primary hover:underline"
        >
          <MapPin className="h-4 w-4" />
          فتح في خريطة جوجل
        </a>
      </div>
      <p className="text-gray-600 mb-4">{location}</p>
      {lat && lng ? (
        <div ref={mapContainer} className="w-full h-[400px] rounded-lg overflow-hidden shadow-lg" />
      ) : (
        <p className="text-gray-500 italic">موقع الخريطة غير متوفر</p>
      )}
    </div>
  );
}