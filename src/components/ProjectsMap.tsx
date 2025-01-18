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
      console.log('Fetched projects:', data);
      return data as Project[];
    },
  });

  useEffect(() => {
    if (!mapContainer.current || mapInstance.current) return;

    const map = new maplibregl.Map({
      container: mapContainer.current,
      style: `https://api.maptiler.com/maps/streets/style.json?key=0xThwp5hzLtXF2Nvi1LZ`,
      center: [39.8256, 21.4225], // Makkah coordinates
      zoom: 11,
    });

    map.addControl(new maplibregl.NavigationControl(), 'top-right');

    map.on('load', () => {
      console.log('Map loaded, adding markers for projects:', projects);
      
      // Create bounds to fit all markers
      const bounds = new maplibregl.LngLatBounds();
      
      projects.forEach(project => {
        if (project.lat && project.lng) {
          try {
            // Add marker
            const marker = new maplibregl.Marker({
              color: '#FF0000',
            })
              .setLngLat([project.lng, project.lat])
              .addTo(map);

            // Add popup
            const popup = new maplibregl.Popup({ offset: 25 })
              .setHTML(`
                <div dir="rtl" class="p-2">
                  <h3 class="font-bold text-lg mb-1">${project.name}</h3>
                  <p class="text-sm text-gray-600">${project.location}</p>
                </div>
              `);

            marker.setPopup(popup);

            // Extend bounds to include this point
            bounds.extend([project.lng, project.lat]);
            
            console.log(`Added marker for project: ${project.name} at:`, { lat: project.lat, lng: project.lng });
          } catch (error) {
            console.error('Error adding marker for project:', project, error);
          }
        }
      });

      // Fit map to show all markers with padding
      if (!bounds.isEmpty()) {
        map.fitBounds(bounds, {
          padding: 50,
          maxZoom: 13
        });
      }
    });

    mapInstance.current = map;

    return () => {
      map.remove();
      mapInstance.current = null;
    };
  }, [projects]);

  return (
    <div className="h-[600px] w-full rounded-2xl overflow-hidden">
      <div ref={mapContainer} className="w-full h-full" />
    </div>
  );
};

export default ProjectsMap;