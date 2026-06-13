"use client";

import {
  NativeSelect,
  NativeSelectOption,
} from "@workspace/ui/components/native-select";

export default function NativeSelectSizes() {
  return (
    <div className="flex flex-col gap-3">
      <NativeSelect size="default">
        <NativeSelectOption value="apple">Default size</NativeSelectOption>
        <NativeSelectOption value="banana">Banana</NativeSelectOption>
      </NativeSelect>
      <NativeSelect size="sm">
        <NativeSelectOption value="apple">Small size</NativeSelectOption>
        <NativeSelectOption value="banana">Banana</NativeSelectOption>
      </NativeSelect>
    </div>
  );
}
