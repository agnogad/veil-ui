import { render, screen } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { Stepper } from "./index";

const steps = [{ title: "One" }, { title: "Two" }, { title: "Three" }];

describe("Stepper", () => {
  it("marks the current step", () => {
    render(<Stepper steps={steps} current={2} />);
    expect(
      screen.getByText("Two").closest("li"),
    ).toHaveAttribute("aria-current", "step");
  });

  it("marks completed and upcoming steps", () => {
    render(<Stepper steps={steps} current={2} />);
    expect(screen.getByText("One").closest("li")).toHaveAttribute(
      "data-state",
      "completed",
    );
    expect(screen.getByText("Three").closest("li")).toHaveAttribute(
      "data-state",
      "upcoming",
    );
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Stepper steps={steps} current={2} />);
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
