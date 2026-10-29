import type { ChartConfig } from "../chart/index";
import { AreaChart } from "./index";

const sessions: ChartConfig = {
  desktop: { label: "Desktop", color: "#6366f1" },
  mobile: { label: "Mobile", color: "#06b6d4" },
};

const data = [
  { hour: "00", desktop: 120, mobile: 80 },
  { hour: "06", desktop: 240, mobile: 310 },
  { hour: "12", desktop: 520, mobile: 610 },
  { hour: "18", desktop: 610, mobile: 720 },
  { hour: "24", desktop: 280, mobile: 390 },
];

export function AreaChartBasic() {
  return <AreaChart data={data} config={sessions} xKey="hour" className="max-w-xl" />;
}

export function AreaChartStacked() {
  return (
    <AreaChart
      data={data}
      config={sessions}
      xKey="hour"
      stacked
      height={220}
      className="max-w-xl"
    />
  );
}
