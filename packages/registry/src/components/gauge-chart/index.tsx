import { cn } from "@veil-ui/utils";

interface GaugeChartProps {
  value: number;
  max?: number;
  label?: string;
  height?: number;
  className?: string;
  color?: string;
}

function GaugeChart({
  value,
  max = 100,
  label = "Gauge",
  height = 140,
  className,
  color = "var(--primary)",
}: GaugeChartProps) {
  const ratio = max <= 0 ? 0 : Math.min(1, Math.max(0, value / max));
  const display = Math.round(ratio * 100);

  return (
    <figure
      data-slot="gauge-chart"
      className={cn("flex w-full max-w-xs flex-col items-center", className)}
    >
      <svg
        role="img"
        aria-label={`${label}: ${value} of ${max} (${display}%)`}
        viewBox="0 0 200 120"
        style={{ height }}
        className="w-full"
      >
        <path
          d="M 20 100 A 80 80 0 0 1 180 100"
          pathLength={100}
          fill="none"
          stroke="var(--muted)"
          strokeWidth={14}
          strokeLinecap="round"
        />
        <path
          d="M 20 100 A 80 80 0 0 1 180 100"
          pathLength={100}
          fill="none"
          stroke={color}
          strokeWidth={14}
          strokeLinecap="round"
          strokeDasharray={`${display} 100`}
          className="transition-all duration-500"
        />
        <text
          x="100"
          y="82"
          textAnchor="middle"
          className="fill-foreground text-2xl font-semibold"
          style={{ fill: "currentColor" }}
        >
          {display}%
        </text>
        <text
          x="100"
          y="104"
          textAnchor="middle"
          className="fill-muted-foreground text-[11px]"
          style={{ fill: "currentColor" }}
        >
          {label}
        </text>
      </svg>
      <figcaption className="text-xs text-muted-foreground">
        {value} of {max}
      </figcaption>
    </figure>
  );
}

export { GaugeChart };
