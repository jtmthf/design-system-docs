"use client";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@workspace/ui/components/menubar";

export default function MenubarSubmenu() {
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>Format</MenubarTrigger>
        <MenubarContent>
          <MenubarSub>
            <MenubarSubTrigger>Text style</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>Bold</MenubarItem>
              <MenubarItem>Italic</MenubarItem>
              <MenubarItem>Underline</MenubarItem>
              <MenubarSeparator />
              <MenubarItem>Strikethrough</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
          <MenubarItem>Paragraph</MenubarItem>
          <MenubarSeparator />
          <MenubarItem>Clear formatting</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
