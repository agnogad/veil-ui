import { render, screen } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { Spacer } from "./index";

describe("Spacer", () => {
  it("grows by default", () => {
    render(<Spacer data-testid="spacer" />);
    const spacer = screen.getByTestId("spacer");
    expect(spacer).toHaveClass("flex-1");
    expect(spacer).toHaveAttribute("aria-hidden", "true");
  });

  it("supports fixed sizes", () => {
    render(<Spacer size="lg" data-testid="spacer" />);
    expect(screen.getByTestId("spacer")).toHaveClass("shrink-0", "size-6");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <div>
        <span>One</span>
        <Spacer />
        <span>Two</span>
      </div>,
    );
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
