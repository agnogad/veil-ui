import { ConnectionStatus } from "./index";

export function ConnectionStatusBasic() {
  return <ConnectionStatus />;
}

export function ConnectionStatusStatuses() {
  return (
    <div className="flex flex-col gap-2">
      <ConnectionStatus status="online" />
      <ConnectionStatus status="connecting" />
      <ConnectionStatus status="reconnecting" />
      <ConnectionStatus status="offline" />
    </div>
  );
}

export function ConnectionStatusCustomLabel() {
  return (
    <ConnectionStatus status="online" label="Sync active" />
  );
}
