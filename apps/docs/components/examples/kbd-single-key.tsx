"use client";

import { Kbd } from "@workspace/ui/components/kbd";

export default function KbdSingleKey() {
  return (
    <div className="flex items-center gap-2">
      <Kbd>Enter</Kbd>
      <Kbd>Tab</Kbd>
      <Kbd>Esc</Kbd>
      <Kbd>⇧</Kbd>
      <Kbd>⌥</Kbd>
      <Kbd>Ctrl</Kbd>
    </div>
  );
}
