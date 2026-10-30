import { cva, type VariantProps } from "class-variance-authority";

export interface ChartConfigEntry {
  label: string;
  color?: string;
}

export type ChartConfig = Record<string, ChartConfigEntry>;

export const chartColors = [
  "#6366f1",
  "#22c55e",
  "#f59e0b",
  "#ef4444",
  "#06b6d4",
  "#a855f7",
  "#ec4899",
  "#14b8a6",
];

export function seriesColor(
  config: ChartConfig,
  key: string,
  index = 0,
): string {
  return config[key]?.color ?? chartColors[index % chartColors.length]!;
}

export const chartVariants = cva("w-full", {
  variants: {
    size: {
      sm: "max-w-sm",
      md: "max-w-xl",
      full: "",
    },
  },
  defaultVariants: { size: "full" },
});

export type ChartVariants = VariantProps<typeof chartVariants>;
