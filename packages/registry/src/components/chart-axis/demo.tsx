"use client";

import {
  Bar,
  BarChart as RechartsBarChart,
} from "recharts";

import { ChartContainer, ChartTooltip } from "../chart/index";
import { ChartXAxis, ChartYAxis } from "./index";

const config = {
  orders: { label: "Orders", color: "#6366f1" },
};

const data = [
  { day: "Mon", orders: 42 },
  { day: "Tue", orders: 58 },
  { day: "Wed", orders: 51 },
  { day: "Thu", orders: 66 },
  { day: "Fri", orders: 74 },
];

export function ChartAxisBasic() {
  return (
    <div className="w-full max-w-xl">
      <ChartContainer config={config}>
        <RechartsBarChart data={data}>
          <ChartXAxis dataKey="day" />
          <ChartYAxis />
          <ChartTooltip />
          <Bar dataKey="orders" fill="#6366f1" radius={[4, 4, 0, 0]} />
        </RechartsBarChart>
      </ChartContainer>
    </div>
  );
}

export function ChartAxisFormatted() {
  return (
    <div className="w-full max-w-md">
      <ChartContainer config={config} height={220}>
        <RechartsBarChart data={data}>
          <ChartXAxis dataKey="day" />
          <ChartYAxis tickFormatter={(value: number) => `${value}k`} />
          <Bar dataKey="orders" fill="#22c55e" radius={[4, 4, 0, 0]} />
        </RechartsBarChart>
      </ChartContainer>
    </div>
  );
}
