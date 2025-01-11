import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

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
      if (!projectId) {
        const mockUnits = Array.from({ length: 20 }, (_, index) => ({
          unit_number: index + 1,
          status: ['متاح', 'محجوز', 'مباع'][Math.floor(Math.random() * 3)],
          unit_type: 'شقة',
          area: 140 + Math.floor(Math.random() * 60),
          floor_number: Math.floor(index / 4) + 1,
          side: ['أمامية', 'داخلية'][Math.floor(Math.random() * 2)],
          rooms: 3 + Math.floor(Math.random() * 2),
          bathrooms: 2 + Math.floor(Math.random() * 2)
        }));
        setUnits(mockUnits);
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('project_units')
          .select('unit_number, status, unit_type, area, floor_number, side, rooms, bathrooms')
          .eq('project_id', projectId)
          .order('unit_number');

        if (error) throw error;
        setUnits(data || []);
      } catch (error) {
        console.error('Error fetching units:', error);
        // Generate mock data when there's an error
        const mockUnits = Array.from({ length: 20 }, (_, index) => ({
          unit_number: index + 1,
          status: ['متاح', 'محجوز', 'مباع'][Math.floor(Math.random() * 3)],
          unit_type: 'شقة',
          area: 140 + Math.floor(Math.random() * 60),
          floor_number: Math.floor(index / 4) + 1,
          side: ['أمامية', 'داخلية'][Math.floor(Math.random() * 2)],
          rooms: 3 + Math.floor(Math.random() * 2),
          bathrooms: 2 + Math.floor(Math.random() * 2)
        }));
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
    const floors = ['الأرضي', 'الأول', 'الثاني', 'الثالث', 'الرابع', 'الخامس'];
    return floors[number] || `${number}`;
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
        <div className="space-y-8">
          {/* Unit Blocks Grid */}
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 justify-items-center">
            {units.map((unit) => (
              <div
                key={unit.unit_number}
                onClick={() => setSelectedUnit(selectedUnit === unit.unit_number ? null : unit.unit_number)}
                className={cn(
                  "w-[107px] h-[45px] flex items-center justify-center cursor-pointer",
                  "rounded-tr-[5px] rounded-tl-[100px] rounded-br-[100px] rounded-bl-[5px]",
                  "transition-all duration-300 hover:scale-105 hover:shadow-lg",
                  "font-bold text-xl",
                  getStatusColor(unit.status || 'متاح'),
                  selectedUnit === unit.unit_number && "ring-2 ring-darkBlue"
                )}
              >
                {unit.unit_number}
              </div>
            ))}
          </div>

          {/* Unit Details Tables */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 rtl">
            {units.map((unit) => (
              <div
                key={unit.unit_number}
                className={cn(
                  "bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300",
                  selectedUnit === unit.unit_number ? "opacity-100 scale-100" : "opacity-0 scale-95 hidden"
                )}
              >
                <div className={cn(
                  "px-4 py-2 text-white font-bold text-lg",
                  getStatusColor(unit.status || 'متاح')
                )}>
                  رقم الوحدة {unit.unit_number}
                </div>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-bold">حالة الوحدة</TableCell>
                      <TableCell className={cn(
                        "font-medium",
                        getStatusColor(unit.status || 'متاح')
                      )}>
                        {unit.status}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-bold">النوع</TableCell>
                      <TableCell>{unit.unit_type || 'شقة'}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-bold">المساحة</TableCell>
                      <TableCell>{unit.area} م²</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-bold">الدور</TableCell>
                      <TableCell>{unit.floor_number ? getFloorName(unit.floor_number) : 'غير محدد'}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-bold">الجهة</TableCell>
                      <TableCell>{unit.side || 'غير محدد'}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-bold">عدد الغرف</TableCell>
                      <TableCell>{unit.rooms || 'غير محدد'}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-bold">عدد دورات المياه</TableCell>
                      <TableCell>{unit.bathrooms || 'غير محدد'}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}