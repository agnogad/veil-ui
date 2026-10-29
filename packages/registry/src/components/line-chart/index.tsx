"use client";

import {
  CartesianGrid,
  Line,
  LineChart as RechartsLineChart,
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

interface LineChartProps {
  data: Array<Record<string, string | number>>;
  config: ChartConfig;
  xKey: string;
  series?: string[];
  height?: number;
  className?: string;
  showGrid?: boolean;
  showLegend?: boolean;
  showTooltip?: boolean;
}

function LineChart({
  data,
  config,
  xKey,
  series,
  height = 300,
  className,
  showGrid = true,
  showLegend = true,
  showTooltip = true,
}: LineChartProps) {
  const keys = series ?? Object.keys(config);

  return (
    <ChartContainer config={config} height={height} className={className}>
      <RechartsLineChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
        {showGrid ? (
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
        ) : null}
        <XAxis dataKey={xKey} tickLine={false} axisLine={false} tick={{ fontSize: 12 }} />
        <YAxis tickLine={false} axisLine={false} width={44} tick={{ fontSize: 12 }} />
        {showTooltip ? <ChartTooltip /> : null}
        {showLegend ? <ChartLegend /> : null}
        {keys.map((key, index) => (
          <Line
            key={key}
            type="monotone"
            dataKey={key}
            name={config[key]?.label ?? key}
            stroke={seriesColor(config, key, index)}
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4 }}
          />
        ))}
      </RechartsLineChart>
    </ChartContainer>
  );
}

export { LineChart };
