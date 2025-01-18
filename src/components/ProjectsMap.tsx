import { useEffect, useState, lazy, Suspense } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from "@/integrations/supabase/client";
import 'leaflet/dist/leaflet.css';

// Lazy load the MapComponent
const MapComponent = lazy(() => import('./MapComponent'));

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
      <Suspense fallback={<div className="h-full w-full bg-gray-100" />}>
        {isMounted && <MapComponent projects={projects} />}
      </Suspense>
    </div>
  );
};

export default ProjectsMap;