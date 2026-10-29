import { render, screen } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { Flex } from "./index";

describe("Flex", () => {
  it("renders with Stack classes", () => {
    render(<Flex data-testid="flex" />);
    expect(screen.getByTestId("flex")).toHaveClass("flex", "flex-col");
  });

  it("supports row direction", () => {
    render(<Flex direction="row" gap="sm" data-testid="flex" />);
    expect(screen.getByTestId("flex")).toHaveClass("flex-row", "gap-2");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <Flex gap="sm">
        <span>One</span>
      </Flex>,
    );
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
