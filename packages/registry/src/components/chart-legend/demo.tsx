import { ChartLegend } from "./index";

export function ChartLegendBasic() {
  return (
    <ChartLegend
      items={[
        { label: "Revenue", color: "#6366f1" },
        { label: "Costs", color: "#22c55e" },
        { label: "Profit", color: "#f59e0b" },
      ]}
    />
  );
}

export function ChartLegendComputing() {
  return (
    <ChartLegend
      label="Traffic sources"
      items={[
        { label: "Organic", color: "#06b6d4" },
        { label: "Paid", color: "#a855f7" },
        { label: "Referral", color: "#ec4899" },
      ]}
    />
  );
}
