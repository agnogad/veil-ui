"use client";

import * as ToastPrimitive from "@radix-ui/react-toast";
import { cva, type VariantProps } from "class-variance-authority";
import { X } from "lucide-react";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import type * as React from "react";

import { cn } from "@veil-ui/utils";

import { IconButton } from "../icon-button/index";

const toastVariants = cva(
  "pointer-events-auto relative flex w-full items-start gap-3 rounded-lg border p-4 pr-10 text-sm shadow-lg data-[state=closed]:animate-out data-[state=closed]:fade-out-80 data-[state=open]:animate-in data-[state=open]:slide-in-from-bottom-full",
  {
    variants: {
      variant: {
        default: "border-border bg-background text-foreground",
        success:
          "border-emerald-500/30 bg-emerald-500/10 text-emerald-900 dark:text-emerald-100",
        destructive:
          "border-destructive/40 bg-destructive/10 text-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

type ToastVariant = NonNullable<
  VariantProps<typeof toastVariants>["variant"]
>;

interface ToastOptions {
  title: React.ReactNode;
  description?: React.ReactNode;
  variant?: ToastVariant;
  /** Milliseconds before the toast auto-dismisses. */
  duration?: number;
  action?: React.ReactNode;
}

interface ToastRecord extends ToastOptions {
  id: string;
}

interface ToastContextValue {
  toasts: ToastRecord[];
  toast: (options: ToastOptions) => string;
  dismiss: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

interface ToastProviderProps {
  children: React.ReactNode;
  /** Default auto-dismiss delay for every toast in this provider. */
  duration?: number;
  /** Screen-reader label for the toast region. */
  label?: string;
}

function ToastProvider({
  children,
  duration = 5000,
  label = "Notification",
}: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastRecord[]>([]);

  const dismiss = useCallback((id: string) => {
    setToasts((current) => current.filter((item) => item.id !== id));
  }, []);

  const toast = useCallback((options: ToastOptions) => {
    const id =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    setToasts((current) => [...current, { id, ...options }]);
    return id;
  }, []);

  const value = useMemo(
    () => ({ toasts, toast, dismiss }),
    [toasts, toast, dismiss],
  );

  return (
    <ToastContext.Provider value={value}>
      <ToastPrimitive.Provider
        duration={duration}
        label={label}
        swipeDirection="right"
      >
        {children}
      </ToastPrimitive.Provider>
    </ToastContext.Provider>
  );
}

function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }

  return context;
}

function Toaster({
  className,
  ...props
}: React.ComponentProps<typeof ToastPrimitive.Viewport>) {
  const context = useContext(ToastContext);

  if (!context) return null;

  return (
    <ToastPrimitive.Viewport
      data-slot="toaster"
      className={cn(
        "fixed right-0 bottom-0 z-50 flex max-h-screen w-full flex-col gap-2 p-4 sm:max-w-sm",
        className,
      )}
      {...props}
    >
      {context.toasts.map((item) => (
        <ToastPrimitive.Root
          key={item.id}
          data-slot="toast"
          data-variant={item.variant ?? "default"}
          duration={item.duration}
          onOpenChange={(open) => {
            if (!open) context.dismiss(item.id);
          }}
          className={cn(toastVariants({ variant: item.variant }))}
        >
          <div className="grid flex-1 gap-1">
            <ToastPrimitive.Title className="font-medium">
              {item.title}
            </ToastPrimitive.Title>
            {item.description ? (
              <ToastPrimitive.Description
                data-slot="toast-description"
                className="opacity-90"
              >
                {item.description}
              </ToastPrimitive.Description>
            ) : null}
            {item.action ? <div className="mt-2">{item.action}</div> : null}
          </div>
          <ToastPrimitive.Close asChild>
            <IconButton
              variant="ghost"
              size="sm"
              aria-label="Dismiss notification"
              className="absolute top-2 right-2"
            >
              <X />
            </IconButton>
          </ToastPrimitive.Close>
        </ToastPrimitive.Root>
      ))}
    </ToastPrimitive.Viewport>
  );
}

export { Toaster, ToastProvider, toastVariants, useToast };
export type { ToastOptions, ToastVariant };
