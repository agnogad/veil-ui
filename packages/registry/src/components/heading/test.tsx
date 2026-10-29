import { render, screen } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { Heading } from "./index";

describe("Heading", () => {
  it("renders an h2 by default", () => {
    render(<Heading>Title</Heading>);
    const heading = screen.getByRole("heading", { name: "Title", level: 2 });
    expect(heading).toHaveAttribute("data-slot", "heading");
  });

  it("maps levels to elements and sizes", () => {
    render(<Heading level={4}>Section</Heading>);
    const heading = screen.getByRole("heading", { name: "Section", level: 4 });
    expect(heading).toHaveClass("text-xl");
  });

  it("lets size override the level", () => {
    render(
      <Heading level={6} size={1}>
        Big
      </Heading>,
    );
    expect(screen.getByRole("heading", { level: 6 })).toHaveClass("text-4xl");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <div>
        <Heading level={1}>Page title</Heading>
      </div>,
    );
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
