import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axe from "axe-core";
import { describe, expect, it, vi } from "vitest";

import { DateRangePicker } from "./index";

describe("DateRangePicker", () => {
  it("shows the placeholder when empty", () => {
    render(<DateRangePicker />);
    expect(
      screen.getByRole("button", { name: "Choose date range" }),
    ).toHaveTextContent("Pick a date range");
  });

  it("shows two months and selects a range", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <DateRangePicker
        defaultMonth={new Date(2026, 0, 1)}
        onValueChange={onValueChange}
      />,
    );

    await user.click(
      screen.getByRole("button", { name: "Choose date range" }),
    );

    expect(screen.getAllByRole("grid")).toHaveLength(2);

    await user.click(
      screen.getByRole("button", { name: /January 12th, 2026/ }),
    );
    expect(screen.getAllByRole("grid")).toHaveLength(2);
    await user.click(
      screen.getByRole("button", { name: /January 16th, 2026/ }),
    );

    expect(onValueChange).toHaveBeenCalledTimes(2);
    const range = onValueChange.mock.calls[1]![0] as {
      from: Date;
      to: Date;
    };
    expect(range.from.getDate()).toBe(12);
    expect(range.to.getDate()).toBe(16);
  });

  it("closes after a complete range is picked", async () => {
    const user = userEvent.setup();
    render(<DateRangePicker defaultMonth={new Date(2026, 0, 1)} />);

    await user.click(
      screen.getByRole("button", { name: "Choose date range" }),
    );
    await user.click(
      screen.getByRole("button", { name: /January 12th, 2026/ }),
    );
    expect(screen.getAllByRole("grid")).toHaveLength(2);

    await user.click(
      screen.getByRole("button", { name: /January 16th, 2026/ }),
    );
    expect(screen.queryByRole("grid")).not.toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    const user = userEvent.setup();
    render(
      <DateRangePicker
        defaultValue={{ from: new Date(2026, 0, 1), to: new Date(2026, 1, 1) }}
      />,
    );
    await user.click(
      screen.getByRole("button", { name: "Choose date range" }),
    );

    const results = await axe.run(document.body);
    expect(results.violations).toEqual([]);
  });
});
