"use client";

import { Checkbox } from "@workspace/ui/components/checkbox";
import { Label } from "@workspace/ui/components/label";

export default function CheckboxStates() {
  return (
    <div className="flex flex-col gap-3">
      <Label className="flex items-center gap-2">
        <Checkbox />
        Unchecked
      </Label>
      <Label className="flex items-center gap-2">
        <Checkbox defaultChecked />
        Checked
      </Label>
      <Label className="flex items-center gap-2 opacity-50">
        <Checkbox disabled />
        Disabled
      </Label>
      <Label className="flex items-center gap-2">
        <Checkbox aria-invalid />
        Invalid
      </Label>
    </div>
  );
}
