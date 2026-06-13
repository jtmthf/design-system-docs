"use client";

import { ScrollArea, ScrollBar } from "@workspace/ui/components/scroll-area";

const tags = [
  "React", "TypeScript", "Tailwind CSS", "Radix UI", "Storybook",
  "Vite", "ESLint", "Prettier", "pnpm", "Turborepo",
];

export default function ScrollAreaHorizontal() {
  return (
    <ScrollArea className="w-96 whitespace-nowrap rounded-md border">
      <div className="flex w-max gap-4 p-4">
        {tags.map((tag) => (
          <div
            key={tag}
            className="flex h-20 w-32 shrink-0 items-center justify-center rounded-md border bg-muted text-xs font-medium"
          >
            {tag}
          </div>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
