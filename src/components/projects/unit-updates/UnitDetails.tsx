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
        {unit.name}
      </div>
      
      {/* Basic Information */}
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
            <TableCell>{unit.unit_type}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-bold">المساحة</TableCell>
            <TableCell>{unit.area} متر مربع</TableCell>
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

      {/* Features Section */}
      {unit.details?.features && unit.details.features.length > 0 && (
        <div className="p-4 border-t">
          <h3 className="font-bold mb-2 text-darkBlue">مميزات الوحدة</h3>
          <ul className="list-disc list-inside space-y-1">
            {unit.details.features.map((feature, index) => (
              <li key={index} className="text-gray-700">{feature}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Guarantees Section */}
      {unit.details?.guarantees && unit.details.guarantees.length > 0 && (
        <div className="p-4 border-t">
          <h3 className="font-bold mb-2 text-darkBlue">ضمانات ومميزات الإضافية</h3>
          <ul className="list-disc list-inside space-y-1">
            {unit.details.guarantees.map((guarantee, index) => (
              <li key={index} className="text-gray-700">{guarantee}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Specifications Section */}
      {unit.details?.specifications && unit.details.specifications.length > 0 && (
        <div className="p-4 border-t">
          <h3 className="font-bold mb-2 text-darkBlue">السعر</h3>
          <ul className="list-disc list-inside space-y-1">
            {unit.details.specifications.map((spec, index) => (
              <li key={index} className="text-gray-700">{spec}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
});

UnitDetails.displayName = 'UnitDetails';
export default UnitDetails;