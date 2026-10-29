import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axe from "axe-core";
import { describe, expect, it, vi } from "vitest";

import { HamburgerMenu } from "./index";

describe("HamburgerMenu", () => {
  it("toggles its expanded state", async () => {
    render(<HamburgerMenu />);
    const button = screen.getByRole("button", { name: "Toggle navigation" });
    expect(button).toHaveAttribute("aria-expanded", "false");

    await userEvent.click(button);
    expect(button).toHaveAttribute("aria-expanded", "true");
    expect(button).toHaveAttribute("data-state", "open");
  });

  it("reports changes in controlled mode", async () => {
    const onOpenChange = vi.fn();
    render(<HamburgerMenu open={false} onOpenChange={onOpenChange} />);

    await userEvent.click(
      screen.getByRole("button", { name: "Toggle navigation" }),
    );
    expect(onOpenChange).toHaveBeenCalledWith(true);
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<HamburgerMenu />);
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
