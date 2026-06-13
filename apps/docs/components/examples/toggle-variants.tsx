"use client";

import { BoldIcon, ItalicIcon } from "lucide-react";

import { Toggle } from "@workspace/ui/components/toggle";

export default function ToggleVariants() {
  return (
    <div className="flex items-center gap-2">
      <Toggle aria-label="Bold">
        <BoldIcon />
      </Toggle>
      <Toggle variant="outline" aria-label="Italic">
        <ItalicIcon />
      </Toggle>
    </div>
  );
}
