"use client";

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@workspace/ui/components/combobox";

const frameworks = [
  { value: "next", label: "Next.js" },
  { value: "sveltekit", label: "SvelteKit" },
  { value: "astro", label: "Astro" },
  { value: "nuxt", label: "Nuxt.js" },
  { value: "remix", label: "Remix" },
];

export default function ComboboxDemo() {
  return (
    <Combobox>
      <ComboboxInput
        placeholder="Select framework..."
        showTrigger
        className="w-52"
      />
      <ComboboxContent>
        <ComboboxList>
          <ComboboxEmpty>No framework found.</ComboboxEmpty>
          {frameworks.map((fw) => (
            <ComboboxItem key={fw.value} value={fw.value}>
              {fw.label}
            </ComboboxItem>
          ))}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}
