import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axe from "axe-core";
import { describe, expect, it, vi } from "vitest";

import { Button } from "../button/index";
import { ConfirmationDialog } from "./index";

describe("ConfirmationDialog", () => {
  it("opens from the trigger and confirms", async () => {
    const user = userEvent.setup();
    const onConfirm = vi.fn();
    render(
      <ConfirmationDialog
        title="Delete this project?"
        description="This cannot be undone."
        confirmLabel="Delete"
        destructive
        trigger={<Button variant="destructive">Delete</Button>}
        onConfirm={onConfirm}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Delete" }));
    expect(
      screen.getByRole("alertdialog", { name: "Delete this project?" }),
    ).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Delete" }));

    expect(onConfirm).toHaveBeenCalledTimes(1);
  });

  it("calls onCancel without confirming", async () => {
    const user = userEvent.setup();
    const onConfirm = vi.fn();
    const onCancel = vi.fn();
    render(
      <ConfirmationDialog
        title="Discard draft?"
        trigger={<Button variant="outline">Discard</Button>}
        onConfirm={onConfirm}
        onCancel={onCancel}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Discard" }));
    await user.click(screen.getByRole("button", { name: "Cancel" }));

    expect(onCancel).toHaveBeenCalledTimes(1);
    expect(onConfirm).not.toHaveBeenCalled();
  });

  it("can be controlled", async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    render(
      <ConfirmationDialog
        open
        onOpenChange={onOpenChange}
        title="Publish changes?"
      />,
    );

    expect(
      screen.getByRole("alertdialog", { name: "Publish changes?" }),
    ).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Cancel" }));
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("has no accessibility violations", async () => {
    const user = userEvent.setup();
    render(
      <ConfirmationDialog
        title="Delete this project?"
        description="This cannot be undone."
        trigger={<Button>Delete</Button>}
      />,
    );
    await user.click(screen.getByRole("button", { name: "Delete" }));

    const results = await axe.run(document.body);
    expect(results.violations).toEqual([]);
  });
});
