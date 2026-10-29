"use client";

import {
  CartesianGrid,
  Scatter,
  ScatterChart as RechartsScatterChart,
  XAxis,
  YAxis,
  ZAxis,
} from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  type ChartConfig,
} from "../chart/index";

interface ScatterPoint {
  x: number;
  y: number;
  z?: number;
}

interface ScatterChartProps {
  data: ScatterPoint[];
  height?: number;
  className?: string;
  xLabel?: string;
  yLabel?: string;
  color?: string;
  showGrid?: boolean;
  showTooltip?: boolean;
}

function ScatterChart({
  data,
  height = 300,
  className,
  xLabel = "x",
  yLabel = "y",
  color = "#6366f1",
  showGrid = true,
  showTooltip = true,
}: ScatterChartProps) {
  const config: ChartConfig = {
    series: { label: `${yLabel} vs ${xLabel}`, color },
  };

  return (
    <ChartContainer config={config} height={height} className={className}>
      <RechartsScatterChart margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
        {showGrid ? (
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
        ) : null}
        <XAxis
          type="number"
          dataKey="x"
          name={xLabel}
          tickLine={false}
          axisLine={false}
          tick={{ fontSize: 12 }}
        />
        <YAxis
          type="number"
          dataKey="y"
          name={yLabel}
          width={44}
          tickLine={false}
          axisLine={false}
          tick={{ fontSize: 12 }}
        />
        <ZAxis type="number" dataKey="z" range={[40, 160]} />
        {showTooltip ? <ChartTooltip /> : null}
        <Scatter data={data} fill={color} fillOpacity={0.7} />
      </RechartsScatterChart>
    </ChartContainer>
  );
}

export { ScatterChart, type ScatterPoint };
