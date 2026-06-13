"use client";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@workspace/ui/components/navigation-menu";

export default function NavigationMenuMultiple() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Products</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] grid-cols-2 gap-1 p-2">
              {[
                { title: "Analytics", desc: "Measure what matters." },
                { title: "Automation", desc: "Automate repetitive tasks." },
                { title: "Commerce", desc: "Sell more, ship faster." },
                { title: "Integrations", desc: "Connect your stack." },
              ].map(({ title, desc }) => (
                <li key={title}>
                  <NavigationMenuLink href="#" className="flex flex-col gap-0.5">
                    <span className="text-sm font-medium">{title}</span>
                    <span className="text-xs text-muted-foreground">{desc}</span>
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[240px] gap-1 p-2">
              {["Documentation", "Blog", "Changelog", "Status"].map((label) => (
                <li key={label}>
                  <NavigationMenuLink href="#">{label}</NavigationMenuLink>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink href="#" className={navigationMenuTriggerStyle()}>
            Pricing
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
