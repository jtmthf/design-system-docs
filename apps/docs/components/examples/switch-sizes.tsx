"use client";

import { Label } from "@workspace/ui/components/label";
import { Switch } from "@workspace/ui/components/switch";

export default function SwitchSizes() {
  return (
    <div className="flex items-center gap-6">
      <Label>
        <Switch defaultChecked />
        Default
      </Label>
      <Label>
        <Switch size="sm" defaultChecked />
        Small
      </Label>
    </div>
  );
}
