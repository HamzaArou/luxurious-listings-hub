import { useQuery } from '@tanstack/react-query';
import { supabase } from "@/integrations/supabase/client";
import Map, { Marker, Popup, NavigationControl } from 'react-map-gl';
import { useState } from 'react';
import 'maplibre-gl/dist/maplibre-gl.css';

interface Project {
  id: string;
  name: string;
  location: string;
  lat: number;
  lng: number;
}

const ProjectsMap = () => {
  const [popupInfo, setPopupInfo] = useState<Project | null>(null);

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

  return (
    <div className="h-[600px] w-full">
      <Map
        initialViewState={{
          longitude: 39.7125, // Centered on Makkah
          latitude: 21.3891,
          zoom: 12
        }}
        style={{ width: '100%', height: '100%' }}
        mapStyle={`https://api.maptiler.com/maps/basic-v2/style.json?key=0xThwp5hzLtXF2Nvi1LZ`}
      >
        <NavigationControl position="top-right" />
        
        {projects.map((project) => (
          <Marker
            key={project.id}
            longitude={project.lng}
            latitude={project.lat}
            anchor="bottom"
            onClick={e => {
              e.originalEvent.stopPropagation();
              setPopupInfo(project);
            }}
          >
            <div className="cursor-pointer text-2xl">📍</div>
          </Marker>
        ))}

        {popupInfo && (
          <Popup
            anchor="top"
            longitude={popupInfo.lng}
            latitude={popupInfo.lat}
            onClose={() => setPopupInfo(null)}
          >
            <div className="p-2">
              <h3 className="font-bold text-lg">{popupInfo.name}</h3>
              <p className="text-sm text-gray-600">{popupInfo.location}</p>
            </div>
          </Popup>
        )}
      </Map>
    </div>
  );
};

export default ProjectsMap;