import { cn } from "@/lib/utils";
import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import StatusLegend from "./unit-updates/StatusLegend";
import UnitBlock from "./unit-updates/UnitBlock";
import UnitDetails from "./unit-updates/UnitDetails";
import type { ProjectUnit } from "@/types/project";

interface ProjectUpdatesProps {
  projectId: string;
}

export default function ProjectUpdates({ projectId }: ProjectUpdatesProps) {
  const [units, setUnits] = useState<ProjectUnit[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUnit, setSelectedUnit] = useState<number | null>(null);

  const fetchUnits = useCallback(async () => {
    // Always generate mock data for development and invalid UUIDs
    const mockUnits = Array.from({ length: 20 }, (_, index) => ({
      id: `mock-${index}`,
      unit_number: index + 1,
      status: ['متاح', 'محجوز', 'مباع'][Math.floor(Math.random() * 3)],
      unit_type: 'شقة',
      area: 140 + Math.floor(Math.random() * 60),
      floor_number: Math.floor(index / 4) + 1,
      side: ['أمامية', 'داخلية'][Math.floor(Math.random() * 2)],
      rooms: 3 + Math.floor(Math.random() * 2),
      bathrooms: 2 + Math.floor(Math.random() * 2),
      name: `Unit ${index + 1}`,
      details: {}
    }));

    // Check if projectId is a valid UUID
    const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (!UUID_REGEX.test(projectId)) {
      console.log('Invalid UUID format, using mock data');
      setUnits(mockUnits);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('project_units')
        .select('*')
        .eq('project_id', projectId)
        .order('unit_number');

      if (error) {
        console.error('Error fetching units:', error);
        setUnits(mockUnits);
      } else {
        setUnits(data || mockUnits);
      }
    } catch (error) {
      console.error('Error fetching units:', error);
      setUnits(mockUnits);
    } finally {
      setLoading(false);
    }
  }, [projectId]);

  useEffect(() => {
    fetchUnits();

    // Only set up real-time subscription for valid UUIDs
    const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (UUID_REGEX.test(projectId)) {
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
    }
  }, [projectId, fetchUnits]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-darkBlue"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <StatusLegend />

      {units.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          لا توجد وحدات متاحة حالياً
        </div>
      ) : (
        <div className="space-y-8">
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 justify-items-center">
            {units.map((unit) => (
              <UnitBlock
                key={unit.id}
                unit={unit}
                isSelected={selectedUnit === unit.unit_number}
                onClick={() => setSelectedUnit(selectedUnit === unit.unit_number ? null : unit.unit_number)}
              />
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 rtl">
            {units.map((unit) => (
              <UnitDetails
                key={unit.id}
                unit={unit}
                isSelected={selectedUnit === unit.unit_number}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}