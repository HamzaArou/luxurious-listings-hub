import { FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface ProjectImageUploadProps {
  initialThumbnailUrl?: string;
  isLoading: boolean;
  onFileChange: (file: File | null) => void;
}

export default function ProjectImageUpload({
  initialThumbnailUrl,
  isLoading,
  onFileChange,
}: ProjectImageUploadProps) {
  return (
    <div className="space-y-4">
      <FormLabel>صورة المشروع</FormLabel>
      <div className="flex items-center gap-4">
        {initialThumbnailUrl && (
          <img
            src={initialThumbnailUrl}
            alt="Project thumbnail"
            className="w-20 h-20 object-cover rounded-md"
          />
        )}
        <Input
          type="file"
          accept="image/*"
          onChange={(e) => onFileChange(e.target.files?.[0] || null)}
          disabled={isLoading}
        />
      </div>
    </div>
  );
}