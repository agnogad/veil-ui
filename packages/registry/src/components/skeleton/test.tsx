import { render, screen } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { Skeleton } from "./index";

describe("Skeleton", () => {
  it("is hidden from assistive technology", () => {
    render(<Skeleton data-testid="skeleton" />);
    const skeleton = screen.getByTestId("skeleton");
    expect(skeleton).toHaveAttribute("aria-hidden", "true");
    expect(skeleton).toHaveAttribute("data-slot", "skeleton");
  });

  it("accepts sizing classes", () => {
    render(<Skeleton className="h-4 w-10" data-testid="skeleton" />);
    expect(screen.getByTestId("skeleton")).toHaveClass("h-4", "w-10");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <div aria-busy="true">
        <Skeleton className="h-4 w-32" />
      </div>,
    );
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
