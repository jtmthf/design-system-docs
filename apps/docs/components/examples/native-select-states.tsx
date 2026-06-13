"use client";

import { Label } from "@workspace/ui/components/label";
import {
  NativeSelect,
  NativeSelectOption,
} from "@workspace/ui/components/native-select";

export default function NativeSelectStates() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="disabled-select">Disabled</Label>
        <NativeSelect id="disabled-select" disabled defaultValue="apple">
          <NativeSelectOption value="apple">Apple</NativeSelectOption>
        </NativeSelect>
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="invalid-select">Invalid</Label>
        <NativeSelect id="invalid-select" aria-invalid defaultValue="">
          <NativeSelectOption value="">Choose…</NativeSelectOption>
          <NativeSelectOption value="apple">Apple</NativeSelectOption>
        </NativeSelect>
      </div>
    </div>
  );
}
