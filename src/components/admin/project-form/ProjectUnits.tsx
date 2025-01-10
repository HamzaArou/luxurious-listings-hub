import { Button } from "@/components/ui/button";
import { UseFormReturn } from "react-hook-form";
import { ProjectFormValues } from "@/types/project";
import { Plus } from "lucide-react";
import ProjectUnit from "./ProjectUnit";

interface ProjectUnitsProps {
  form: UseFormReturn<ProjectFormValues>;
  isLoading: boolean;
  onAddUnit: () => void;
  onRemoveUnit: (index: number) => void;
}

export default function ProjectUnits({ form, isLoading, onAddUnit, onRemoveUnit }: ProjectUnitsProps) {
  const units = form.watch("project_units") || [];

  return (
    <div className="space-y-6">
      {units.map((_, index) => (
        <ProjectUnit
          key={index}
          form={form}
          index={index}
          onRemove={() => onRemoveUnit(index)}
          isLoading={isLoading}
        />
      ))}

      <Button
        type="button"
        variant="outline"
        onClick={onAddUnit}
        disabled={isLoading}
        className="w-full"
      >
        <Plus className="h-4 w-4 mr-2" />
        إضافة وحدة جديدة
      </Button>
    </div>
  );
}