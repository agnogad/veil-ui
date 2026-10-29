"use client";

import type * as React from "react";
import { CartesianGrid } from "recharts";

function ChartGrid(props: React.ComponentProps<typeof CartesianGrid>) {
  return (
    <CartesianGrid
      strokeDasharray="3 3"
      stroke="var(--border)"
      {...props}
    />
  );
}

export { ChartGrid };
