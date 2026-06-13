"use client";

import { BoldIcon } from "lucide-react";

import { Toggle } from "@workspace/ui/components/toggle";

export default function ToggleDemo() {
  return (
    <Toggle aria-label="Bold">
      <BoldIcon />
    </Toggle>
  );
}
