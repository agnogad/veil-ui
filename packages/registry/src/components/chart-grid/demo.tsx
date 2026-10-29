"use client";

import {
  Line,
  LineChart as RechartsLineChart,
} from "recharts";

import { ChartContainer, ChartTooltip } from "../chart/index";
import { ChartGrid } from "./index";

const config = {
  active: { label: "Active users", color: "#6366f1" },
};

const data = [
  { week: "W1", active: 320 },
  { week: "W2", active: 410 },
  { week: "W3", active: 380 },
  { week: "W4", active: 460 },
];

export function ChartGridBasic() {
  return (
    <div className="w-full max-w-xl">
      <ChartContainer config={config}>
        <RechartsLineChart data={data}>
          <ChartGrid />
          <Line
            type="monotone"
            dataKey="active"
            stroke="#6366f1"
            strokeWidth={2}
            dot={false}
          />
          <ChartTooltip />
        </RechartsLineChart>
      </ChartContainer>
    </div>
  );
}

export function ChartGridVertical() {
  return (
    <div className="w-full max-w-md">
      <ChartContainer config={config} height={220}>
        <RechartsLineChart data={data}>
          <ChartGrid vertical />
          <Line
            type="monotone"
            dataKey="active"
            stroke="#22c55e"
            strokeWidth={2}
            dot={false}
          />
        </RechartsLineChart>
      </ChartContainer>
    </div>
  );
}
