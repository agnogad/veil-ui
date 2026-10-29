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
