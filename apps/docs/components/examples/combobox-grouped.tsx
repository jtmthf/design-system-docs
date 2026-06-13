"use client";

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxLabel,
  ComboboxList,
  ComboboxSeparator,
} from "@workspace/ui/components/combobox";

export default function ComboboxGrouped() {
  return (
    <Combobox>
      <ComboboxInput
        placeholder="Select a language..."
        showTrigger
        className="w-56"
      />
      <ComboboxContent>
        <ComboboxList>
          <ComboboxEmpty>No language found.</ComboboxEmpty>
          <ComboboxGroup>
            <ComboboxLabel>Frontend</ComboboxLabel>
            <ComboboxItem value="typescript">TypeScript</ComboboxItem>
            <ComboboxItem value="javascript">JavaScript</ComboboxItem>
          </ComboboxGroup>
          <ComboboxSeparator />
          <ComboboxGroup>
            <ComboboxLabel>Backend</ComboboxLabel>
            <ComboboxItem value="rust">Rust</ComboboxItem>
            <ComboboxItem value="go">Go</ComboboxItem>
            <ComboboxItem value="python">Python</ComboboxItem>
          </ComboboxGroup>
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}
