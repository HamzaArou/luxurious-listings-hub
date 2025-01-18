import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from "@/integrations/supabase/client";
import dynamic from 'vite-plugin-dynamic-import';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';

// Fix for default marker icon
const defaultIcon = new Icon({
  iconUrl: '/marker-icon.png',
  shadowUrl: '/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Center of Makkah
const center: [number, number] = [21.3891, 39.8579];

// Dynamically import the map components
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer));
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer));
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker));
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup));

const ProjectsMap = () => {
  const [isClient, setIsClient] = useState(false);

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

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <div className="h-[600px] w-full bg-gray-100" />;
  }

  return (
    <div className="h-[600px] w-full">
      <MapContainer 
        center={center} 
        zoom={12} 
        className="h-full w-full rounded-lg"
        key="map-container"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {projects.map((project) => 
          project.lat && project.lng ? (
            <Marker
              key={project.id}
              position={[Number(project.lat), Number(project.lng)]}
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
        )}
      </MapContainer>
    </div>
  );
};

export default ProjectsMap;