import { inject, provide, ref, type InjectionKey, type Ref } from "vue";

import type { ToastVariant } from "./variants";

export interface ToastActionOptions {
  label: string;
  /** Screen-reader description of the action. Defaults to the label. */
  altText?: string;
  onClick?: () => void;
}

export interface ToastOptions {
  title: string;
  description?: string;
  variant?: ToastVariant;
  /** Milliseconds before the toast auto-dismisses. */
  duration?: number;
  action?: ToastActionOptions;
}

export interface ToastRecord extends ToastOptions {
  id: string;
}

export interface ToastStore {
  toasts: Ref<ToastRecord[]>;
  toast: (options: ToastOptions) => string;
  dismiss: (id: string) => void;
}

const toastKey: InjectionKey<ToastStore> = Symbol("veil-toast");

function createId() {
  return typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

/** Create the toast store and make it available to descendants. */
export function provideToast(): ToastStore {
  const toasts = ref<ToastRecord[]>([]);

  function dismiss(id: string) {
    toasts.value = toasts.value.filter((item) => item.id !== id);
  }

  function toast(options: ToastOptions) {
    const id = createId();
    toasts.value = [...toasts.value, { id, ...options }];
    return id;
  }

  const store: ToastStore = { toasts, toast, dismiss };
  provide(toastKey, store);
  return store;
}

/** Access the nearest toast store. Throws outside a `ToastProvider`. */
export function useToast(): ToastStore {
  const store = inject(toastKey, null);

  if (!store) {
    throw new Error("useToast must be used within a ToastProvider");
  }

  return store;
}

/** Internal helper for the viewport, which renders nothing without a provider. */
export function useOptionalToast(): ToastStore | null {
  return inject(toastKey, null);
}
