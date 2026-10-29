import { render, screen } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { Stack } from "./index";

describe("Stack", () => {
  it("renders a column by default", () => {
    render(<Stack data-testid="stack" />);
    const stack = screen.getByTestId("stack");
    expect(stack).toHaveClass("flex-col");
    expect(stack).toHaveAttribute("data-direction", "column");
  });

  it("supports rows, alignment and justification", () => {
    render(
      <Stack
        direction="row"
        align="center"
        justify="between"
        gap="lg"
        data-testid="stack"
      />,
    );
    const stack = screen.getByTestId("stack");
    expect(stack).toHaveClass("flex-row", "items-center", "justify-between", "gap-6");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <Stack gap="sm">
        <p>One</p>
        <p>Two</p>
      </Stack>,
    );
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
