import { cn } from "@veil-ui/utils";

import { chartColors } from "../chart/index";

interface ChartLegendItem {
  label: string;
  color?: string;
}

interface ChartLegendProps {
  items: ChartLegendItem[];
  label?: string;
  className?: string;
}

function ChartLegend({
  items,
  label = "Legend",
  className,
}: ChartLegendProps) {
  return (
    <ul
      data-slot="chart-legend"
      aria-label={label}
      className={cn("flex flex-wrap items-center gap-x-4 gap-y-1 text-xs", className)}
    >
      {items.map((item, index) => (
        <li key={item.label} className="flex items-center gap-1.5">
          <span
            className="size-2 rounded-[2px]"
            style={{ backgroundColor: item.color ?? chartColors[index % chartColors.length] }}
            aria-hidden
          />
          <span className="text-muted-foreground">{item.label}</span>
        </li>
      ))}
    </ul>
  );
}

export { ChartLegend, type ChartLegendItem };
