import { render, screen } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { ScrollArea } from "./index";

describe("ScrollArea", () => {
  it("renders its viewport", () => {
    render(
      <ScrollArea data-testid="scroll-area">
        <p>Content</p>
      </ScrollArea>,
    );
    const area = screen.getByTestId("scroll-area");
    expect(area).toHaveAttribute("data-slot", "scroll-area");
    expect(
      area.querySelector('[data-slot="scroll-area-viewport"]'),
    ).toContainElement(screen.getByText("Content"));
  });

  it("renders the default scrollbar", () => {
    render(
      <ScrollArea type="always">
        <p>Content</p>
      </ScrollArea>,
    );
    expect(
      document.querySelector('[data-slot="scroll-area-scrollbar"]'),
    ).toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <ScrollArea className="h-32">
        <p>Scrollable content</p>
      </ScrollArea>,
    );
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
