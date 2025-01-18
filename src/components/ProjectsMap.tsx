import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icon
const defaultIcon = new Icon({
  iconUrl: '/marker-icon.png',
  shadowUrl: '/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const ProjectsMap = () => {
  const { data: projects = [] } = useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .not('lat', 'is', null)
        .not('lng', 'is', null);
      
      if (error) throw error;
      return data || [];
    },
  });

  // Center of Makkah
  const center: [number, number] = [21.3891, 39.8579];

  useEffect(() => {
    // Add marker images to public directory if they don't exist
    const markerIcon = document.createElement('link');
    markerIcon.rel = 'preload';
    markerIcon.as = 'image';
    markerIcon.href = '/marker-icon.png';
    document.head.appendChild(markerIcon);

    const markerShadow = document.createElement('link');
    markerShadow.rel = 'preload';
    markerShadow.as = 'image';
    markerShadow.href = '/marker-shadow.png';
    document.head.appendChild(markerShadow);

    return () => {
      document.head.removeChild(markerIcon);
      document.head.removeChild(markerShadow);
    };
  }, []);

  return (
    <MapContainer
      center={center}
      zoom={12}
      style={{ height: '600px', width: '100%', borderRadius: '0.5rem' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {projects.map((project) => (
        project.lat && project.lng ? (
          <Marker
            key={project.id}
            position={[project.lat, project.lng]}
            icon={defaultIcon}
          >
            <Popup>
              <div className="text-center">
                <h3 className="font-bold">{project.name}</h3>
                <p>{project.location}</p>
              </div>
            </Popup>
          </Marker>
        ) : null
      ))}
    </MapContainer>
  );
};

export default ProjectsMap;