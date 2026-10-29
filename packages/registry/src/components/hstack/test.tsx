import { render, screen } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { HStack } from "./index";

describe("HStack", () => {
  it("renders a row that is centered by default", () => {
    render(<HStack data-testid="hstack" />);
    const stack = screen.getByTestId("hstack");
    expect(stack).toHaveClass("flex-row", "items-center");
    expect(stack).toHaveAttribute("data-slot", "h-stack");
  });

  it("accepts gap and justification", () => {
    render(<HStack gap="lg" justify="between" data-testid="hstack" />);
    expect(screen.getByTestId("hstack")).toHaveClass("gap-6", "justify-between");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <HStack gap="sm">
        <span>One</span>
        <span>Two</span>
      </HStack>,
    );
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
