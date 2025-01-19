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
  const markersRef = useRef<maplibregl.Marker[]>([]);
  const popupsRef = useRef<maplibregl.Popup[]>([]);

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
      style: 'https://api.maptiler.com/maps/arabic/style.json?key=0xThwp5hzLtXF2Nvi1LZ',
      center: [39.8256, 21.4225],
      zoom: 11,
      maxZoom: 18,
      minZoom: 8,
    });

    const navigationControl = new maplibregl.NavigationControl({
      showCompass: true,
      showZoom: true,
      visualizePitch: true
    });

    map.on('load', () => {
      console.log('Map loaded, adding markers for all locations');
      
      const bounds = new maplibregl.LngLatBounds();
      
      projects.forEach(project => {
        if (project.lat && project.lng) {
          addMarker(map, project, bounds);
        }
      });

      FIXED_LOCATIONS.forEach(location => {
        addMarker(map, location, bounds);
      });

      if (!bounds.isEmpty()) {
        map.fitBounds(bounds, {
          padding: 50,
          maxZoom: 13
        });
      }
    });

    map.addControl(navigationControl, 'top-right');
    mapInstance.current = map;

    return () => {
      markersRef.current.forEach(marker => marker.remove());
      popupsRef.current.forEach(popup => popup.remove());
      markersRef.current = [];
      popupsRef.current = [];
      map.remove();
      mapInstance.current = null;
    };
  }, [projects]);

  const addMarker = (map: maplibregl.Map, location: any, bounds: maplibregl.LngLatBounds) => {
    try {
      const markerElement = document.createElement('div');
      markerElement.className = 'custom-marker';
      markerElement.style.width = '30px';
      markerElement.style.height = '30px';
      markerElement.style.backgroundImage = 'url("data:image/svg+xml,%3Csvg width=\'30\' height=\'30\' viewBox=\'0 0 24 24\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath fill=\'%23FF0000\' d=\'M12 0C7.31 0 3.5 3.81 3.5 8.5C3.5 14.88 12 24 12 24S20.5 14.88 20.5 8.5C20.5 3.81 16.69 0 12 0ZM12 13C9.79 13 8 11.21 8 9C8 6.79 9.79 5 12 5C14.21 5 16 6.79 16 9C16 11.21 14.21 13 12 13Z\'/%3E%3C/svg%3E")';
      markerElement.style.backgroundSize = 'cover';
      markerElement.style.cursor = 'pointer';

      const popup = new maplibregl.Popup({ 
        offset: 25,
        closeButton: true,
        closeOnClick: true,
        maxWidth: '300px',
        className: 'custom-popup'
      })
        .setHTML(`
          <div dir="rtl" class="p-3 font-arabic">
            <h3 class="font-bold text-lg mb-2" style="font-family: 'IBM Plex Sans Arabic', sans-serif;">${location.name}</h3>
            <p class="text-sm text-gray-600" style="font-family: 'IBM Plex Sans Arabic', sans-serif;">المنطقة: ${location.location}</p>
            <p class="text-xs text-gray-500 mt-2" style="font-family: 'IBM Plex Sans Arabic', sans-serif;">الإحداثيات: ${location.lat}, ${location.lng}</p>
          </div>
        `);

      const marker = new maplibregl.Marker(markerElement)
        .setLngLat([location.lng, location.lat])
        .setPopup(popup)
        .addTo(map);

      markersRef.current.push(marker);
      popupsRef.current.push(popup);
      bounds.extend([location.lng, location.lat]);
      
      console.log(`Added marker for location:`, location);
    } catch (error) {
      console.error('Error adding marker:', error);
    }
  };

  return (
    <div className="h-[600px] w-full rounded-2xl overflow-hidden">
      <div ref={mapContainer} className="w-full h-full" />
      <style dangerouslySetInnerHTML={{
        __html: `
          .maplibregl-popup-content {
            font-family: 'IBM Plex Sans Arabic', sans-serif;
            direction: rtl;
            text-align: right;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          }
          .custom-marker {
            cursor: pointer;
            transition: transform 0.2s;
          }
          .custom-marker:hover {
            transform: scale(1.2);
          }
        `
      }} />
    </div>
  );
};

export default ProjectsMap;