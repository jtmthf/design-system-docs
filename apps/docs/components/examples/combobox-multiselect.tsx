"use client";

import {
  Combobox,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  useComboboxAnchor,
} from "@workspace/ui/components/combobox";

const frameworks = [
  { value: "next", label: "Next.js" },
  { value: "sveltekit", label: "SvelteKit" },
  { value: "astro", label: "Astro" },
  { value: "nuxt", label: "Nuxt.js" },
  { value: "remix", label: "Remix" },
];

export default function ComboboxMultiselect() {
  const anchor = useComboboxAnchor();
  return (
    <Combobox multiple defaultValue={[]}>
      <ComboboxChips ref={anchor} className="w-72">
        <ComboboxChipsInput placeholder="Add framework..." />
      </ComboboxChips>
      <ComboboxContent anchor={anchor}>
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
