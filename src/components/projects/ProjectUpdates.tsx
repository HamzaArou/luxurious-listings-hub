import { cn } from "@/lib/utils";
import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import StatusLegend from "./unit-updates/StatusLegend";
import UnitBlock from "./unit-updates/UnitBlock";
import UnitDetails from "./unit-updates/UnitDetails";
import { Info } from "lucide-react";
import type { ProjectUnit } from "@/types/project";
import { useQuery } from "@tanstack/react-query";

interface ProjectUpdatesProps {
  projectId: string;
}

export default function ProjectUpdates({ projectId }: ProjectUpdatesProps) {
  const [selectedUnit, setSelectedUnit] = useState<number | null>(null);

  const { data: units = [], isLoading: loading } = useQuery({
    queryKey: ['project-units', projectId],
    queryFn: async () => {
      console.log('Fetching units for project:', projectId);
      const { data, error } = await supabase
        .from('project_units')
        .select('*')
        .eq('project_id', projectId)
        .order('unit_number', { ascending: true });

      if (error) {
        console.error('Error fetching units:', error);
        throw error;
      }

      console.log('Fetched units:', data);
      return data as ProjectUnit[];
    },
  });

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

      {!units || units.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          لا توجد وحدات متاحة حالياً
        </div>
      ) : (
        <div className="space-y-8">
          {/* User guidance text */}
          <div className="flex items-center justify-center gap-2 text-darkBlue bg-warmBeige/30 py-3 px-4 rounded-lg">
            <Info className="w-5 h-5" />
            <p className="text-sm font-medium">
              اضغط على رقم الوحدة لعرض التفاصيل الكاملة
            </p>
          </div>

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