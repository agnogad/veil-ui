"use client";

import { PieChart } from "../pie-chart/index";
import type { PieDatum } from "../pie-chart/index";

interface DonutChartProps {
  data: PieDatum[];
  height?: number;
  className?: string;
  colors?: string[];
  showLegend?: boolean;
  showTooltip?: boolean;
  innerRadius?: number | string;
  outerRadius?: number | string;
}

function DonutChart({ innerRadius = "60%", ...props }: DonutChartProps) {
  return <PieChart innerRadius={innerRadius} {...props} />;
}

export { DonutChart };
