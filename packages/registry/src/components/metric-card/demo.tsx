import { MetricCard } from "./index";

export function MetricCardBasic() {
  return (
    <MetricCard
      label="Monthly revenue"
      value="$18,240"
      current={18240}
      target={25000}
      description="$6,760 remaining to reach the quarterly target."
    />
  );
}

export function MetricCardUnits() {
  return (
    <MetricCard
      label="Storage used"
      value="42"
      unit="GB of 100 GB"
      current={42}
      target={100}
    />
  );
}
