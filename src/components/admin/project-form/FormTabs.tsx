import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const TABS = ["basic", "details", "gallery", "location", "360views", "units"] as const;
export type TabType = (typeof TABS)[number];

interface FormTabsProps {
  currentTab: TabType;
}

export default function FormTabs({ currentTab }: FormTabsProps) {
  return (
    <TabsList className="grid w-full grid-cols-2 lg:grid-cols-6">
      <TabsTrigger value="basic" disabled={currentTab !== "basic"}>
        معلومات أساسية
      </TabsTrigger>
      <TabsTrigger value="details" disabled={currentTab !== "details"}>
        التفاصيل
      </TabsTrigger>
      <TabsTrigger value="gallery" disabled={currentTab !== "gallery"}>
        معرض الصور
      </TabsTrigger>
      <TabsTrigger value="location" disabled={currentTab !== "location"}>
        الموقع
      </TabsTrigger>
      <TabsTrigger value="360views" disabled={currentTab !== "360views"}>
        جولة 360
      </TabsTrigger>
      <TabsTrigger value="units" disabled={currentTab !== "units"}>
        الوحدات
      </TabsTrigger>
    </TabsList>
  );
}