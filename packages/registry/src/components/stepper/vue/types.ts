export interface StepperStep {
  title: string;
  description?: string;
}

export interface StepperProps {
  steps: StepperStep[];
  /** 1-based index of the active step. */
  current: number;
  orientation?: "horizontal" | "vertical";
  class?: string;
}
