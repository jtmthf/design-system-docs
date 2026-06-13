"use client";

import { ScrollArea } from "@workspace/ui/components/scroll-area";
import { Separator } from "@workspace/ui/components/separator";

const tags = [
  "React", "TypeScript", "Tailwind CSS", "Radix UI", "Storybook",
  "Vite", "ESLint", "Prettier", "pnpm", "Turborepo",
  "Vitest", "Testing Library", "Playwright", "CVA", "Lucide",
];

export default function ScrollAreaDemo() {
  return (
    <ScrollArea className="h-72 w-64 rounded-md border">
      <div className="p-4">
        <h4 className="mb-4 text-sm font-medium leading-none">Tags</h4>
        {tags.map((tag) => (
          <div key={tag}>
            <div className="text-sm">{tag}</div>
            <Separator className="my-2" />
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
