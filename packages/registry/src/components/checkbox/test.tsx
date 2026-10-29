import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axe from "axe-core";
import { describe, expect, it, vi } from "vitest";

import { Checkbox } from "./index";

describe("Checkbox", () => {
  it("renders an unchecked checkbox", () => {
    render(<Checkbox aria-label="Accept" />);
    const checkbox = screen.getByRole("checkbox", { name: "Accept" });
    expect(checkbox).toHaveAttribute("data-state", "unchecked");
  });

  it("toggles on click", async () => {
    const user = userEvent.setup();
    const onCheckedChange = vi.fn();
    render(
      <Checkbox aria-label="Accept" onCheckedChange={onCheckedChange} />,
    );

    await user.click(screen.getByRole("checkbox"));

    expect(onCheckedChange).toHaveBeenCalledWith(true);
    expect(screen.getByRole("checkbox")).toHaveAttribute(
      "data-state",
      "checked",
    );
  });

  it("supports the indeterminate state", () => {
    render(<Checkbox aria-label="Select all" checked="indeterminate" />);
    expect(screen.getByRole("checkbox")).toHaveAttribute(
      "data-state",
      "indeterminate",
    );
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Checkbox aria-label="Accept" />);
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
