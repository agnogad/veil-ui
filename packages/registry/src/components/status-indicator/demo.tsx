import { StatusIndicator } from "./index";

export function StatusIndicatorBasic() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <StatusIndicator status="online" label="Online" />
      <StatusIndicator status="away" label="Away" />
      <StatusIndicator status="busy" label="In a meeting" />
      <StatusIndicator status="offline" label="Offline" />
    </div>
  );
}

export function StatusIndicatorPulse() {
  return <StatusIndicator status="online" label="Live" pulse />;
}
