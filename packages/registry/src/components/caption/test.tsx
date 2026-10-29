import { render, screen } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { Caption } from "./index";

describe("Caption", () => {
  it("renders small muted text", () => {
    render(<Caption>Metadata</Caption>);
    const caption = screen.getByText("Metadata");
    expect(caption.tagName).toBe("SPAN");
    expect(caption).toHaveClass("text-xs", "text-muted-foreground");
  });

  it("can use the default tone", () => {
    render(<Caption tone="default">Strong</Caption>);
    expect(screen.getByText("Strong")).not.toHaveClass("text-muted-foreground");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <figure>
        <div aria-hidden />
        <figcaption>
          <Caption>Figure caption</Caption>
        </figcaption>
      </figure>,
    );
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
