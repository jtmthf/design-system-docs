"use client";

import { Label } from "@workspace/ui/components/label";
import { RadioGroup, RadioGroupItem } from "@workspace/ui/components/radio-group";

export default function RadioGroupDisabled() {
  return (
    <RadioGroup disabled defaultValue="comfortable">
      <Label className="flex items-center gap-2">
        <RadioGroupItem value="comfortable" />
        Comfortable
      </Label>
      <Label className="flex items-center gap-2">
        <RadioGroupItem value="compact" />
        Compact
      </Label>
      <Label className="flex items-center gap-2">
        <RadioGroupItem value="spacious" />
        Spacious
      </Label>
    </RadioGroup>
  );
}
