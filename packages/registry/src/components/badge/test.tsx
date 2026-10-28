import { render, screen } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { Badge } from "./index";

describe("Badge", () => {
  it("renders with the default variant", () => {
    render(<Badge>New</Badge>);
    const badge = screen.getByText("New");
    expect(badge).toHaveAttribute("data-slot", "badge");
    expect(badge).toHaveAttribute("data-variant", "default");
  });

  it("applies variant data attributes", () => {
    render(<Badge variant="outline">Outline</Badge>);
    expect(screen.getByText("Outline")).toHaveAttribute("data-variant", "outline");
  });

  it("supports asChild", () => {
    render(
      <Badge asChild>
        <a href="/docs">Docs</a>
      </Badge>,
    );
    expect(screen.getByRole("link")).toHaveAttribute("data-slot", "badge");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Badge>New</Badge>);
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
