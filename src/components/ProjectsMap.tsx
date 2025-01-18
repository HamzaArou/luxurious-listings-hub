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

// Hardcoded locations that should always appear on the map
const FIXED_LOCATIONS = [
  { lat: 21.3175, lng: 39.2091, name: 'مشروع الفيصل الأول', location: 'مكة المكرمة' },
  { lat: 21.4421, lng: 39.8283, name: 'مشروع الفيصل الثاني', location: 'مكة المكرمة' },
  { lat: 21.2854, lng: 39.2375, name: 'مشروع الفيصل الثالث', location: 'مكة المكرمة' },
  { lat: 21.5322, lng: 39.1769, name: 'مشروع الفيصل الرابع', location: 'مكة المكرمة' },
  { lat: 21.5765, lng: 39.1584, name: 'مشروع الفيصل الخامس', location: 'مكة المكرمة' },
  { lat: 21.4887, lng: 39.2833, name: 'مشروع الفيصل السادس', location: 'مكة المكرمة' },
  { lat: 21.4038, lng: 39.8285, name: 'مشروع الفيصل السابع', location: 'مكة المكرمة' },
  { lat: 21.3586, lng: 39.2572, name: 'مشروع الفيصل الثامن', location: 'مكة المكرمة' },
  { lat: 21.3257, lng: 39.6816, name: 'مشروع الفيصل التاسع', location: 'مكة المكرمة' },
  { lat: 21.3289, lng: 39.6997, name: 'مشروع الفيصل العاشر', location: 'مكة المكرمة' },
  { lat: 21.4561, lng: 39.7506, name: 'مشروع الفيصل الحادي عشر', location: 'مكة المكرمة' },
  { lat: 21.4533, lng: 39.7111, name: 'مشروع الفيصل الثاني عشر', location: 'مكة المكرمة' },
  { lat: 21.2987, lng: 39.1692, name: 'مشروع الفيصل الثالث عشر', location: 'مكة المكرمة' },
  { lat: 21.3809, lng: 39.1345, name: 'مشروع الفيصل الرابع عشر', location: 'مكة المكرمة' },
  { lat: 21.4416, lng: 39.7903, name: 'مشروع الفيصل الخامس عشر', location: 'مكة المكرمة' },
];

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
      console.log('Map loaded, adding markers for all locations');
      
      // Create bounds to fit all markers
      const bounds = new maplibregl.LngLatBounds();
      
      // Add markers for database projects
      projects.forEach(project => {
        if (project.lat && project.lng) {
          addMarker(map, project, bounds);
        }
      });

      // Add markers for fixed locations
      FIXED_LOCATIONS.forEach(location => {
        addMarker(map, location, bounds);
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

  // Helper function to add a marker to the map
  const addMarker = (map: maplibregl.Map, location: any, bounds: maplibregl.LngLatBounds) => {
    try {
      const marker = new maplibregl.Marker({
        color: '#FF0000',
      })
        .setLngLat([location.lng, location.lat])
        .addTo(map);

      const popup = new maplibregl.Popup({ offset: 25 })
        .setHTML(`
          <div dir="rtl" class="p-2">
            <h3 class="font-bold text-lg mb-1">${location.name}</h3>
            <p class="text-sm text-gray-600">المنطقة: ${location.location}</p>
            <p class="text-xs text-gray-500">الإحداثيات: ${location.lat}, ${location.lng}</p>
          </div>
        `);

      marker.setPopup(popup);
      bounds.extend([location.lng, location.lat]);
      
      console.log(`Added marker for location:`, location);
    } catch (error) {
      console.error('Error adding marker:', error);
    }
  };

  return (
    <div className="h-[600px] w-full rounded-2xl overflow-hidden">
      <div ref={mapContainer} className="w-full h-full" />
    </div>
  );
};

export default ProjectsMap;