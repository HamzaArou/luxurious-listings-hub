import { TabsList, TabsTrigger } from "@/components/ui/tabs";

export const TABS = ["basic", "details", "gallery", "location", "360views", "units"] as const;
export type TabType = typeof TABS[number];

interface FormTabsProps {
  currentTab: TabType;
}

export default function FormTabs({ currentTab }: FormTabsProps) {
  return (
    <TabsList className="grid w-full grid-cols-6">
      <TabsTrigger value="basic">معلومات أساسية</TabsTrigger>
      <TabsTrigger value="details">التفاصيل</TabsTrigger>
      <TabsTrigger value="gallery">معرض الصور</TabsTrigger>
      <TabsTrigger value="location">الموقع</TabsTrigger>
      <TabsTrigger value="360views">جولة 360</TabsTrigger>
      <TabsTrigger value="units">الوحدات</TabsTrigger>
    </TabsList>
  );
}