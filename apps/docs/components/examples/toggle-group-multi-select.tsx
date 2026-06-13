"use client";

import { BoldIcon, ItalicIcon, UnderlineIcon } from "lucide-react";

import {
  ToggleGroup,
  ToggleGroupItem,
} from "@workspace/ui/components/toggle-group";

export default function ToggleGroupMultiSelect() {
  return (
    <ToggleGroup multiple>
      <ToggleGroupItem value="bold" aria-label="Bold">
        <BoldIcon />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Italic">
        <ItalicIcon />
      </ToggleGroupItem>
      <ToggleGroupItem value="underline" aria-label="Underline">
        <UnderlineIcon />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
