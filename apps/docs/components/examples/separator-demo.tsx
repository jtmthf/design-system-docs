"use client";

import { Separator } from "@workspace/ui/components/separator";

export default function SeparatorDemo() {
  return (
    <div className="w-72 space-y-2 text-sm">
      <p>Above the separator</p>
      <Separator />
      <p>Below the separator</p>
    </div>
  );
}
