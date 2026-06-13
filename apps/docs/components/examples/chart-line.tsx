"use client";

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@workspace/ui/components/chart";

const data = [
  { month: "Jan", visitors: 4200 },
  { month: "Feb", visitors: 3800 },
  { month: "Mar", visitors: 5100 },
  { month: "Apr", visitors: 4700 },
  { month: "May", visitors: 6300 },
  { month: "Jun", visitors: 5900 },
];

const config = {
  visitors: { label: "Visitors", color: "var(--color-chart-1)" },
} satisfies ChartConfig;

export default function ChartLine() {
  return (
    <ChartContainer config={config} className="w-full max-w-lg">
      <LineChart data={data}>
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
  );
}
