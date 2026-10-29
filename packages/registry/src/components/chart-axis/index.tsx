"use client";

import type * as React from "react";
import { XAxis, YAxis } from "recharts";

function ChartXAxis(props: React.ComponentProps<typeof XAxis>) {
  return (
    <XAxis
      tickLine={false}
      axisLine={false}
      tick={{ fontSize: 12 }}
      {...props}
    />
  );
}

function ChartYAxis(props: React.ComponentProps<typeof YAxis>) {
  return (
    <YAxis
      tickLine={false}
      axisLine={false}
      width={44}
      tick={{ fontSize: 12 }}
      {...props}
    />
  );
}

export { ChartXAxis, ChartYAxis };
