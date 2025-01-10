import { TabsList, TabsTrigger } from "@/components/ui/tabs";

export const TABS = ["basic", "gallery", "location", "plans", "units"] as const;
export type TabType = typeof TABS[number];

export default function FormTabs() {
  return (
    <TabsList className="grid w-full grid-cols-5">
      <TabsTrigger value="basic" disabled>معلومات أساسية</TabsTrigger>
      <TabsTrigger value="gallery" disabled>صور المشروع</TabsTrigger>
      <TabsTrigger value="location" disabled>الموقع</TabsTrigger>
      <TabsTrigger value="plans" disabled>المخططات</TabsTrigger>
      <TabsTrigger value="units" disabled>الوحدات</TabsTrigger>
    </TabsList>
  );
}