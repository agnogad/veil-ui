import { render, screen } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { VStack } from "./index";

describe("VStack", () => {
  it("renders a column", () => {
    render(<VStack data-testid="vstack" />);
    const stack = screen.getByTestId("vstack");
    expect(stack).toHaveClass("flex-col");
    expect(stack).toHaveAttribute("data-slot", "v-stack");
  });

  it("supports alignment and gaps", () => {
    render(<VStack align="center" gap="xl" data-testid="vstack" />);
    expect(screen.getByTestId("vstack")).toHaveClass("items-center", "gap-8");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <VStack gap="sm">
        <p>One</p>
        <p>Two</p>
      </VStack>,
    );
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
