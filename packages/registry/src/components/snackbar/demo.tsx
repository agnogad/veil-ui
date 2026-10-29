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
