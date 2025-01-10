import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";

interface FormNavigationProps {
  isLoading: boolean;
  isLastTab: boolean;
  isFirstTab: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onCancel: () => void;
  isEditing: boolean;
}

export default function FormNavigation({
  isLoading,
  isLastTab,
  isFirstTab,
  onPrevious,
  onNext,
  onCancel,
  isEditing,
}: FormNavigationProps) {
  return (
    <div className="flex justify-between gap-4">
      <Button
        type="button"
        variant="outline"
        onClick={onCancel}
        disabled={isLoading}
      >
        إلغاء
      </Button>

      <div className="flex gap-2">
        {!isFirstTab && (
          <Button
            type="button"
            variant="outline"
            onClick={onPrevious}
            disabled={isLoading}
          >
            السابق
          </Button>
        )}

        {!isLastTab ? (
          <Button
            type="button"
            onClick={onNext}
            disabled={isLoading}
          >
            التالي
          </Button>
        ) : (
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              "جاري الحفظ..."
            ) : (
              <>
                <Save className="ml-2 h-4 w-4" />
                {isEditing ? "تحديث المشروع" : "إنشاء المشروع"}
              </>
            )}
          </Button>
        )}
      </div>
    </div>
  );
}