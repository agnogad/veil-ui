"use client";

import { Button } from "../button/index";
import { Toaster, ToastProvider, useToast } from "./index";

function ToasterTrigger() {
  const { toast } = useToast();

  return (
    <Button
      onClick={() =>
        toast({
          title: "Saved",
          description: "Everything is up to date.",
          variant: "success",
        })
      }
    >
      Show toast
    </Button>
  );
}

export function ToasterBasic() {
  return (
    <ToastProvider>
      <ToasterTrigger />
      <Toaster />
    </ToastProvider>
  );
}

function ToasterVariantTriggers() {
  const { toast } = useToast();

  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant="outline"
        onClick={() =>
          toast({
            title: "Draft saved",
            variant: "success",
          })
        }
      >
        Success
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast({
            title: "Upload failed",
            description: "Check your connection and try again.",
            variant: "destructive",
          })
        }
      >
        Destructive
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast({
            title: "Maintenance tonight",
            description: "The API will be read-only from 22:00.",
          })
        }
      >
        Default
      </Button>
    </div>
  );
}

export function ToasterVariants() {
  return (
    <ToastProvider>
      <ToasterVariantTriggers />
      <Toaster />
    </ToastProvider>
  );
}
