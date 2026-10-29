import type * as React from "react";

import { cn } from "@veil-ui/utils";

interface CircularProgressProps extends React.ComponentProps<"div"> {
  value: number;
  size?: number;
  strokeWidth?: number;
  showValue?: boolean;
  label?: string;
}

function CircularProgress({
  value,
  size = 48,
  strokeWidth = 4,
  showValue = false,
  label = "Progress",
  className,
  ...props
}: CircularProgressProps) {
  const clamped = Math.min(100, Math.max(0, value));
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (clamped / 100) * circumference;

  return (
    <div
      data-slot="circular-progress"
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(clamped)}
      className={cn("relative inline-flex items-center justify-center", className)}
      style={{ width: size, height: size }}
      {...props}
    >
      <svg width={size} height={size} className="-rotate-90" aria-hidden>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          className="stroke-muted"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="stroke-primary transition-[stroke-dashoffset]"
        />
      </svg>
      {showValue ? (
        <span className="absolute text-xs font-medium">
          {Math.round(clamped)}%
        </span>
      ) : null}
    </div>
  );
}

export { CircularProgress };
export type { CircularProgressProps };
