export type ConnectionStatusValue =
  | "online"
  | "offline"
  | "connecting"
  | "reconnecting";

export interface ConnectionStatusProps {
  status?: ConnectionStatusValue;
  /** Overrides the default status label. */
  label?: string;
  class?: string;
}
