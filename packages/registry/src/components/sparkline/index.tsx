import { cn } from "@veil-ui/utils";

interface SparklineProps {
  data: number[];
  width?: number;
  height?: number;
  color?: string;
  label?: string;
  className?: string;
  showArea?: boolean;
}

function Sparkline({
  data,
  width = 120,
  height = 32,
  color = "currentColor",
  label = "Trend sparkline",
  className,
  showArea = false,
}: SparklineProps) {
  if (data.length === 0) {
    return <span className={cn("text-xs text-muted-foreground", className)}>No data</span>;
  }

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const step = data.length > 1 ? width / (data.length - 1) : 0;

  const points = data.map((value, index) => {
    const x = index * step;
    const y = height - 2 - ((value - min) / range) * (height - 4);
    return `${x},${y}`;
  });

  const line = `M ${points.join(" L ")}`;
  const area = `${line} L ${width},${height} L 0,${height} Z`;

  return (
    <svg
      role="img"
      aria-label={label}
      viewBox={`0 0 ${width} ${height}`}
      className={cn("h-8 w-auto", className)}
      style={{ color }}
    >
      {showArea ? (
        <path d={area} fill="currentColor" fillOpacity={0.15} stroke="none" />
      ) : null}
      <path
        d={line}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export { Sparkline };
