import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { Button } from "../button/index";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "./index";

function Example() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open modal</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Delete workspace</DialogTitle>
        <DialogDescription>This action cannot be undone.</DialogDescription>
        <Button>Confirm</Button>
      </DialogContent>
    </Dialog>
  );
}

describe("Modal", () => {
  it("opens from the trigger and closes with Escape", async () => {
    const user = userEvent.setup();
    render(<Example />);

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Open modal" }));
    expect(
      screen.getByRole("dialog", { name: "Delete workspace" }),
    ).toBeInTheDocument();

    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("closes with the close button", async () => {
    const user = userEvent.setup();
    render(<Example />);

    await user.click(screen.getByRole("button", { name: "Open modal" }));
    await user.click(screen.getByRole("button", { name: "Close dialog" }));

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    const user = userEvent.setup();
    render(<Example />);
    await user.click(screen.getByRole("button", { name: "Open modal" }));

    const results = await axe.run(document.body);
    expect(results.violations).toEqual([]);
  });
});
