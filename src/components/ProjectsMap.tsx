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
      console.log('Fetching projects...');
      const { data, error } = await supabase
        .from('projects')
        .select('id, name, location, lat, lng');
      if (error) {
        console.error('Error fetching projects:', error);
        throw error;
      }
      console.log('Fetched projects:', data);
      return data as Project[];
    },
  });

  useEffect(() => {
    if (!mapContainer.current || mapInstance.current) return;

    console.log('Initializing map...');
    const map = new maplibregl.Map({
      container: mapContainer.current,
      style: `https://api.maptiler.com/maps/streets/style.json?key=0xThwp5hzLtXF2Nvi1LZ&language=ar`,
      center: [39.8256, 21.4225], // Makkah coordinates
      zoom: 11,
    });

    map.addControl(new maplibregl.NavigationControl(), 'top-right');

    // Add markers only after map is loaded
    map.on('load', () => {
      console.log('Map loaded, adding markers for projects:', projects);
      projects.forEach(project => {
        // Convert coordinates to numbers if they're strings
        const lat = typeof project.lat === 'string' ? parseFloat(project.lat) : project.lat;
        const lng = typeof project.lng === 'string' ? parseFloat(project.lng) : project.lng;

        if (lat && lng && !isNaN(lat) && !isNaN(lng)) {
          try {
            const popup = new maplibregl.Popup({ offset: 25 }).setHTML(
              `<div dir="rtl" class="p-2">
                <h3 class="font-bold text-lg mb-1">${project.name}</h3>
                <p class="text-sm text-gray-600">${project.location}</p>
                <p class="text-xs text-gray-500 mt-1">الإحداثيات: ${lat}, ${lng}</p>
              </div>`
            );

            new maplibregl.Marker()
              .setLngLat([lng, lat])
              .setPopup(popup)
              .addTo(map);

            console.log(`Added marker for project: ${project.name} at coordinates:`, { lat, lng });
          } catch (error) {
            console.error('Error adding marker for project:', project, error);
          }
        } else {
          console.warn('Project missing or invalid coordinates:', {
            project,
            parsedLat: lat,
            parsedLng: lng
          });
        }
      });

      // Fit map to show all markers
      const bounds = new maplibregl.LngLatBounds();
      projects.forEach(project => {
        if (project.lat && project.lng) {
          bounds.extend([project.lng, project.lat]);
        }
      });
      
      if (!bounds.isEmpty()) {
        map.fitBounds(bounds, {
          padding: 50,
          maxZoom: 15
        });
      }
    });

    mapInstance.current = map;

    return () => {
      map.remove();
      mapInstance.current = null;
    };
  }, [projects]); // Add projects as dependency

  return (
    <div className="h-[600px] w-full rounded-2xl overflow-hidden">
      <div ref={mapContainer} className="w-full h-full" />
    </div>
  );
};

export default ProjectsMap;