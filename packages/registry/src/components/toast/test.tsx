import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { Button } from "../button/index";
import { Toaster, ToastProvider, useToast } from "./index";

function Trigger() {
  const { toast } = useToast();

  return (
    <>
      <Button
        onClick={() =>
          toast({
            title: "Changes saved",
            description: "Your profile was updated.",
          })
        }
      >
        Show toast
      </Button>
      <Button
        variant="destructive"
        onClick={() =>
          toast({ title: "Upload failed", variant: "destructive" })
        }
      >
        Fail
      </Button>
    </>
  );
}

function Example() {
  return (
    <ToastProvider>
      <Trigger />
      <Toaster />
    </ToastProvider>
  );
}

describe("Toast", () => {
  it("shows a toast with title and description", async () => {
    const user = userEvent.setup();
    render(<Example />);

    await user.click(screen.getByRole("button", { name: "Show toast" }));

    expect(await screen.findByText("Changes saved")).toBeInTheDocument();
    expect(
      screen.getByText("Your profile was updated."),
    ).toBeInTheDocument();
  });

  it("applies the requested variant", async () => {
    const user = userEvent.setup();
    render(<Example />);

    await user.click(screen.getByRole("button", { name: "Fail" }));

    const title = await screen.findByText("Upload failed");
    expect(title.closest('[data-slot="toast"]')).toHaveAttribute(
      "data-variant",
      "destructive",
    );
  });

  it("dismisses from the labelled close control", async () => {
    const user = userEvent.setup();
    render(<Example />);

    await user.click(screen.getByRole("button", { name: "Show toast" }));
    await screen.findByText("Changes saved");

    await user.click(
      screen.getByRole("button", { name: "Dismiss notification" }),
    );

    await waitFor(() => {
      expect(screen.queryByText("Changes saved")).not.toBeInTheDocument();
    });
  });

  it("throws when the hook is used outside the provider", () => {
    function Outside() {
      useToast();
      return null;
    }

    expect(() => render(<Outside />)).toThrow(
      "useToast must be used within a ToastProvider",
    );
  });

  it("has no accessibility violations when a toast is open", async () => {
    const user = userEvent.setup();
    render(<Example />);

    await user.click(screen.getByRole("button", { name: "Show toast" }));
    await screen.findByText("Changes saved");

    const results = await axe.run(document.body);
    expect(results.violations).toEqual([]);
  });
});
