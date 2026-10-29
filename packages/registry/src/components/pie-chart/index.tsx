"use client";

import { Cell, Pie, PieChart as RechartsPieChart } from "recharts";

import {
  ChartContainer,
  ChartLegend,
  ChartTooltip,
  chartColors,
  type ChartConfig,
} from "../chart/index";

interface PieDatum {
  name: string;
  value: number;
}

interface PieChartProps {
  data: PieDatum[];
  height?: number;
  className?: string;
  colors?: string[];
  showLegend?: boolean;
  showTooltip?: boolean;
  showLabels?: boolean;
  innerRadius?: number | string;
  outerRadius?: number | string;
}

function PieChart({
  data,
  height = 300,
  className,
  colors = chartColors,
  showLegend = true,
  showTooltip = true,
  showLabels = false,
  innerRadius = 0,
  outerRadius = "80%",
}: PieChartProps) {
  const config: ChartConfig = Object.fromEntries(
    data.map((item, index) => [
      item.name,
      { label: item.name, color: colors[index % colors.length] },
    ]),
  );

  return (
    <ChartContainer config={config} height={height} className={className}>
      <RechartsPieChart>
        {showTooltip ? <ChartTooltip /> : null}
        {showLegend ? <ChartLegend /> : null}
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          paddingAngle={2}
          label={showLabels}
        >
          {data.map((entry, index) => (
            <Cell
              key={entry.name}
              fill={colors[index % colors.length]}
              stroke="var(--background)"
            />
          ))}
        </Pie>
      </RechartsPieChart>
    </ChartContainer>
  );
}

export { PieChart, type PieDatum };
