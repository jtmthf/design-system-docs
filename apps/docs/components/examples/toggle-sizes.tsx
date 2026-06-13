"use client";

import { BoldIcon } from "lucide-react";

import { Toggle } from "@workspace/ui/components/toggle";

export default function ToggleSizes() {
  return (
    <div className="flex items-center gap-2">
      <Toggle size="sm" aria-label="Bold small">
        <BoldIcon />
      </Toggle>
      <Toggle size="default" aria-label="Bold default">
        <BoldIcon />
      </Toggle>
      <Toggle size="lg" aria-label="Bold large">
        <BoldIcon />
      </Toggle>
    </div>
  );
}
