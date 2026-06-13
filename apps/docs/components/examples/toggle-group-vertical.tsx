"use client";

import { AlignCenterIcon, AlignLeftIcon, AlignRightIcon } from "lucide-react";

import {
  ToggleGroup,
  ToggleGroupItem,
} from "@workspace/ui/components/toggle-group";

export default function ToggleGroupVertical() {
  return (
    <ToggleGroup orientation="vertical" defaultValue={["left"]}>
      <ToggleGroupItem value="left" aria-label="Align left">
        <AlignLeftIcon />
      </ToggleGroupItem>
      <ToggleGroupItem value="center" aria-label="Align center">
        <AlignCenterIcon />
      </ToggleGroupItem>
      <ToggleGroupItem value="right" aria-label="Align right">
        <AlignRightIcon />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
