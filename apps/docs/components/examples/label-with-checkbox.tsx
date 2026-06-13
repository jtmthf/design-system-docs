"use client";

import { Checkbox } from "@workspace/ui/components/checkbox";
import { Label } from "@workspace/ui/components/label";

export default function LabelWithCheckbox() {
  return (
    <Label className="flex items-center gap-2">
      <Checkbox />
      Accept terms and conditions
    </Label>
  );
}
