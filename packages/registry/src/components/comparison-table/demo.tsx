import { ComparisonTable } from "./index";

export function ComparisonTableBasic() {
  return (
    <ComparisonTable
      className="max-w-2xl"
      plans={[
        { name: "Starter", price: "$0" },
        { name: "Team", price: "$24" },
        { name: "Enterprise", price: "Custom" },
      ]}
      rows={[
        { feature: "Projects", values: ["3", "Unlimited", "Unlimited"] },
        { feature: "SSO", values: [false, false, true] },
        { feature: "Audit log", values: [false, true, true] },
        { feature: "Priority support", values: [false, true, true] },
      ]}
    />
  );
}

export function ComparisonTableCaption() {
  return (
    <ComparisonTable
      className="max-w-xl"
      caption="Plan comparison"
      plans={[{ name: "Monthly" }, { name: "Yearly" }]}
      rows={[
        { feature: "Billing", values: ["Monthly", "Annual"] },
        { feature: "Discount", values: [false, true] },
      ]}
    />
  );
}
