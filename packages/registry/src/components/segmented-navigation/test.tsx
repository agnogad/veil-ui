import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axe from "axe-core";
import { describe, expect, it, vi } from "vitest";

import { SegmentedNavigation } from "./index";

const options = [
  { value: "day", label: "Day" },
  { value: "week", label: "Week" },
  { value: "month", label: "Month" },
];

describe("SegmentedNavigation", () => {
  it("selects an option on click", async () => {
    const onValueChange = vi.fn();
    render(
      <SegmentedNavigation
        value="day"
        onValueChange={onValueChange}
        options={options}
      />,
    );

    expect(screen.getByRole("tab", { name: "Day" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    await userEvent.click(screen.getByRole("tab", { name: "Week" }));
    expect(onValueChange).toHaveBeenCalledWith("week");
  });

  it("moves selection with arrow keys", () => {
    const onValueChange = vi.fn();
    render(
      <SegmentedNavigation
        value="day"
        onValueChange={onValueChange}
        options={options}
      />,
    );

    fireEvent.keyDown(screen.getByRole("tab", { name: "Day" }), {
      key: "ArrowRight",
    });
    expect(onValueChange).toHaveBeenCalledWith("week");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <SegmentedNavigation value="day" options={options} />,
    );
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
