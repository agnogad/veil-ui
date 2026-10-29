import type { ChartConfig } from "../chart/index";
import { LineChart } from "../line-chart/index";

const config: ChartConfig = {
  revenue: { label: "Revenue", color: "#6366f1" },
  costs: { label: "Costs", color: "#f59e0b" },
};

const data = [
  { month: "Jan", revenue: 4200, costs: 2400 },
  { month: "Feb", revenue: 5100, costs: 2800 },
  { month: "Mar", revenue: 4800, costs: 2600 },
  { month: "Apr", revenue: 6200, costs: 3100 },
];

export function ChartTooltipBasic() {
  return (
    <LineChart data={data} config={config} xKey="month" className="max-w-xl" />
  );
}

export function ChartTooltipCompact() {
  return (
    <LineChart
      data={data}
      config={config}
      xKey="month"
      height={200}
      showLegend={false}
      className="max-w-md"
    />
  );
}
