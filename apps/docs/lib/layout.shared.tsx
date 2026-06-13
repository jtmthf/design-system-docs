import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";

export const baseOptions: BaseLayoutProps = {
  nav: {
    title: "Design System",
  },
  links: [
    { text: "Components", url: "/docs/components" },
    { text: "API Reference", url: "/docs/api-reference" },
    { text: "Playground", url: "/playground" },
  ],
};
