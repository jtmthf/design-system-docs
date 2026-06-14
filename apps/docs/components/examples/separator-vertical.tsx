"use client";

import { Separator } from "@workspace/ui/components/separator";

export default function SeparatorVertical() {
  return (
    <div className="flex h-8 items-center gap-2 text-sm">
      <span>Item A</span>
      <Separator orientation="vertical" />
      <span>Item B</span>
      <Separator orientation="vertical" />
      <span>Item C</span>
    </div>
  );
}
