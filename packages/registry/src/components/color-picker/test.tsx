import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axe from "axe-core";
import { describe, expect, it, vi } from "vitest";

import { ColorPicker } from "./index";

describe("ColorPicker", () => {
  it("shows the current color on the trigger", () => {
    render(<ColorPicker defaultValue="#ef4444" />);
    expect(
      screen.getByRole("button", { name: "Choose color" }),
    ).toHaveTextContent("#ef4444");
  });

  it("commits a typed hex value", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<ColorPicker onValueChange={onValueChange} />);

    await user.click(screen.getByRole("button", { name: "Choose color" }));
    const input = screen.getByRole("textbox", { name: /hex value/i });
    await user.clear(input);
    await user.type(input, "#123456{Enter}");

    expect(onValueChange).toHaveBeenCalledWith("#123456");
    expect(
      screen.getByRole("button", { name: "Choose color" }),
    ).toHaveTextContent("#123456");
  });

  it("expands shorthand hex values", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<ColorPicker onValueChange={onValueChange} />);

    await user.click(screen.getByRole("button", { name: "Choose color" }));
    const input = screen.getByRole("textbox", { name: /hex value/i });
    await user.clear(input);
    await user.type(input, "abc{Enter}");

    expect(onValueChange).toHaveBeenCalledWith("#aabbcc");
  });

  it("selects a preset swatch", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<ColorPicker onValueChange={onValueChange} />);

    await user.click(screen.getByRole("button", { name: "Choose color" }));
    await user.click(screen.getByRole("button", { name: "Use #22c55e" }));

    expect(onValueChange).toHaveBeenCalledWith("#22c55e");
    expect(
      screen.getByRole("button", { name: "Use #22c55e" }),
    ).toHaveAttribute("aria-pressed", "true");
  });

  it("has no accessibility violations", async () => {
    const user = userEvent.setup();
    render(<ColorPicker />);
    await user.click(screen.getByRole("button", { name: "Choose color" }));

    const results = await axe.run(document.body);
    expect(results.violations).toEqual([]);
  });
});
