import type { ChartConfig } from "../chart/index";
import { BarChart } from "./index";

const orders: ChartConfig = {
  fulfilled: { label: "Fulfilled", color: "#22c55e" },
  pending: { label: "Pending", color: "#f59e0b" },
};

const data = [
  { week: "W1", fulfilled: 320, pending: 45 },
  { week: "W2", fulfilled: 410, pending: 62 },
  { week: "W3", fulfilled: 380, pending: 38 },
  { week: "W4", fulfilled: 460, pending: 54 },
];

export function BarChartBasic() {
  return <BarChart data={data} config={orders} xKey="week" className="max-w-xl" />;
}

export function BarChartStacked() {
  return (
    <BarChart
      data={data}
      config={orders}
      xKey="week"
      stacked
      height={220}
      className="max-w-xl"
    />
  );
}
