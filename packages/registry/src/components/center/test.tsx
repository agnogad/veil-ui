import { render, screen } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { Center } from "./index";

describe("Center", () => {
  it("renders centered content", () => {
    render(<Center data-testid="center">Content</Center>);
    const element = screen.getByTestId("center");
    expect(element).toHaveClass("flex", "items-center", "justify-center");
    expect(element).toHaveAttribute("data-slot", "center");
  });

  it("merges custom classes", () => {
    render(
      <Center className="h-40 bg-muted" data-testid="center">
        Content
      </Center>,
    );
    expect(screen.getByTestId("center")).toHaveClass("h-40", "bg-muted");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <Center className="h-32">
        <p>Centered</p>
      </Center>,
    );
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
