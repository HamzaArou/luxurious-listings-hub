import { useFormContext } from "react-hook-form";
import { ProjectFormValues } from "@/types/project";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const ProjectPlans = ({ onFileChange }: { onFileChange: (files: FileList) => void }) => {
  const { register } = useFormContext<ProjectFormValues>();

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="plans" className="block text-sm font-medium text-gray-700">
          مخططات المشروع
        </label>
        <Input
          id="plans"
          type="file"
          accept=".pdf"
          multiple
          onChange={(e) => {
            if (e.target.files) {
              onFileChange(e.target.files);
            }
          }}
          className="mt-1"
        />
      </div>
    </div>
  );
};

export default ProjectPlans;