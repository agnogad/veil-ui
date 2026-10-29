import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axe from "axe-core";
import { describe, expect, it, vi } from "vitest";

import { NumberInput } from "./index";

describe("NumberInput", () => {
  it("increments and decrements", async () => {
    render(<NumberInput defaultValue={2} aria-label="Quantity" />);
    const input = screen.getByRole("spinbutton", { name: "Quantity" });

    await userEvent.click(screen.getByRole("button", { name: "Increase value" }));
    expect(input).toHaveValue(3);

    await userEvent.click(screen.getByRole("button", { name: "Decrease value" }));
    expect(input).toHaveValue(2);
  });

  it("clamps to min and max", async () => {
    render(
      <NumberInput defaultValue={10} min={0} max={10} aria-label="Retries" />,
    );

    expect(
      screen.getByRole("button", { name: "Increase value" }),
    ).toBeDisabled();

    await userEvent.click(screen.getByRole("button", { name: "Decrease value" }));
    expect(screen.getByRole("spinbutton")).toHaveValue(9);
  });

  it("accepts typed values", async () => {
    render(<NumberInput defaultValue={0} aria-label="Quantity" />);
    const input = screen.getByRole("spinbutton");
    await userEvent.clear(input);
    await userEvent.type(input, "42");
    expect(input).toHaveValue(42);
  });

  it("calls onValueChange", async () => {
    const onValueChange = vi.fn();
    render(
      <NumberInput
        defaultValue={1}
        onValueChange={onValueChange}
        aria-label="Quantity"
      />,
    );
    await userEvent.click(screen.getByRole("button", { name: "Increase value" }));
    expect(onValueChange).toHaveBeenCalledWith(2);
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<NumberInput defaultValue={1} aria-label="Quantity" />);
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
