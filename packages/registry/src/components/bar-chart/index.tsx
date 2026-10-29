"use client";

import {
  Bar,
  BarChart as RechartsBarChart,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";

import {
  ChartContainer,
  ChartLegend,
  ChartTooltip,
  seriesColor,
  type ChartConfig,
} from "../chart/index";

interface BarChartProps {
  data: Array<Record<string, string | number>>;
  config: ChartConfig;
  xKey: string;
  series?: string[];
  height?: number;
  className?: string;
  showGrid?: boolean;
  showLegend?: boolean;
  showTooltip?: boolean;
  stacked?: boolean;
}

function BarChart({
  data,
  config,
  xKey,
  series,
  height = 300,
  className,
  showGrid = true,
  showLegend = true,
  showTooltip = true,
  stacked = false,
}: BarChartProps) {
  const keys = series ?? Object.keys(config);

  return (
    <ChartContainer config={config} height={height} className={className}>
      <RechartsBarChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
        {showGrid ? (
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
        ) : null}
        <XAxis dataKey={xKey} tickLine={false} axisLine={false} tick={{ fontSize: 12 }} />
        <YAxis tickLine={false} axisLine={false} width={44} tick={{ fontSize: 12 }} />
        {showTooltip ? <ChartTooltip /> : null}
        {showLegend ? <ChartLegend /> : null}
        {keys.map((key, index) => (
          <Bar
            key={key}
            dataKey={key}
            name={config[key]?.label ?? key}
            fill={seriesColor(config, key, index)}
            radius={[4, 4, 0, 0]}
            stackId={stacked ? "stack" : undefined}
          />
        ))}
      </RechartsBarChart>
    </ChartContainer>
  );
}

export { BarChart };
