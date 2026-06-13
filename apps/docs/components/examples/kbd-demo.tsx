"use client";

import { CommandIcon } from "lucide-react";

import { Kbd, KbdGroup } from "@workspace/ui/components/kbd";

export default function KbdDemo() {
  return (
    <KbdGroup>
      <Kbd>
        <CommandIcon />
      </Kbd>
      <Kbd>K</Kbd>
    </KbdGroup>
  );
}
