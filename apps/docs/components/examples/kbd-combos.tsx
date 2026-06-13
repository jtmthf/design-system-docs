"use client";

import { CommandIcon } from "lucide-react";

import { Kbd, KbdGroup } from "@workspace/ui/components/kbd";

export default function KbdCombos() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-4 text-sm">
        <span className="w-36 text-muted-foreground">Command palette</span>
        <KbdGroup>
          <Kbd>
            <CommandIcon />
          </Kbd>
          <Kbd>K</Kbd>
        </KbdGroup>
      </div>
      <div className="flex items-center gap-4 text-sm">
        <span className="w-36 text-muted-foreground">Save</span>
        <KbdGroup>
          <Kbd>
            <CommandIcon />
          </Kbd>
          <Kbd>S</Kbd>
        </KbdGroup>
      </div>
      <div className="flex items-center gap-4 text-sm">
        <span className="w-36 text-muted-foreground">Copy</span>
        <KbdGroup>
          <Kbd>
            <CommandIcon />
          </Kbd>
          <Kbd>C</Kbd>
        </KbdGroup>
      </div>
      <div className="flex items-center gap-4 text-sm">
        <span className="w-36 text-muted-foreground">Undo</span>
        <KbdGroup>
          <Kbd>
            <CommandIcon />
          </Kbd>
          <Kbd>Z</Kbd>
        </KbdGroup>
      </div>
    </div>
  );
}
