import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from "@/integrations/supabase/client";
import dynamic from 'react-dynamic-import';
import 'leaflet/dist/leaflet.css';

// Dynamically import the Map component
const MapComponent = dynamic(() => import('./MapComponent'));

const ProjectsMap = () => {
  const [isMounted, setIsMounted] = useState(false);

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
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div className="h-[600px] w-full bg-gray-100" />;
  }

  return (
    <div className="h-[600px] w-full">
      {isMounted && <MapComponent projects={projects} />}
    </div>
  );
};

export default ProjectsMap;