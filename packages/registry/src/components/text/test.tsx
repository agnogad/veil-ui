import { render, screen } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { Text } from "./index";

describe("Text", () => {
  it("renders a paragraph by default", () => {
    render(<Text>Body</Text>);
    const text = screen.getByText("Body");
    expect(text.tagName).toBe("P");
    expect(text).toHaveAttribute("data-slot", "text");
  });

  it("supports polymorphic elements", () => {
    render(
      <Text as="span" size="sm">
        Inline
      </Text>,
    );
    expect(screen.getByText("Inline").tagName).toBe("SPAN");
  });

  it("applies tone and truncation classes", () => {
    render(
      <Text tone="muted" truncate>
        Muted
      </Text>,
    );
    const text = screen.getByText("Muted");
    expect(text).toHaveClass("text-muted-foreground");
    expect(text).toHaveClass("truncate");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <div>
        <Text>Readable content</Text>
      </div>,
    );
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
