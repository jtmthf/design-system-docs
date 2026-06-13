"use client";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@workspace/ui/components/tabs";

export default function TabsVertical() {
  return (
    <Tabs defaultValue="account" orientation="vertical" className="w-80">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
      </TabsList>
      <TabsContent value="account">Manage your account details.</TabsContent>
      <TabsContent value="password">Change your password here.</TabsContent>
      <TabsContent value="notifications">Configure notification preferences.</TabsContent>
    </Tabs>
  );
}
