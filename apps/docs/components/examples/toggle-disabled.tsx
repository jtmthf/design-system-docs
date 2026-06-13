"use client";

import { BoldIcon } from "lucide-react";

import { Toggle } from "@workspace/ui/components/toggle";

export default function ToggleDisabled() {
  return (
    <Toggle disabled aria-label="Bold">
      <BoldIcon />
    </Toggle>
  );
}
