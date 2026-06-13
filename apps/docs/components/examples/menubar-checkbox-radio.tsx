"use client";

import { useState } from "react";

import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarGroup,
  MenubarLabel,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarTrigger,
} from "@workspace/ui/components/menubar";

export default function MenubarCheckboxRadio() {
  const [showSidebar, setShowSidebar] = useState(true);
  const [showStatusBar, setShowStatusBar] = useState(false);
  const [theme, setTheme] = useState("system");

  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>View</MenubarTrigger>
        <MenubarContent>
          <MenubarGroup>
            <MenubarLabel>Panels</MenubarLabel>
            <MenubarCheckboxItem
              checked={showSidebar}
              onCheckedChange={setShowSidebar}
            >
              Sidebar
            </MenubarCheckboxItem>
            <MenubarCheckboxItem
              checked={showStatusBar}
              onCheckedChange={setShowStatusBar}
            >
              Status bar
            </MenubarCheckboxItem>
          </MenubarGroup>
          <MenubarSeparator />
          <MenubarGroup>
            <MenubarLabel>Theme</MenubarLabel>
            <MenubarRadioGroup value={theme} onValueChange={setTheme}>
              <MenubarRadioItem value="light">Light</MenubarRadioItem>
              <MenubarRadioItem value="dark">Dark</MenubarRadioItem>
              <MenubarRadioItem value="system">System</MenubarRadioItem>
            </MenubarRadioGroup>
          </MenubarGroup>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
