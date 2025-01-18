import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from "@/integrations/supabase/client";
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

const ProjectsMap = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [Map, setMap] = useState<any>(null);

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
    if (typeof window !== 'undefined') {
      Promise.all([
        import('react-leaflet').then(module => ({
          MapContainer: module.MapContainer,
          TileLayer: module.TileLayer,
          Marker: module.Marker,
          Popup: module.Popup
        }))
      ]).then(([{ MapContainer, TileLayer, Marker, Popup }]) => {
        setMap({ MapContainer, TileLayer, Marker, Popup });
        setIsMounted(true);
      });
    }
  }, []);

  if (!isMounted || !Map) {
    return <div className="h-[600px] w-full bg-gray-100" />;
  }

  const { MapContainer, TileLayer, Marker, Popup } = Map;

  return (
    <div className="h-[600px] w-full">
      <MapContainer 
        center={center} 
        zoom={12} 
        className="h-full w-full rounded-lg"
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