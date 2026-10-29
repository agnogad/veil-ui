import type { InjectionKey, Ref } from "vue";

export type ToggleGroupVariant = "default" | "outline";
export type ToggleGroupSize = "sm" | "default" | "lg";

export interface ToggleGroupContext {
  variant: Ref<ToggleGroupVariant | undefined>;
  size: Ref<ToggleGroupSize | undefined>;
}

export const toggleGroupContextKey: InjectionKey<ToggleGroupContext> =
  Symbol("toggle-group");
