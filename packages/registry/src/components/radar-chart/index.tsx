"use client";

import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart as RechartsRadarChart,
} from "recharts";

import {
  ChartContainer,
  ChartLegend,
  ChartTooltip,
  seriesColor,
  type ChartConfig,
} from "../chart/index";

interface RadarChartProps {
  data: Array<Record<string, string | number>>;
  config: ChartConfig;
  angleKey: string;
  series?: string[];
  height?: number;
  className?: string;
  showLegend?: boolean;
  showTooltip?: boolean;
}

function RadarChart({
  data,
  config,
  angleKey,
  series,
  height = 300,
  className,
  showLegend = true,
  showTooltip = true,
}: RadarChartProps) {
  const keys = series ?? Object.keys(config);

  return (
    <ChartContainer config={config} height={height} className={className}>
      <RechartsRadarChart data={data} outerRadius="72%">
        <PolarGrid stroke="var(--border)" />
        <PolarAngleAxis dataKey={angleKey} tick={{ fontSize: 12 }} />
        <PolarRadiusAxis tick={false} axisLine={false} />
        {showTooltip ? <ChartTooltip /> : null}
        {showLegend ? <ChartLegend /> : null}
        {keys.map((key, index) => {
          const color = seriesColor(config, key, index);
          return (
            <Radar
              key={key}
              dataKey={key}
              name={config[key]?.label ?? key}
              stroke={color}
              fill={color}
              fillOpacity={0.2}
            />
          );
        })}
      </RechartsRadarChart>
    </ChartContainer>
  );
}

export { RadarChart };
