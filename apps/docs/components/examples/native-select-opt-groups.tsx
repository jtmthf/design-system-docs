"use client";

import {
  NativeSelect,
  NativeSelectOptGroup,
  NativeSelectOption,
} from "@workspace/ui/components/native-select";

export default function NativeSelectOptGroups() {
  return (
    <NativeSelect className="w-full max-w-xs">
      <NativeSelectOptGroup label="Fruits">
        <NativeSelectOption value="apple">Apple</NativeSelectOption>
        <NativeSelectOption value="banana">Banana</NativeSelectOption>
      </NativeSelectOptGroup>
      <NativeSelectOptGroup label="Vegetables">
        <NativeSelectOption value="carrot">Carrot</NativeSelectOption>
        <NativeSelectOption value="broccoli">Broccoli</NativeSelectOption>
      </NativeSelectOptGroup>
    </NativeSelect>
  );
}
