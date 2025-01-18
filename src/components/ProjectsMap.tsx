import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import { useQuery } from '@tanstack/react-query';
import { supabase } from "@/integrations/supabase/client";
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
    // Preload marker images
    const preloadImage = (url: string) => {
      const img = new Image();
      img.src = url;
    };

    preloadImage('/marker-icon.png');
    preloadImage('/marker-shadow.png');
  }, []);

  // Only render map on client side
  if (typeof window === 'undefined') {
    return <div className="h-[600px] w-full bg-gray-100" />;
  }

  const Map = () => (
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
  );

  return (
    <div className="h-[600px] w-full">
      <Map />
    </div>
  );
};

export default ProjectsMap;