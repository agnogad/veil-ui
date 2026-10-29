import { PieChart } from "./index";

const channels = [
  { name: "Organic", value: 4200 },
  { name: "Referral", value: 2600 },
  { name: "Paid", value: 1800 },
  { name: "Social", value: 1400 },
];

export function PieChartBasic() {
  return <PieChart data={channels} className="max-w-md" />;
}

export function PieChartLabels() {
  return <PieChart data={channels} showLabels className="max-w-md" />;
}
