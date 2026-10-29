import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { Button } from "../button/index";
import { Toaster, ToastProvider, useToast } from "./index";

function Trigger() {
  const { toast } = useToast();
  return (
    <Button onClick={() => toast({ title: "Saved" })}>Show toast</Button>
  );
}

describe("Toaster", () => {
  it("re-exports the toast provider, hook and viewport", async () => {
    const user = userEvent.setup();
    render(
      <ToastProvider>
        <Trigger />
        <Toaster />
      </ToastProvider>,
    );

    await user.click(screen.getByRole("button", { name: "Show toast" }));
    expect(await screen.findByText("Saved")).toBeInTheDocument();
  });
});
