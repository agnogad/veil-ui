import { Users } from "lucide-react";

import { StatisticCard } from "./index";

export function StatisticCardBasic() {
  return (
    <StatisticCard
      label="Active users"
      value="12,480"
      delta={12.4}
      trend="up"
      icon={Users}
    />
  );
}

export function StatisticCardDecline() {
  return (
    <StatisticCard
      label="Churn rate"
      value="2.1%"
      delta={-0.4}
      trend="down"
      deltaLabel="vs last quarter"
    />
  );
}
