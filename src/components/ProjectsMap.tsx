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
  { lat: 21.328682, lng: 39.682289, name: 'مشروع الفيصل الأول', location: 'مكة المكرمة' },
  { lat: 21.335788, lng: 39.695381, name: 'مشروع الفيصل الثاني', location: 'مكة المكرمة' },
  { lat: 21.335814, lng: 39.684551, name: 'مشروع الفيصل الثالث', location: 'مكة المكرمة' },
  { lat: 21.373072, lng: 39.797595, name: 'مشروع الفيصل الرابع', location: 'مكة المكرمة' },
  { lat: 21.332211, lng: 39.681780, name: 'مشروع الفيصل الخامس', location: 'مكة المكرمة' },
  { lat: 21.317950, lng: 39.686954, name: 'مشروع الفيصل السادس', location: 'مكة المكرمة' },
  { lat: 21.335327, lng: 39.688751, name: 'مشروع الفيصل السابع', location: 'مكة المكرمة' },
  { lat: 21.325750, lng: 39.681556, name: 'مشروع الفيصل الثامن', location: 'مكة المكرمة' },
  { lat: 21.325742, lng: 39.681553, name: 'مشروع الفيصل التاسع', location: 'مكة المكرمة' },
  { lat: 21.328977, lng: 39.699720, name: 'مشروع الفيصل العاشر', location: 'مكة المكرمة' },
  { lat: 21.328972, lng: 39.699722, name: 'مشروع الفيصل الحادي عشر', location: 'مكة المكرمة' },
  { lat: 21.346907, lng: 39.767688, name: 'مشروع الفيصل الثاني عشر', location: 'مكة المكرمة' },
  { lat: 21.379658, lng: 39.765661, name: 'مشروع الفيصل الثالث عشر', location: 'مكة المكرمة' },
  { lat: 21.328056, lng: 39.674820, name: 'مشروع الفيصل الرابع عشر', location: 'مكة المكرمة' },
  { lat: 21.330151, lng: 39.696473, name: 'مشروع الفيصل الخامس عشر', location: 'مكة المكرمة' },
  { lat: 21.335788, lng: 39.695381, name: 'مشروع الفيصل السادس عشر', location: 'مكة المكرمة' },
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
      style: `https://api.maptiler.com/maps/basic-v2/style.json?key=0xThwp5hzLtXF2Nvi1LZ`,
      center: [39.8256, 21.4225], // Makkah coordinates
      zoom: 11,
      transformRequest: (url, resourceType) => {
        if (resourceType === 'Style' && url.includes('maptiler')) {
          return {
            url: url + '&language=ar'
          };
        }
      }
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

      // Create a popup element with proper RTL support
      const popupContent = document.createElement('div');
      popupContent.className = 'rtl-popup';
      popupContent.innerHTML = `
        <div style="direction: rtl; text-align: right; font-family: 'IBM Plex Sans Arabic', sans-serif;">
          <h3 style="font-weight: bold; font-size: 1rem; margin-bottom: 0.25rem; color: #1a1a1a;">${location.name}</h3>
          <p style="font-size: 0.875rem; color: #4a5568;">المنطقة: ${location.location}</p>
          <p style="font-size: 0.75rem; color: #718096;">الإحداثيات: ${location.lat}, ${location.lng}</p>
        </div>
      `;

      const popup = new maplibregl.Popup({ 
        offset: 25,
        closeButton: true,
        closeOnClick: true,
        maxWidth: '300px'
      })
      .setDOMContent(popupContent);

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
      <style>{`
        .rtl-popup .maplibregl-popup-content {
          direction: rtl;
          text-align: right;
          font-family: 'IBM Plex Sans Arabic', sans-serif;
        }
      `}</style>
    </div>
  );
};

export default ProjectsMap;