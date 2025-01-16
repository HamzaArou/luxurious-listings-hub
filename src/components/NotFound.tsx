import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Home } from "lucide-react";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center space-y-6 p-8">
        <h1 className="text-4xl font-bold text-gray-900">الصفحة غير موجودة</h1>
        <p className="text-xl text-gray-600 max-w-md">
          عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها.
        </p>
        <Button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2"
        >
          <Home className="w-4 h-4" />
          العودة للرئيسية
        </Button>
      </div>
    </div>
  );
}