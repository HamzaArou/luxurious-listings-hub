import { TabsList, TabsTrigger } from "@/components/ui/tabs";

export const TABS = ["basic", "gallery", "location", "plans", "units"] as const;
export type TabType = typeof TABS[number];

interface FormTabsProps {
  currentTab: TabType;
  setCurrentTab: (tab: TabType) => void;
}

export default function FormTabs({ currentTab, setCurrentTab }: FormTabsProps) {
  return (
    <TabsList className="grid w-full grid-cols-5">
      <TabsTrigger 
        value="basic" 
        onClick={() => setCurrentTab("basic")}
        data-state={currentTab === "basic" ? "active" : "inactive"}
      >
        معلومات أساسية
      </TabsTrigger>
      <TabsTrigger 
        value="gallery" 
        onClick={() => setCurrentTab("gallery")}
        data-state={currentTab === "gallery" ? "active" : "inactive"}
      >
        صور المشروع
      </TabsTrigger>
      <TabsTrigger 
        value="location" 
        onClick={() => setCurrentTab("location")}
        data-state={currentTab === "location" ? "active" : "inactive"}
      >
        الموقع
      </TabsTrigger>
      <TabsTrigger 
        value="plans" 
        onClick={() => setCurrentTab("plans")}
        data-state={currentTab === "plans" ? "active" : "inactive"}
      >
        المخططات
      </TabsTrigger>
      <TabsTrigger 
        value="units" 
        onClick={() => setCurrentTab("units")}
        data-state={currentTab === "units" ? "active" : "inactive"}
      >
        الوحدات
      </TabsTrigger>
    </TabsList>
  );
}