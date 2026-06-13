"use client";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@workspace/ui/components/navigation-menu";

export default function NavigationMenuDemo() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[320px] gap-1 p-2">
              <li>
                <NavigationMenuLink href="#" className="flex flex-col gap-0.5">
                  <span className="text-sm font-medium">Introduction</span>
                  <span className="text-xs text-muted-foreground">
                    Re-usable components built with Base UI and Tailwind.
                  </span>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink href="#" className="flex flex-col gap-0.5">
                  <span className="text-sm font-medium">Installation</span>
                  <span className="text-xs text-muted-foreground">
                    How to install dependencies and set up your project.
                  </span>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink href="#" className="flex flex-col gap-0.5">
                  <span className="text-sm font-medium">Theming</span>
                  <span className="text-xs text-muted-foreground">
                    Customise colours, fonts, and border radius with CSS variables.
                  </span>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
