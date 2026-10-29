import { render, screen } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { SplitLayout } from "./index";

describe("SplitLayout", () => {
  it("renders main content and an aside", () => {
    render(
      <SplitLayout aside="Aside">
        <p>Main</p>
      </SplitLayout>,
    );
    expect(screen.getByText("Main")).toBeInTheDocument();
    expect(screen.getByText("Aside")).toBeInTheDocument();
    expect(
      document.querySelector('[data-slot="split-layout-aside"]'),
    ).toBeInTheDocument();
  });

  it("moves the aside to the start", () => {
    render(
      <SplitLayout aside="Aside" asidePosition="start" data-testid="split">
        <p>Main</p>
      </SplitLayout>,
    );
    const split = screen.getByTestId("split");
    expect(split.firstElementChild).toHaveAttribute(
      "data-slot",
      "split-layout-aside",
    );
    expect(split).toHaveClass("lg:grid-cols-[320px_1fr]");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <SplitLayout aside={<nav>Navigation</nav>}>
        <h1>Title</h1>
      </SplitLayout>,
    );
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
