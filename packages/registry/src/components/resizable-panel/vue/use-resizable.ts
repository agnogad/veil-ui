import {
  inject,
  provide,
  ref,
  type InjectionKey,
  type Ref,
} from "vue";

export interface ResizableContext {
  orientation: Ref<"horizontal" | "vertical">;
  sizes: Ref<number[]>;
  container: Ref<HTMLElement | null>;
  registerPanel: (size: number) => number;
  registerHandle: () => number;
}

export const resizableKey: InjectionKey<ResizableContext> = Symbol("resizable");

export function provideResizable(context: ResizableContext) {
  provide(resizableKey, context);
}

export function useResizable() {
  const context = inject(resizableKey);
  if (!context) {
    throw new Error("useResizable must be used within a ResizablePanelGroup");
  }
  return context;
}

export function toPercent(value: string | number | undefined, fallback = 50) {
  if (typeof value === "number") return value;
  if (!value) return fallback;
  const parsed = Number.parseFloat(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

export function createResizableContext() {
  let panels = 0;
  let handles = 0;
  const sizes = ref<number[]>([]);

  return {
    orientation: ref<"horizontal" | "vertical">("horizontal"),
    sizes,
    container: ref<HTMLElement | null>(null),
    registerPanel: (size: number) => {
      const index = panels;
      panels += 1;
      sizes.value[index] = size;
      return index;
    },
    registerHandle: () => {
      const index = handles;
      handles += 1;
      return index;
    },
  };
}
