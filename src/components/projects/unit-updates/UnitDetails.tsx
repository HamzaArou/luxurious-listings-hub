import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { memo } from "react";
import { getStatusColor, getFloorName } from "./utils";
import type { ProjectUnit } from "@/types/project";

interface UnitDetailsProps {
  unit: ProjectUnit;
  isSelected: boolean;
}

const UnitDetails = memo(({ unit, isSelected }: UnitDetailsProps) => {
  if (!isSelected) return null;

  return (
    <div
      className={cn(
        "bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300",
        isSelected ? "opacity-100 scale-100" : "opacity-0 scale-95 hidden"
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
  );
});

UnitDetails.displayName = 'UnitDetails';
export default UnitDetails;