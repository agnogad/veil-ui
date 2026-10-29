import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axe from "axe-core";
import { describe, expect, it, vi } from "vitest";

import { Switch } from "./index";

describe("Switch", () => {
  it("toggles when clicked", async () => {
    const user = userEvent.setup();
    const onCheckedChange = vi.fn();
    render(
      <Switch aria-label="Notifications" onCheckedChange={onCheckedChange} />,
    );

    const control = screen.getByRole("switch", { name: "Notifications" });
    expect(control).toHaveAttribute("data-state", "unchecked");

    await user.click(control);
    expect(onCheckedChange).toHaveBeenCalledWith(true);
    expect(control).toHaveAttribute("data-state", "checked");
  });

  it("applies the small size", () => {
    render(<Switch aria-label="Small" size="sm" />);
    expect(screen.getByRole("switch")).toHaveAttribute("data-size", "sm");
    expect(screen.getByRole("switch")).toHaveClass("h-4");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Switch aria-label="Notifications" />);
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
