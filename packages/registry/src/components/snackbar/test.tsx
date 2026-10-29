import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { Snackbar, SnackbarProvider, useSnackbar } from "./index";

function Trigger() {
  const { toast } = useSnackbar();
  return (
    <button type="button" onClick={() => toast({ title: "Message sent" })}>
      Send
    </button>
  );
}

describe("Snackbar", () => {
  it("re-exports Toast as a snackbar API", async () => {
    const user = userEvent.setup();
    render(
      <SnackbarProvider>
        <Trigger />
        <Snackbar />
      </SnackbarProvider>,
    );

    await user.click(screen.getByRole("button", { name: "Send" }));
    expect(await screen.findByText("Message sent")).toBeInTheDocument();
  });
});
