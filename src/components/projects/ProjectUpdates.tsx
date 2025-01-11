import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface ProjectUnit {
  unit_number: number;
  status: string;
}

interface ProjectUpdatesProps {
  projectId: string;
}

export default function ProjectUpdates({ projectId }: ProjectUpdatesProps) {
  const [units, setUnits] = useState<ProjectUnit[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUnits = async () => {
      // Generate mock data when no project ID is provided
      if (!projectId) {
        const mockUnits = Array.from({ length: 20 }, (_, index) => ({
          unit_number: index + 1,
          status: ['متاح', 'محجوز', 'مباع'][Math.floor(Math.random() * 3)]
        }));
        setUnits(mockUnits);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('project_units')
        .select('unit_number, status')
        .eq('project_id', projectId)
        .order('unit_number');

      if (error) {
        console.error('Error fetching units:', error);
        // Generate mock data when there's an error
        const mockUnits = Array.from({ length: 20 }, (_, index) => ({
          unit_number: index + 1,
          status: ['متاح', 'محجوز', 'مباع'][Math.floor(Math.random() * 3)]
        }));
        setUnits(mockUnits);
        setLoading(false);
        return;
      }

      setUnits(data || []);
      setLoading(false);
    };

    fetchUnits();

    // Subscribe to realtime updates
    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'project_units',
          filter: `project_id=eq.${projectId}`
        },
        () => {
          fetchUnits();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [projectId]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'متاح':
        return 'bg-[#D9D9D9] text-darkBlue';
      case 'محجوز':
        return 'bg-[#C6A567] text-white';
      case 'مباع':
        return 'bg-[#204E46] text-white';
      default:
        return 'bg-[#D9D9D9] text-darkBlue';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-darkBlue"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Status Legend */}
      <div className="flex justify-center items-center gap-2 whitespace-nowrap overflow-x-auto py-2">
        {['متاح', 'محجوز', 'مباع'].map((status) => (
          <div
            key={status}
            className={cn(
              "px-4 py-2 rounded-lg font-medium text-center min-w-[80px]",
              getStatusColor(status)
            )}
          >
            {status}
          </div>
        ))}
      </div>

      {units.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          لا توجد وحدات متاحة حالياً
        </div>
      ) : (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 justify-items-center">
          {units.map((unit, index) => (
            <div
              key={index}
              className={cn(
                "w-[107px] h-[45px] flex items-center justify-center",
                "rounded-tr-[5px] rounded-tl-[100px] rounded-br-[100px] rounded-bl-[5px]",
                "transition-all duration-300 hover:scale-105 hover:shadow-lg",
                "font-bold text-xl",
                getStatusColor(unit.status || 'متاح')
              )}
            >
              {unit.unit_number}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}