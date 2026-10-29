"use client";

import { Button } from "../button/index";
import { Toaster, ToastProvider, useToast } from "./index";

function ToastButtons() {
  const { toast } = useToast();

  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant="outline"
        onClick={() =>
          toast({
            title: "Changes saved",
            description: "Your profile was updated.",
          })
        }
      >
        Show toast
      </Button>
    </div>
  );
}

export function ToastBasic() {
  return (
    <ToastProvider>
      <ToastButtons />
      <Toaster />
    </ToastProvider>
  );
}

export function ToastVariants() {
  return (
    <ToastProvider>
      <ToastVariantButtons />
      <Toaster />
    </ToastProvider>
  );
}

function ToastVariantButtons() {
  const { toast } = useToast();

  return (
    <div className="flex flex-wrap gap-2">
      <Button
        onClick={() =>
          toast({
            title: "Deployment finished",
            description: "Production is live.",
            variant: "success",
          })
        }
      >
        Success
      </Button>
      <Button
        variant="destructive"
        onClick={() =>
          toast({
            title: "Upload failed",
            description: "The file exceeded the size limit.",
            variant: "destructive",
          })
        }
      >
        Destructive
      </Button>
    </div>
  );
}

export function ToastWithAction() {
  return (
    <ToastProvider duration={8000}>
      <ToastActionButton />
      <Toaster />
    </ToastProvider>
  );
}

function ToastActionButton() {
  const { toast } = useToast();

  return (
    <Button
      variant="outline"
      onClick={() =>
        toast({
          title: "Message archived",
          description: "You can restore it from the archive.",
          action: (
            <Button size="sm" variant="outline">
              Undo
            </Button>
          ),
        })
      }
    >
      Archive message
    </Button>
  );
}

export function ToastPersistent() {
  return (
    <ToastProvider>
      <ToastPersistentButton />
      <Toaster />
    </ToastProvider>
  );
}

function ToastPersistentButton() {
  const { toast } = useToast();

  return (
    <Button
      variant="outline"
      onClick={() =>
        toast({
          title: "Connection lost",
          description: "Reconnecting… dismiss once you are back online.",
          variant: "destructive",
          duration: Number.POSITIVE_INFINITY,
        })
      }
    >
      Trigger persistent toast
    </Button>
  );
}
