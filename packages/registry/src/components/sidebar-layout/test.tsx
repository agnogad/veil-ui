import { render, screen } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { SidebarLayout } from "./index";

describe("SidebarLayout", () => {
  it("renders a sidebar and content", () => {
    render(
      <SidebarLayout sidebar="Nav">
        <p>Content</p>
      </SidebarLayout>,
    );
    expect(screen.getByText("Nav")).toBeInTheDocument();
    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("supports a header and an end sidebar", () => {
    render(
      <SidebarLayout
        sidebar="Nav"
        header="Heading"
        sidebarPosition="end"
        data-testid="layout"
      >
        <p>Content</p>
      </SidebarLayout>,
    );
    expect(screen.getByText("Heading")).toBeInTheDocument();
    const layout = screen.getByTestId("layout");
    expect(layout.lastElementChild).toHaveAttribute(
      "data-slot",
      "sidebar-layout-sidebar",
    );
    expect(layout).toHaveClass("lg:grid-cols-[1fr_260px]");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <SidebarLayout sidebar={<nav>Navigation</nav>}>
        <h1>Docs</h1>
      </SidebarLayout>,
    );
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
