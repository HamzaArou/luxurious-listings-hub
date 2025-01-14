import { cn } from "@/lib/utils";
import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import StatusLegend from "./unit-updates/StatusLegend";
import UnitBlock from "./unit-updates/UnitBlock";
import UnitDetails from "./unit-updates/UnitDetails";
import { Info } from "lucide-react";
import type { ProjectUnit } from "@/types/project";

interface ProjectUpdatesProps {
  projectId: string;
}

export default function ProjectUpdates({ projectId }: ProjectUpdatesProps) {
  const [units, setUnits] = useState<ProjectUnit[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUnit, setSelectedUnit] = useState<number | null>(null);

  const fetchUnits = useCallback(async () => {
    const mockUnits = [
      {
        id: 'mock-1',
        unit_number: 1,
        status: 'متاح',
        unit_type: 'شقة روف',
        area: 400,
        floor_number: 1,
        side: 'شارع 15',
        rooms: 5,
        bathrooms: 3,
        name: 'شقة روف للتمليك',
        details: {
          features: [
            'مجلس رجال',
            'صالة',
            'مطبخ',
            'غرفة غسيل',
            '3 غرفة نوم',
            'غرفة نوم ماستر',
            '2 دورة مياه',
            'سطح'
          ],
          guarantees: [
            'كرت إشراف هندسي',
            'ضمانات السباكة والكهرباء',
            'ضمانات الهيكل الإنشائي',
            'دخول ذكي',
            'بجوار مسجد',
            'موقف خاص',
            'شارع 15'
          ],
          specifications: [
            'المساحة: 400 متر مربع',
            'السعر: 900,000 ريال'
          ]
        }
      },
      {
        id: 'mock-2',
        unit_number: 2,
        status: 'متاح',
        unit_type: 'شقة',
        area: 200,
        floor_number: 1,
        side: 'على شارعين',
        rooms: 6,
        bathrooms: 4,
        name: 'شقق تمليك - حي الشوقية (شارعين)',
        details: {
          features: [
            'مجلس رجال',
            'مقلط',
            'مجلس نساء',
            'مطبخ',
            '2 غرفة نوم',
            'غرفة نوم ماستر',
            'غرفة غسيل',
            '3 دورة مياه'
          ],
          guarantees: [
            'ضمانات السباكة والكهرباء',
            'كرت إشراف هندسي',
            'ضمانات الهيكل الإنشائي',
            'مدخلين',
            'خزانات مستقلة',
            'عداد مستقل',
            'بجوار مسجد',
            'بالقرب من الخدمات التجارية',
            'بالقرب من المدارس',
            'موقف خاص'
          ],
          specifications: [
            'المساحة: 200 متر مربع',
            'السعر: 800,000 ريال'
          ]
        }
      },
      {
        id: 'mock-3',
        unit_number: 3,
        status: 'متاح',
        unit_type: 'شقة',
        area: 200,
        floor_number: 1,
        side: 'على شارع واحد',
        rooms: 6,
        bathrooms: 4,
        name: 'شقق تمليك - حي الشوقية (شارع واحد)',
        details: {
          features: [
            'مجلس رجال',
            'مقلط',
            'مجلس نساء',
            'مطبخ',
            '2 غرفة نوم',
            'غرفة نوم ماستر',
            'غرفة غسيل',
            '3 دورة مياه'
          ],
          guarantees: [
            'ضمانات السباكة والكهرباء',
            'كرت إشراف هندسي',
            'ضمانات الهيكل الإنشائي',
            'مدخلين',
            'خزانات مستقلة',
            'عداد مستقل',
            'بجوار مسجد',
            'بالقرب من الخدمات التجارية',
            'بالقرب من المدارس',
            'موقف خاص'
          ],
          specifications: [
            'المساحة: 200 متر مربع',
            'السعر: 750,000 ريال'
          ]
        }
      },
      {
        id: 'mock-4',
        unit_number: 4,
        status: 'متاح',
        unit_type: 'شقة روف',
        area: 370,
        floor_number: 1,
        side: 'غير محددة',
        rooms: 4,
        bathrooms: 5,
        name: 'شقة روف للتمليك - حي الشوقية',
        details: {
          features: [
            'مدخلين',
            'مجلس رجال',
            'مطبخ',
            'غرفة نوم ماستر',
            '3 غرف نوم',
            '4 دورات مياه',
            'مخزن'
          ],
          guarantees: [
            'ضمانات السباكة والكهرباء',
            'كرت إشراف هندسي',
            'ضمانات الهيكل الإنشائي',
            'مدخلين',
            'خزانات مستقلة',
            'عداد مستقل',
            'بجوار مسجد',
            'بالقرب من الخدمات التجارية',
            'بالقرب من المدارس',
            'موقف خاص'
          ],
          specifications: [
            'المساحة: 370 متر مربع',
            'السعر: 1,400,000 ريال'
          ]
        }
      }
    ];

    setUnits(mockUnits);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchUnits();
  }, [projectId, fetchUnits]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-darkBlue"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <StatusLegend />

      {units.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          لا توجد وحدات متاحة حالياً
        </div>
      ) : (
        <div className="space-y-8">
          {/* User guidance text */}
          <div className="flex items-center justify-center gap-2 text-darkBlue bg-warmBeige/30 py-3 px-4 rounded-lg">
            <Info className="w-5 h-5" />
            <p className="text-sm font-medium">
              اضغط على رقم الوحدة لعرض التفاصيل الكاملة
            </p>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 justify-items-center">
            {units.map((unit) => (
              <UnitBlock
                key={unit.id}
                unit={unit}
                isSelected={selectedUnit === unit.unit_number}
                onClick={() => setSelectedUnit(selectedUnit === unit.unit_number ? null : unit.unit_number)}
              />
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 rtl">
            {units.map((unit) => (
              <UnitDetails
                key={unit.id}
                unit={unit}
                isSelected={selectedUnit === unit.unit_number}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}