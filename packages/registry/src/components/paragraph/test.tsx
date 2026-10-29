import { render, screen } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { Paragraph } from "./index";

describe("Paragraph", () => {
  it("renders a p with relaxed leading", () => {
    render(<Paragraph>Copy</Paragraph>);
    const paragraph = screen.getByText("Copy");
    expect(paragraph.tagName).toBe("P");
    expect(paragraph).toHaveClass("leading-relaxed");
  });

  it("applies the muted tone", () => {
    render(<Paragraph tone="muted">Quiet</Paragraph>);
    expect(screen.getByText("Quiet")).toHaveClass("text-muted-foreground");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <article>
        <Paragraph>Article body</Paragraph>
      </article>,
    );
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
