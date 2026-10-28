import { render, screen } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { Separator } from "./index";

describe("Separator", () => {
  it("is horizontal by default", () => {
    render(<Separator data-testid="separator" />);
    const separator = screen.getByTestId("separator");
    expect(separator).toHaveAttribute("data-orientation", "horizontal");
    expect(separator).toHaveAttribute("role", "none");
  });

  it("renders a vertical separator", () => {
    render(<Separator orientation="vertical" data-testid="separator" />);
    expect(screen.getByTestId("separator")).toHaveAttribute(
      "data-orientation",
      "vertical",
    );
  });

  it("can be exposed to assistive tech", () => {
    render(<Separator decorative={false} />);
    expect(screen.getByRole("separator")).toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <div>
        <span>Above</span>
        <Separator decorative={false} />
        <span>Below</span>
      </div>,
    );
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
