import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, screen, waitFor, within } from "storybook/test"

import {
  Combobox,
  ComboboxInput,
  ComboboxContent,
  ComboboxList,
  ComboboxItem,
  ComboboxGroup,
  ComboboxLabel,
  ComboboxEmpty,
  ComboboxSeparator,
  ComboboxChips,
  ComboboxChipsInput,
  useComboboxAnchor,
} from "#components/combobox"

/**
 * An accessible combobox (autocomplete) built on Base UI. Combines a text
 * input with a filterable dropdown list. Supports single selection,
 * multi-select chips, and grouped options.
 */
const meta = {
  component: Combobox,
  tags: ["ai-generated"],
  argTypes: {
    value: {
      description: "Controlled selected value.",
      control: false,
      table: { category: "State" },
    },
    defaultValue: {
      description: "Initial selected value (uncontrolled).",
      control: "text",
      table: { category: "State" },
    },
    disabled: {
      description: "Disables the entire combobox.",
      control: "boolean",
      table: { category: "State" },
    },
    readOnly: {
      description: "Makes the combobox read-only.",
      control: "boolean",
      table: { category: "State" },
    },
    onValueChange: {
      description: "Fired when the selected value changes.",
      action: "valueChanged",
      table: { category: "Events" },
    },
  },
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Combobox>

export default meta
type Story = StoryObj<typeof meta>

// ---------------------------------------------------------------------------
// Shared data
// ---------------------------------------------------------------------------

const frameworks = [
  { value: "next", label: "Next.js" },
  { value: "sveltekit", label: "SvelteKit" },
  { value: "astro", label: "Astro" },
  { value: "nuxt", label: "Nuxt.js" },
  { value: "remix", label: "Remix" },
]

// ---------------------------------------------------------------------------
// Stories
// ---------------------------------------------------------------------------

/**
 * Standard single-select combobox. Type to filter the list; press Enter or
 * click an item to select it. A chevron trigger button toggles the popup.
 */
export const Default: Story = {
  render: (args) => (
    <Combobox {...args}>
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
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // Open the dropdown by clicking the input
    const input = canvas.getByRole("combobox")
    input.click()

    // Wait for the listbox to appear
    await waitFor(
      () => expect(screen.getByRole("listbox")).toBeVisible(),
      { timeout: 3000 }
    )

    // Select "Astro"
    const astroOption = screen.getByRole("option", { name: /astro/i })
    astroOption.click()

    // The input should now reflect the selection
    await waitFor(() =>
      expect(input).toHaveValue("Astro")
    )
  },
}

/**
 * Combobox with a clear (×) button — useful when the selection needs to be
 * reset without reopening the dropdown.
 */
export const WithClear: Story = {
  args: {
    defaultValue: "next",
  },
  render: (args) => (
    <Combobox {...args}>
      <ComboboxInput
        placeholder="Select framework..."
        showTrigger
        showClear
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
  ),
}

/**
 * Grouped options separated by a labeled section header and a visual divider.
 * Use groups when the option list spans multiple logical categories.
 */
export const Grouped: Story = {
  render: (args) => (
    <Combobox {...args}>
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
  ),
}

/**
 * Multi-select combobox that renders selected values as removable chip tags
 * inline with the input. Requires `multiple` on `Combobox` and the
 * `ComboboxChips` / `ComboboxChip` / `ComboboxChipsInput` sub-components.
 */
const MultiSelectExample = () => {
  const anchorRef = useComboboxAnchor()
  return (
    <Combobox multiple defaultValue={[]}>
      <ComboboxChips ref={anchorRef} className="w-72">
        <ComboboxChipsInput placeholder="Add framework..." />
      </ComboboxChips>
      <ComboboxContent anchor={anchorRef}>
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
  )
}

export const MultiSelect: Story = {
  render: () => <MultiSelectExample />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByRole("combobox")
    input.click()

    await waitFor(
      () => expect(screen.getByRole("listbox")).toBeVisible(),
      { timeout: 3000 }
    )

    // Select two options
    screen.getByRole("option", { name: /next\.js/i }).click()
    screen.getByRole("option", { name: /remix/i }).click()

    // Two chip elements should now be present in the chips container
    await waitFor(() => {
      const chips = canvasElement.querySelectorAll("[data-slot='combobox-chip']")
      expect(chips.length).toBeGreaterThanOrEqual(2)
    })
  },
}
