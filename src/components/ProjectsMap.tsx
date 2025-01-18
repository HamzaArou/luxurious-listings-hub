import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from "@/integrations/supabase/client";
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';

// Dynamically import the Map component with no SSR
const MapComponent = dynamic(() => import('./MapComponent'), {
  ssr: false,
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

  if (typeof window === 'undefined') {
    return <div className="h-[600px] w-full bg-gray-100" />;
  }

  return (
    <div className="h-[600px] w-full">
      <MapComponent projects={projects} />
    </div>
  );
};

export default ProjectsMap;