import { GaugeChart } from "./index";

export function GaugeChartBasic() {
  return <GaugeChart value={68} label="CPU load" />;
}

export function GaugeChartComplete() {
  return (
    <GaugeChart
      value={92}
      max={100}
      label="Storage"
      color="#22c55e"
    />
  );
}
