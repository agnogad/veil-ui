import { render, screen } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { Container } from "./index";

describe("Container", () => {
  it("renders a div with the default size", () => {
    render(<Container data-testid="container" />);
    const element = screen.getByTestId("container");
    expect(element).toHaveAttribute("data-slot", "container");
    expect(element).toHaveAttribute("data-size", "lg");
  });

  it("applies the size variant", () => {
    render(<Container size="sm" data-testid="container" />);
    expect(screen.getByTestId("container")).toHaveClass("max-w-3xl");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <Container>
        <h2>Section</h2>
        <p>Body copy.</p>
      </Container>,
    );
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
