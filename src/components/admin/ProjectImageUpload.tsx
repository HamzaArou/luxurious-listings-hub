import { FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface ProjectImageUploadProps {
  initialThumbnailUrl?: string;
  isLoading: boolean;
  onFileChange: (file: File | null) => void;
  error?: boolean;
  className?: string;
  onChange?: (file: File | null) => void;
  onRemove?: () => void;
  disabled?: boolean;
  value?: string;
}

export default function ProjectImageUpload({
  initialThumbnailUrl,
  isLoading,
  onFileChange,
  onChange,
  error,
  className,
  disabled,
}: ProjectImageUploadProps) {
  const handleFileChange = (file: File | null) => {
    onFileChange?.(file);
    onChange?.(file);
  };

  return (
    <div className={cn("space-y-4", className)}>
      <FormLabel className={error ? "text-destructive" : ""}>صورة المشروع</FormLabel>
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
          onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
          disabled={isLoading || disabled}
          className={error ? "border-destructive" : ""}
        />
      </div>
      {error && (
        <p className="text-sm font-medium text-destructive">
          الرجاء اختيار صورة للمشروع
        </p>
      )}
    </div>
  );
}