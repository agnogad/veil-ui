"use client";

import { createContext, useContext } from "react";
import type * as React from "react";
import {
  Legend,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import { cn } from "@veil-ui/utils";

interface ChartConfigEntry {
  label: string;
  color?: string;
}

type ChartConfig = Record<string, ChartConfigEntry>;

const chartColors = [
  "#6366f1",
  "#22c55e",
  "#f59e0b",
  "#ef4444",
  "#06b6d4",
  "#a855f7",
  "#ec4899",
  "#14b8a6",
];

function seriesColor(config: ChartConfig, key: string, index = 0) {
  return config[key]?.color ?? chartColors[index % chartColors.length];
}

const ChartContext = createContext<ChartConfig>({});

function useChart() {
  return useContext(ChartContext);
}

interface ChartContainerProps {
  config: ChartConfig;
  className?: string;
  height?: number;
  children: React.ReactElement;
}

function ChartContainer({
  config,
  className,
  height = 300,
  children,
}: ChartContainerProps) {
  return (
    <ChartContext.Provider value={config}>
      <div
        data-slot="chart"
        className={cn("w-full", className)}
        style={{ height }}
      >
        <ResponsiveContainer
          width="100%"
          height="100%"
          initialDimension={{ width: 600, height }}
        >
          {children}
        </ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  );
}

interface TooltipPayloadItem {
  dataKey?: string | number;
  name?: string;
  value?: string | number;
  color?: string;
  payload?: Record<string, unknown>;
}

interface ChartTooltipContentProps {
  active?: boolean;
  payload?: TooltipPayloadItem[];
  label?: string | number;
  hideLabel?: boolean;
}

function ChartTooltipContent({
  active,
  payload,
  label,
  hideLabel = false,
}: ChartTooltipContentProps) {
  const config = useChart();
  if (!active || !payload?.length) return null;

  return (
    <div className="grid min-w-32 gap-1.5 rounded-md border bg-popover px-2.5 py-2 text-xs text-popover-foreground shadow-md">
      {!hideLabel && label !== undefined ? (
        <p className="font-medium">{label}</p>
      ) : null}
      {payload.map((item, index) => {
        const key = String(item.dataKey ?? item.name ?? index);
        return (
          <div key={key} className="flex items-center gap-2">
            <span
              className="size-2 shrink-0 rounded-[2px]"
              style={{ backgroundColor: item.color ?? seriesColor(config, key, index) }}
              aria-hidden
            />
            <span className="text-muted-foreground">
              {config[key]?.label ?? item.name ?? key}
            </span>
            <span className="ml-auto font-medium tabular-nums">
              {typeof item.value === "number"
                ? item.value.toLocaleString()
                : item.value}
            </span>
          </div>
        );
      })}
    </div>
  );
}

interface ChartLegendItem {
  value?: string | number;
  dataKey?: string | number;
  color?: string;
  payload?: { value?: string | number; dataKey?: string | number };
}

interface ChartLegendContentProps {
  payload?: ChartLegendItem[];
}

function ChartLegendContent({ payload }: ChartLegendContentProps) {
  const config = useChart();
  if (!payload?.length) return null;

  return (
    <ul className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 pt-2 text-xs">
      {payload.map((item, index) => {
        const key = String(
          item.dataKey ?? item.payload?.dataKey ?? item.value ?? index,
        );
        return (
          <li key={key} className="flex items-center gap-1.5">
            <span
              className="size-2 rounded-[2px]"
              style={{
                backgroundColor: item.color ?? seriesColor(config, key, index),
              }}
              aria-hidden
            />
            <span className="text-muted-foreground">
              {config[key]?.label ?? item.value ?? key}
            </span>
          </li>
        );
      })}
    </ul>
  );
}

function ChartTooltip(props: React.ComponentProps<typeof Tooltip>) {
  return (
    <Tooltip
      cursor={false}
      content={<ChartTooltipContent />}
      {...props}
    />
  );
}

function ChartLegend(props: React.ComponentProps<typeof Legend>) {
  return <Legend content={<ChartLegendContent />} {...props} />;
}

export {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  chartColors,
  seriesColor,
  useChart,
  type ChartConfig,
  type ChartConfigEntry,
};
