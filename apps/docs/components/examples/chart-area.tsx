"use client";

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@workspace/ui/components/chart";

const data = [
  { month: "Jan", revenue: 12000, expenses: 8000 },
  { month: "Feb", revenue: 14500, expenses: 9200 },
  { month: "Mar", revenue: 11800, expenses: 8700 },
  { month: "Apr", revenue: 16200, expenses: 10100 },
  { month: "May", revenue: 18900, expenses: 11300 },
  { month: "Jun", revenue: 17400, expenses: 10800 },
];

const config = {
  revenue: { label: "Revenue", color: "var(--color-chart-1)" },
  expenses: { label: "Expenses", color: "var(--color-chart-2)" },
} satisfies ChartConfig;

export default function ChartArea() {
  return (
    <ChartContainer config={config} className="w-full max-w-lg">
      <AreaChart data={data}>
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
  );
}
