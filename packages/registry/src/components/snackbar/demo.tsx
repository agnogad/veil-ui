"use client";

import { Button } from "../button/index";
import { Snackbar, SnackbarProvider, useSnackbar } from "./index";

function SnackbarTrigger() {
  const { toast } = useSnackbar();

  return (
    <Button
      onClick={() =>
        toast({
          title: "Message sent",
          description: "We'll get back to you shortly.",
        })
      }
    >
      Send message
    </Button>
  );
}

export function SnackbarBasic() {
  return (
    <SnackbarProvider>
      <SnackbarTrigger />
      <Snackbar />
    </SnackbarProvider>
  );
}

function SnackbarActionTrigger() {
  const { toast } = useSnackbar();

  return (
    <Button
      variant="outline"
      onClick={() =>
        toast({
          title: "Message archived",
          description: "You can restore it from Settings.",
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

export function SnackbarAction() {
  return (
    <SnackbarProvider>
      <SnackbarActionTrigger />
      <Snackbar />
    </SnackbarProvider>
  );
}
