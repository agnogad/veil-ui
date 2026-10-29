import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axe from "axe-core";
import { describe, expect, it, vi } from "vitest";

import { TableOfContents } from "./index";

const items = [
  { id: "intro", title: "Introduction" },
  { id: "usage", title: "Usage", level: 3 as const },
];

describe("TableOfContents", () => {
  it("renders links and marks the active section", () => {
    render(<TableOfContents items={items} activeId="usage" />);
    expect(
      screen.getByRole("navigation", { name: "On this page" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Usage" })).toHaveAttribute(
      "aria-current",
      "location",
    );
  });

  it("scrolls to the target section", async () => {
    const scrollIntoView = vi.fn();
    Element.prototype.scrollIntoView = scrollIntoView;
    render(
      <>
        <section id="intro">Intro</section>
        <TableOfContents items={items} />
      </>,
    );

    await userEvent.click(screen.getByRole("link", { name: "Introduction" }));
    expect(scrollIntoView).toHaveBeenCalledTimes(1);
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<TableOfContents items={items} />);
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
