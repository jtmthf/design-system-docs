"use client";

import {
  NativeSelect,
  NativeSelectOption,
} from "@workspace/ui/components/native-select";

export default function NativeSelectDemo() {
  return (
    <NativeSelect className="w-full max-w-xs">
      <NativeSelectOption value="">Choose a fruit…</NativeSelectOption>
      <NativeSelectOption value="apple">Apple</NativeSelectOption>
      <NativeSelectOption value="banana">Banana</NativeSelectOption>
      <NativeSelectOption value="cherry">Cherry</NativeSelectOption>
    </NativeSelect>
  );
}
