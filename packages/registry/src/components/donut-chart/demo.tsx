import { DonutChart } from "./index";

const storage = [
  { name: "Documents", value: 38 },
  { name: "Images", value: 27 },
  { name: "Video", value: 21 },
  { name: "Other", value: 14 },
];

export function DonutChartBasic() {
  return <DonutChart data={storage} className="max-w-md" />;
}

export function DonutChartThin() {
  return (
    <DonutChart
      data={storage}
      innerRadius="75%"
      height={240}
      className="max-w-sm"
    />
  );
}
