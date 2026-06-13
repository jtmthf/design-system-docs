"use client";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@workspace/ui/components/tabs";

export default function TabsLine() {
  return (
    <Tabs defaultValue="overview" className="w-80">
      <TabsList variant="line">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="activity">Activity</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">Overview panel.</TabsContent>
      <TabsContent value="activity">Activity panel.</TabsContent>
      <TabsContent value="settings">Settings panel.</TabsContent>
    </Tabs>
  );
}
