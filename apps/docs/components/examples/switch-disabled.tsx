"use client";

import { Label } from "@workspace/ui/components/label";
import { Switch } from "@workspace/ui/components/switch";

export default function SwitchDisabled() {
  return (
    <div className="flex items-center gap-6">
      <Label>
        <Switch disabled />
        Off (disabled)
      </Label>
      <Label>
        <Switch disabled defaultChecked />
        On (disabled)
      </Label>
    </div>
  );
}
