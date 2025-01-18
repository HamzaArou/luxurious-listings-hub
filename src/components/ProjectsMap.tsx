import { useEffect, useRef, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface Project {
  id: string;
  name: string;
  location: string;
  lat?: number;
  lng?: number;
}

const ProjectsMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<maplibregl.Map | null>(null);
  const markers = useRef<maplibregl.Marker[]>([]);

  const { data: projects = [] } = useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('id, name, location, lat, lng');
      if (error) throw error;
      return data as Project[];
    },
  });

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || map) return;

    const initializeMap = new maplibregl.Map({
      container: mapContainer.current,
      style: `https://api.maptiler.com/maps/streets/style.json?key=0xThwp5hzLtXF2Nvi1LZ`,
      center: [39.8256, 21.4225], // Makkah coordinates
      zoom: 12,
    });

    initializeMap.addControl(new maplibregl.NavigationControl(), 'top-right');

    initializeMap.on('load', () => {
      setMap(initializeMap);
    });

    return () => {
      initializeMap.remove();
    };
  }, []);

  // Handle markers
  useEffect(() => {
    if (!map || !projects.length) return;

    // Clear existing markers
    markers.current.forEach(marker => marker.remove());
    markers.current = [];

    // Add new markers
    projects.forEach(project => {
      if (project.lat && project.lng) {
        try {
          const popup = new maplibregl.Popup({ offset: 25 }).setHTML(
            `<div dir="rtl" class="p-2">
              <h3 class="font-bold text-lg mb-1">${project.name}</h3>
              <p class="text-sm text-gray-600">${project.location}</p>
            </div>`
          );

          const marker = new maplibregl.Marker()
            .setLngLat([project.lng, project.lat])
            .setPopup(popup)
            .addTo(map);

          markers.current.push(marker);
        } catch (error) {
          console.error('Error adding marker:', error);
        }
      }
    });

    return () => {
      markers.current.forEach(marker => marker.remove());
      markers.current = [];
    };
  }, [map, projects]);

  return (
    <div className="h-[600px] w-full rounded-2xl overflow-hidden">
      <div ref={mapContainer} className="w-full h-full" />
    </div>
  );
};

export default ProjectsMap;