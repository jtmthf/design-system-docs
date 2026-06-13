"use client";

import { Label } from "@workspace/ui/components/label";
import { Switch } from "@workspace/ui/components/switch";

export default function SwitchWithLabel() {
  return (
    <Label>
      <Switch defaultChecked />
      Enable notifications
    </Label>
  );
}
