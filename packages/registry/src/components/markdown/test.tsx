import { render, screen } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { Markdown } from "./index";

describe("Markdown", () => {
  it("renders headings, emphasis and links", () => {
    render(
      <Markdown>
        {"## Title\n\nSome **bold** text and a [link](/docs)."}
      </Markdown>,
    );
    expect(
      screen.getByRole("heading", { name: "Title", level: 2 }),
    ).toBeInTheDocument();
    expect(screen.getByText("bold").tagName).toBe("STRONG");
    expect(screen.getByRole("link", { name: "link" })).toHaveAttribute(
      "href",
      "/docs",
    );
  });

  it("renders GFM tables", () => {
    render(
      <Markdown>
        {"| A | B |\n| --- | --- |\n| 1 | 2 |"}
      </Markdown>,
    );
    expect(screen.getByRole("table")).toBeInTheDocument();
    expect(screen.getByRole("cell", { name: "1" })).toBeInTheDocument();
  });

  it("styles inline code", () => {
    render(<Markdown>{"Use `cn()` here."}</Markdown>);
    expect(screen.getByText("cn()")).toHaveClass("bg-muted", "font-mono");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <Markdown>{"# Title\n\nA paragraph with [a link](/docs)."}</Markdown>,
    );
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
