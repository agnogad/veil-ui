import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { Button } from "../button/index";
import { Popover, PopoverContent, PopoverTrigger } from "./index";

function Example() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button>Open popover</Button>
      </PopoverTrigger>
      <PopoverContent aria-label="Settings">
        <p>Popover content</p>
      </PopoverContent>
    </Popover>
  );
}

describe("Popover", () => {
  it("opens from the trigger", async () => {
    const user = userEvent.setup();
    render(<Example />);

    expect(screen.queryByText("Popover content")).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Open popover" }));

    expect(screen.getByText("Popover content")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Open popover" }),
    ).toHaveAttribute("aria-expanded", "true");
  });

  it("closes with Escape", async () => {
    const user = userEvent.setup();
    render(<Example />);

    await user.click(screen.getByRole("button", { name: "Open popover" }));
    await user.keyboard("{Escape}");

    expect(screen.queryByText("Popover content")).not.toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    const user = userEvent.setup();
    render(<Example />);
    await user.click(screen.getByRole("button", { name: "Open popover" }));

    const results = await axe.run(document.body);
    expect(results.violations).toEqual([]);
  });
});
