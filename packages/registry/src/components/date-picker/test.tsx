import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axe from "axe-core";
import { describe, expect, it, vi } from "vitest";

import { DatePicker } from "./index";

describe("DatePicker", () => {
  it("shows the placeholder when empty", () => {
    render(<DatePicker />);
    expect(
      screen.getByRole("button", { name: "Choose date" }),
    ).toHaveTextContent("Pick a date");
  });

  it("opens the calendar and selects a date", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <DatePicker defaultValue={new Date(2026, 0, 1)} onValueChange={onValueChange} />,
    );

    await user.click(screen.getByRole("button", { name: "Choose date" }));
    await user.click(
      screen.getByRole("button", { name: /January 15th, 2026/ }),
    );

    expect(onValueChange).toHaveBeenCalledTimes(1);
    const selected = onValueChange.mock.calls[0]![0] as Date;
    expect(selected.getDate()).toBe(15);
    expect(
      screen.getByRole("button", { name: "Choose date" }),
    ).toHaveTextContent("January 15, 2026");
  });

  it("does not open when disabled", async () => {
    const user = userEvent.setup();
    render(<DatePicker disabled />);

    const trigger = screen.getByRole("button", { name: "Choose date" });
    expect(trigger).toBeDisabled();
    await user.click(trigger);
    expect(screen.queryByRole("grid")).not.toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    const user = userEvent.setup();
    render(<DatePicker defaultValue={new Date(2026, 0, 1)} />);
    await user.click(screen.getByRole("button", { name: "Choose date" }));

    const results = await axe.run(document.body);
    expect(results.violations).toEqual([]);
  });
});
