import { Rotate3d } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface Project360ViewsProps {
  projectId: string | undefined;
}

export default function Project360Views({ projectId }: Project360ViewsProps) {
  const { data: views, isLoading } = useQuery({
    queryKey: ['project-360-views', projectId],
    queryFn: async () => {
      if (!projectId) return [];
      const { data, error } = await supabase
        .from('project_360_views')
        .select('*')
        .eq('project_id', projectId);

      if (error) throw error;
      return data || [];
    },
    enabled: !!projectId,
  });

  if (isLoading || !views?.length) return null;

  return (
    <div className="relative py-16 bg-gradient-to-b from-deepBlue/10 to-deepBlue/5 rounded-3xl mb-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-center mb-8">
          <h2 className="text-3xl font-bold text-white bg-deepBlue py-2 px-8 rounded-tr-[5px] rounded-tl-[100px] rounded-br-[100px] rounded-bl-[5px] inline-block">
            جولة افتراضية 360°
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {views.map((view) => (
            <a
              key={view.id}
              href={view.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-center"
            >
              <div className="flex justify-center mb-4">
                <Rotate3d className="w-12 h-12 text-gold group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="text-xl font-bold text-deepBlue mb-2">{view.title}</h3>
              <p className="text-gray-600 text-sm">
                انقر لمشاهدة جولة افتراضية 360° درجة
              </p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}