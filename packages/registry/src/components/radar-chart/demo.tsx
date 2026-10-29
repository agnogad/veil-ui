import type { ChartConfig } from "../chart/index";
import { RadarChart } from "./index";

const skills: ChartConfig = {
  planning: { label: "Planning", color: "#6366f1" },
  execution: { label: "Execution", color: "#22c55e" },
};

const data = [
  { area: "Discovery", planning: 4, execution: 3 },
  { area: "Design", planning: 3, execution: 5 },
  { area: "Build", planning: 4, execution: 4 },
  { area: "Launch", planning: 5, execution: 3 },
  { area: "Support", planning: 3, execution: 4 },
];

export function RadarChartBasic() {
  return (
    <RadarChart
      data={data}
      config={skills}
      angleKey="area"
      className="max-w-md"
    />
  );
}

export function RadarChartSingle() {
  return (
    <RadarChart
      data={data}
      config={skills}
      angleKey="area"
      series={["execution"]}
      height={240}
      className="max-w-sm"
    />
  );
}
