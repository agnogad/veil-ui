"use client";

import {
  CartesianGrid,
  Legend,
  Line as RechartsLine,
  LineChart as RechartsLineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import {
  ChartContainer,
  chartColors,
  type ChartConfig,
} from "../chart/index";

const data = [
  { month: "Jan", revenue: 4200, costs: 2400 },
  { month: "Feb", revenue: 5100, costs: 2800 },
  { month: "Mar", revenue: 4800, costs: 2600 },
  { month: "Apr", revenue: 6200, costs: 3100 },
  { month: "May", revenue: 7100, costs: 3400 },
  { month: "Jun", revenue: 6800, costs: 3200 },
];

const config: ChartConfig = {
  revenue: { label: "Revenue", color: chartColors[0] },
  costs: { label: "Costs", color: chartColors[1] },
};

export function ChartBasic() {
  return (
    <ChartContainer config={config}>
      <RechartsLineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="month" tickLine={false} axisLine={false} />
        <YAxis tickLine={false} axisLine={false} width={40} />
        <Tooltip />
        <Legend />
        <RechartsLine dataKey="revenue" stroke={chartColors[0]} dot={false} strokeWidth={2} />
        <RechartsLine dataKey="costs" stroke={chartColors[1]} dot={false} strokeWidth={2} />
      </RechartsLineChart>
    </ChartContainer>
  );
}

export function ChartCompact() {
  return (
    <ChartContainer config={config} height={180}>
      <RechartsLineChart data={data}>
        <XAxis dataKey="month" tickLine={false} axisLine={false} />
        <RechartsLine dataKey="revenue" stroke={chartColors[0]} dot={false} strokeWidth={2} />
      </RechartsLineChart>
    </ChartContainer>
  );
}
