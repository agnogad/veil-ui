import type * as React from "react";

import { cn } from "@veil-ui/utils";

interface HeatmapProps extends React.ComponentProps<"div"> {
  data: number[][];
  rows: string[];
  columns: string[];
  max?: number;
  label?: string;
}

function Heatmap({
  className,
  data,
  rows,
  columns,
  max,
  label = "Heatmap",
  ...props
}: HeatmapProps) {
  const peak = max ?? Math.max(1, ...data.flat());

  return (
    <div data-slot="heatmap" className={cn("w-full overflow-x-auto", className)} {...props}>
      <table className="w-full border-collapse text-xs" aria-label={label}>
        <thead>
          <tr>
            <th scope="col" className="p-1.5" aria-hidden />
            {columns.map((column) => (
              <th
                key={column}
                scope="col"
                className="p-1.5 text-center font-normal text-muted-foreground"
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={row}>
              <th
                scope="row"
                className="whitespace-nowrap p-1.5 pr-3 text-left font-normal text-muted-foreground"
              >
                {row}
              </th>
              {columns.map((column, columnIndex) => {
                const value = data[rowIndex]?.[columnIndex] ?? 0;
                const ratio = Math.min(1, Math.max(0, value / peak));
                return (
                  <td key={column} className="p-1">
                    <div
                      role="img"
                      className="flex h-8 min-w-10 items-center justify-center rounded-sm border border-border/40 font-medium tabular-nums"
                      style={{
                        backgroundColor: `color-mix(in oklab, var(--primary) ${Math.round(
                          ratio * 85,
                        )}%, transparent)`,
                      }}
                      aria-label={`${row}, ${column}: ${value}`}
                    >
                      {value}
                    </div>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export { Heatmap };
