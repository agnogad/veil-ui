import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { Button } from "../button/index";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "./index";

function Example({ side }: { side?: "top" | "right" | "bottom" | "left" }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>Open sheet</Button>
      </SheetTrigger>
      <SheetContent side={side}>
        <SheetTitle>Settings</SheetTitle>
        <SheetDescription>Update your preferences.</SheetDescription>
      </SheetContent>
    </Sheet>
  );
}

describe("Sheet", () => {
  it("opens and closes", async () => {
    const user = userEvent.setup();
    render(<Example />);

    await user.click(screen.getByRole("button", { name: "Open sheet" }));
    expect(screen.getByRole("dialog", { name: "Settings" })).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Close sheet" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("supports bottom placement", async () => {
    const user = userEvent.setup();
    render(<Example side="bottom" />);

    await user.click(screen.getByRole("button", { name: "Open sheet" }));
    expect(screen.getByRole("dialog")).toHaveAttribute("data-side", "bottom");
  });

  it("has no accessibility violations", async () => {
    const user = userEvent.setup();
    render(<Example side="left" />);
    await user.click(screen.getByRole("button", { name: "Open sheet" }));

    const results = await axe.run(document.body);
    expect(results.violations).toEqual([]);
  });
});
