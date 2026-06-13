"use client";

import {
  HomeIcon,
  InboxIcon,
  SearchIcon,
  SettingsIcon,
  UsersIcon,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarSeparator,
  SidebarTrigger,
} from "@workspace/ui/components/sidebar";

const navItems = [
  { label: "Home", icon: HomeIcon },
  { label: "Inbox", icon: InboxIcon },
  { label: "Search", icon: SearchIcon },
  { label: "Team", icon: UsersIcon },
];

export default function SidebarDemo() {
  return (
    <div className="h-[400px] w-full overflow-hidden rounded-lg border">
      <SidebarProvider>
        <Sidebar>
          <SidebarHeader>
            <div className="flex items-center gap-2 px-2 py-1">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-primary-foreground text-xs font-bold">
                A
              </div>
              <span className="text-sm font-semibold">Acme Inc.</span>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Navigation</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navItems.map(({ label, icon: Icon }) => (
                    <SidebarMenuItem key={label}>
                      <SidebarMenuButton isActive={label === "Home"}>
                        <Icon />
                        <span>{label}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarSeparator />
          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <SettingsIcon />
                  <span>Settings</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset>
          <header className="flex h-12 items-center gap-2 border-b px-4">
            <SidebarTrigger />
            <span className="text-sm font-medium">Dashboard</span>
          </header>
          <main className="flex flex-1 flex-col gap-4 p-6">
            <p className="text-sm text-muted-foreground">
              Main content area. Toggle the sidebar with the button above or press ⌘B.
            </p>
          </main>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
