import { render, screen } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { Blockquote } from "./index";

describe("Blockquote", () => {
  it("renders a blockquote element", () => {
    render(<Blockquote>Quote</Blockquote>);
    const quote = screen.getByText("Quote");
    expect(quote.tagName).toBe("BLOCKQUOTE");
    expect(quote).toHaveAttribute("data-slot", "blockquote");
  });

  it("renders the citation with a cite link", () => {
    render(<Blockquote cite="Ada Lovelace">Insight</Blockquote>);
    const cite = screen.getByText("Ada Lovelace");
    expect(cite.tagName).toBe("CITE");
    expect(screen.getByText("Insight").closest("blockquote")).toHaveAttribute(
      "cite",
      "Ada Lovelace",
    );
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <Blockquote cite="Source">
        <p>Quoted content</p>
      </Blockquote>,
    );
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
