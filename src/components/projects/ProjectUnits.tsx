import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ProjectUnit {
  id: string;
  name: string;
  area: number;
  bedrooms?: number;
  bathrooms?: number;
  details?: Record<string, any>;
}

interface ProjectUnitsProps {
  units: ProjectUnit[];
}

export default function ProjectUnits({ units }: ProjectUnitsProps) {
  if (units.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">لا توجد وحدات متاحة</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {units.map((unit) => (
        <Card key={unit.id}>
          <CardHeader>
            <CardTitle>{unit.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="space-y-2">
              <div className="flex justify-between">
                <dt className="text-gray-500">المساحة:</dt>
                <dd className="font-medium">{unit.area} م²</dd>
              </div>
              {unit.bedrooms && (
                <div className="flex justify-between">
                  <dt className="text-gray-500">غرف النوم:</dt>
                  <dd className="font-medium">{unit.bedrooms}</dd>
                </div>
              )}
              {unit.bathrooms && (
                <div className="flex justify-between">
                  <dt className="text-gray-500">الحمامات:</dt>
                  <dd className="font-medium">{unit.bathrooms}</dd>
                </div>
              )}
            </dl>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}