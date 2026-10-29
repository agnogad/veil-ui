import { StatusBadge } from "./index";

export function StatusBadgeBasic() {
  return <StatusBadge status="success">Active</StatusBadge>;
}

export function StatusBadgeTones() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <StatusBadge status="success">Active</StatusBadge>
      <StatusBadge status="warning">Trial ending</StatusBadge>
      <StatusBadge status="danger">Failed</StatusBadge>
      <StatusBadge status="info">In review</StatusBadge>
      <StatusBadge status="neutral">Draft</StatusBadge>
    </div>
  );
}
