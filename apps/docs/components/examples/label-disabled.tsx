"use client";

import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";

export default function LabelDisabled() {
  return (
    <div className="grid w-full max-w-sm gap-2">
      <Label htmlFor="disabled-input">Username</Label>
      <Input id="disabled-input" disabled value="ada_lovelace" />
    </div>
  );
}
