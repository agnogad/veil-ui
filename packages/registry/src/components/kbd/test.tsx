import { render, screen } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { Kbd } from "./index";

describe("Kbd", () => {
  it("renders a kbd element", () => {
    render(<Kbd>K</Kbd>);
    const element = screen.getByText("K");
    expect(element.tagName).toBe("KBD");
    expect(element).toHaveAttribute("data-slot", "kbd");
  });

  it("accepts custom classes", () => {
    render(<Kbd className="text-xs">⌘</Kbd>);
    expect(screen.getByText("⌘")).toHaveClass("text-xs");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <p>
        Press <Kbd>K</Kbd> to search
      </p>,
    );
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
