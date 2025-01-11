import { cn } from "@/lib/utils";
import { memo } from "react";
import { getStatusColor } from "./utils";

interface UnitBlockProps {
  unit: {
    unit_number: number;
    status: string;
  };
  isSelected: boolean;
  onClick: () => void;
}

const UnitBlock = memo(({ unit, isSelected, onClick }: UnitBlockProps) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        "w-[107px] h-[45px] flex items-center justify-center cursor-pointer",
        "rounded-tr-[5px] rounded-tl-[100px] rounded-br-[100px] rounded-bl-[5px]",
        "transition-all duration-300 hover:scale-105 hover:shadow-lg",
        "font-bold text-xl",
        getStatusColor(unit.status || 'متاح'),
        isSelected && "ring-2 ring-darkBlue"
      )}
    >
      {unit.unit_number}
    </div>
  );
});

UnitBlock.displayName = 'UnitBlock';
export default UnitBlock;