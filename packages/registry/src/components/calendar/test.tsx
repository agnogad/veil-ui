import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { Calendar } from "./index";

const january = new Date(2026, 0, 1);

describe("Calendar", () => {
  it("renders the month and weekday headers", () => {
    render(<Calendar mode="single" defaultMonth={january} />);

    expect(screen.getByText("January 2026")).toBeInTheDocument();
    expect(screen.getByRole("grid")).toBeInTheDocument();
    expect(screen.getByLabelText("Monday")).toBeInTheDocument();
  });

  it("marks a clicked day as selected", async () => {
    const user = userEvent.setup();
    render(<Calendar mode="single" defaultMonth={january} />);

    const day = screen.getByRole("button", { name: /January 15th, 2026/ });
    await user.click(day);

    expect(
      screen.getByRole("button", { name: /January 15th, 2026, selected/ }),
    ).toBeInTheDocument();
    expect(screen.getByRole("gridcell", { selected: true })).toBeInTheDocument();
  });

  it("navigates between months", async () => {
    const user = userEvent.setup();
    render(<Calendar mode="single" defaultMonth={january} />);

    await user.click(screen.getByRole("button", { name: /next month/i }));

    expect(screen.getByText("February 2026")).toBeInTheDocument();
  });

  it("supports range selection", async () => {
    const user = userEvent.setup();
    render(<Calendar mode="range" defaultMonth={january} />);

    await user.click(screen.getByRole("button", { name: /January 10th, 2026/ }));
    await user.click(screen.getByRole("button", { name: /January 14th, 2026/ }));

    const cells = screen.getAllByRole("gridcell", { selected: true });
    expect(cells).toHaveLength(5);
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <Calendar mode="single" defaultMonth={january} aria-label="Pick a date" />,
    );
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
