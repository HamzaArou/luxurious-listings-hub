import { useEffect, useRef } from 'react';
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
  const mapInstance = useRef<maplibregl.Map | null>(null);

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

  useEffect(() => {
    if (!mapContainer.current || mapInstance.current) return;

    const map = new maplibregl.Map({
      container: mapContainer.current,
      style: `https://api.maptiler.com/maps/streets/style.json?key=0xThwp5hzLtXF2Nvi1LZ`,
      center: [39.8256, 21.4225],
      zoom: 12,
    });

    map.addControl(new maplibregl.NavigationControl(), 'top-right');

    // Add markers only after map is loaded
    map.on('load', () => {
      projects.forEach(project => {
        if (project.lat && project.lng) {
          try {
            const popup = new maplibregl.Popup({ offset: 25 }).setHTML(
              `<div dir="rtl" class="p-2">
                <h3 class="font-bold text-lg mb-1">${project.name}</h3>
                <p class="text-sm text-gray-600">${project.location}</p>
              </div>`
            );

            new maplibregl.Marker()
              .setLngLat([project.lng, project.lat])
              .setPopup(popup)
              .addTo(map);
          } catch (error) {
            console.error('Error adding marker:', error);
          }
        }
      });
    });

    mapInstance.current = map;

    // Cleanup
    return () => {
      map.remove();
      mapInstance.current = null;
    };
  }, [projects]); // Add projects as dependency to update markers when data changes

  return (
    <div className="h-[600px] w-full rounded-2xl overflow-hidden">
      <div ref={mapContainer} className="w-full h-full" />
    </div>
  );
};

export default ProjectsMap;