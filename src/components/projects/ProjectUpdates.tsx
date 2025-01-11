import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ProjectUnit {
  unit_number: number;
  status: string;
  unit_type?: string;
  area?: number;
  floor_number?: number;
  side?: string;
  rooms?: number;
  bathrooms?: number;
}

interface ProjectUpdatesProps {
  projectId: string;
}

export default function ProjectUpdates({ projectId }: ProjectUpdatesProps) {
  const [units, setUnits] = useState<ProjectUnit[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUnit, setSelectedUnit] = useState<number | null>(null);

  useEffect(() => {
    const fetchUnits = async () => {
      // Always generate mock data for development and testing
      const mockUnits = Array.from({ length: 20 }, (_, index) => ({
        unit_number: index + 1,
        status: ['متاح', 'محجوز', 'مباع'][Math.floor(Math.random() * 3)],
        unit_type: 'شقة',
        area: 140 + Math.floor(Math.random() * 30),
        floor_number: Math.floor(index / 4) + 1,
        side: ['أمامية', 'داخلية'][Math.floor(Math.random() * 2)],
        rooms: 4,
        bathrooms: 4
      }));

      try {
        const { data, error } = await supabase
          .from('project_units')
          .select('unit_number, status, unit_type, area, floor_number, side, rooms, bathrooms')
          .eq('project_id', projectId)
          .order('unit_number');

        if (error) {
          console.error('Error fetching units:', error);
          setUnits(mockUnits);
        } else {
          setUnits(data || mockUnits);
        }
      } catch (error) {
        console.error('Error in fetchUnits:', error);
        setUnits(mockUnits);
      } finally {
        setLoading(false);
      }
    };

    fetchUnits();

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

  const getFloorName = (number: number) => {
    const floors = ['الأول', 'الثاني', 'الثالث', 'الرابع', 'الخامس', 'السادس'];
    return floors[number - 1] || number.toString();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-darkBlue"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
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
        <>
          {/* Unit Blocks Grid */}
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 justify-items-center">
            {units.map((unit, index) => (
              <button
                key={index}
                onClick={() => setSelectedUnit(selectedUnit === unit.unit_number ? null : unit.unit_number)}
                className={cn(
                  "w-[107px] h-[45px] flex items-center justify-center",
                  "rounded-tr-[5px] rounded-tl-[100px] rounded-br-[100px] rounded-bl-[5px]",
                  "transition-all duration-300 hover:scale-105 hover:shadow-lg",
                  "font-bold text-xl",
                  getStatusColor(unit.status || 'متاح'),
                  selectedUnit === unit.unit_number && "ring-2 ring-darkBlue"
                )}
              >
                {unit.unit_number}
              </button>
            ))}
          </div>

          {/* Unit Details Tables */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {units.filter(unit => selectedUnit === unit.unit_number).map((unit) => (
              <Card key={unit.unit_number} className="overflow-hidden">
                <CardHeader className={cn(
                  "py-3",
                  getStatusColor(unit.status || 'متاح')
                )}>
                  <CardTitle className="text-center">
                    رقم الوحدة {unit.unit_number}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <dl className="space-y-2">
                    <div className="flex justify-between items-center py-2 border-b">
                      <dt className="text-gray-600">حالة الوحدة</dt>
                      <dd className={cn(
                        "px-3 py-1 rounded-full text-sm font-medium",
                        getStatusColor(unit.status || 'متاح')
                      )}>
                        {unit.status}
                      </dd>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b">
                      <dt className="text-gray-600">النوع</dt>
                      <dd className="font-medium">{unit.unit_type}</dd>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b">
                      <dt className="text-gray-600">المساحة</dt>
                      <dd className="font-medium">{unit.area} م²</dd>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b">
                      <dt className="text-gray-600">الدور</dt>
                      <dd className="font-medium">{unit.floor_number ? getFloorName(unit.floor_number) : ''}</dd>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b">
                      <dt className="text-gray-600">الجهة</dt>
                      <dd className="font-medium">{unit.side}</dd>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b">
                      <dt className="text-gray-600">عدد الغرف</dt>
                      <dd className="font-medium">{unit.rooms}</dd>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <dt className="text-gray-600">عدد دورات المياه</dt>
                      <dd className="font-medium">{unit.bathrooms}</dd>
                    </div>
                  </dl>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  );
}