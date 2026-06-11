import type { Meta, StoryObj } from "@storybook/react-vite"
import * as React from "react"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
  Area,
  AreaChart,
} from "recharts"

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "#components/chart"

/**
 * A recharts wrapper that injects design-system tokens (colors, grid styles,
 * tooltip) via `ChartContainer` and `ChartConfig`. Use `ChartTooltip` and
 * `ChartLegend` for consistent styling across chart types.
 */
const meta = {
  component: ChartContainer,
  tags: ["ai-generated"],
  args: {
    config: {},
    children: <BarChart data={[]} />,
  },
  argTypes: {
    config: {
      description:
        "Map of series keys to labels, colors, or per-theme colors. Drives CSS custom properties consumed by recharts.",
      control: false,
      table: { category: "Appearance" },
    },
    initialDimension: {
      description:
        "SSR / initial render dimensions passed to `ResponsiveContainer` before the DOM is measured.",
      control: false,
      table: { category: "Appearance" },
    },
    className: {
      description: "Additional Tailwind classes applied to the chart wrapper.",
      control: "text",
      table: { category: "HTML" },
    },
  },
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof ChartContainer>

export default meta
type Story = StoryObj<typeof meta>

// ---------------------------------------------------------------------------
// Bar chart
// ---------------------------------------------------------------------------

const barData = [
  { month: "Jan", desktop: 186, mobile: 80 },
  { month: "Feb", desktop: 305, mobile: 200 },
  { month: "Mar", desktop: 237, mobile: 120 },
  { month: "Apr", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "Jun", desktop: 214, mobile: 140 },
]

const barConfig = {
  desktop: { label: "Desktop", color: "var(--color-chart-1)" },
  mobile: { label: "Mobile", color: "var(--color-chart-2)" },
} satisfies ChartConfig

/**
 * Grouped bar chart comparing two series month-by-month. Includes a tooltip
 * and a legend rendered below the chart.
 */
export const BarChartStory: Story = {
  name: "Bar Chart",
  render: () => (
    <ChartContainer config={barConfig} className="w-[480px]">
      <BarChart data={barData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <YAxis tickLine={false} axisLine={false} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
        <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
      </BarChart>
    </ChartContainer>
  ),
}

// ---------------------------------------------------------------------------
// Line chart
// ---------------------------------------------------------------------------

const lineData = [
  { month: "Jan", visitors: 4200 },
  { month: "Feb", visitors: 3800 },
  { month: "Mar", visitors: 5100 },
  { month: "Apr", visitors: 4700 },
  { month: "May", visitors: 6300 },
  { month: "Jun", visitors: 5900 },
]

const lineConfig = {
  visitors: { label: "Visitors", color: "var(--color-chart-1)" },
} satisfies ChartConfig

/**
 * Single-series line chart with a dot-style tooltip. Suitable for tracking
 * a single metric over time.
 */
export const LineChartStory: Story = {
  name: "Line Chart",
  render: () => (
    <ChartContainer config={lineConfig} className="w-[480px]">
      <LineChart data={lineData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <YAxis tickLine={false} axisLine={false} />
        <ChartTooltip content={<ChartTooltipContent indicator="dot" />} />
        <Line
          type="monotone"
          dataKey="visitors"
          stroke="var(--color-visitors)"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ChartContainer>
  ),
}

// ---------------------------------------------------------------------------
// Area chart
// ---------------------------------------------------------------------------

const areaData = [
  { month: "Jan", revenue: 12000, expenses: 8000 },
  { month: "Feb", revenue: 14500, expenses: 9200 },
  { month: "Mar", revenue: 11800, expenses: 8700 },
  { month: "Apr", revenue: 16200, expenses: 10100 },
  { month: "May", revenue: 18900, expenses: 11300 },
  { month: "Jun", revenue: 17400, expenses: 10800 },
]

const areaConfig = {
  revenue: { label: "Revenue", color: "var(--color-chart-1)" },
  expenses: { label: "Expenses", color: "var(--color-chart-2)" },
} satisfies ChartConfig

/**
 * Stacked area chart comparing revenue against expenses. The gradient fill
 * makes it easy to see total volume as well as the gap between series.
 */
export const AreaChartStory: Story = {
  name: "Area Chart",
  render: () => (
    <ChartContainer config={areaConfig} className="w-[480px]">
      <AreaChart data={areaData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <YAxis tickLine={false} axisLine={false} />
        <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Area
          type="monotone"
          dataKey="revenue"
          stroke="var(--color-revenue)"
          fill="var(--color-revenue)"
          fillOpacity={0.2}
          strokeWidth={2}
        />
        <Area
          type="monotone"
          dataKey="expenses"
          stroke="var(--color-expenses)"
          fill="var(--color-expenses)"
          fillOpacity={0.2}
          strokeWidth={2}
        />
      </AreaChart>
    </ChartContainer>
  ),
}
