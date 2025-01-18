import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Link } from 'react-router-dom';

// Fix for default marker icons in Leaflet with React
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
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

  // Center the map on Makkah
  const center: [number, number] = [21.3891, 39.8579];

  return (
    <div className="h-[600px] w-full rounded-2xl overflow-hidden shadow-lg">
      <MapContainer
        center={center}
        zoom={12}
        style={{ height: '100%', width: '100%' }}
        className="z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {projects.map((project) => (
          <Marker
            key={project.id}
            position={[Number(project.lat), Number(project.lng)]}
          >
            <Popup>
              <div className="p-2">
                <h3 className="font-bold text-lg mb-2">{project.name}</h3>
                <p className="text-sm mb-2">{project.location}</p>
                <Link 
                  to={`/project/${project.id}`}
                  className="text-gold hover:underline"
                >
                  عرض التفاصيل
                </Link>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default ProjectsMap;