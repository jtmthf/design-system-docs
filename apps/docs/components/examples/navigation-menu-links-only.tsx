"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@workspace/ui/components/navigation-menu";

export default function NavigationMenuLinksOnly() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {["Home", "About", "Blog", "Contact"].map((label) => (
          <NavigationMenuItem key={label}>
            <NavigationMenuLink href="#" className={navigationMenuTriggerStyle()}>
              {label}
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
