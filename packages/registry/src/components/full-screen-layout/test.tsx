import { render, screen } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { FullScreenLayout } from "./index";

describe("FullScreenLayout", () => {
  it("renders a full-height main region", () => {
    render(<FullScreenLayout>Content</FullScreenLayout>);
    const layout = screen.getByRole("main").parentElement;
    expect(layout).toHaveAttribute("data-slot", "full-screen-layout");
    expect(layout).toHaveClass("min-h-dvh");
  });

  it("centers content when requested", () => {
    render(<FullScreenLayout centered>Content</FullScreenLayout>);
    expect(screen.getByRole("main")).toHaveClass(
      "items-center",
      "justify-center",
    );
  });

  it("renders header and footer", () => {
    render(
      <FullScreenLayout header="Header" footer="Footer">
        Content
      </FullScreenLayout>,
    );
    expect(screen.getByText("Header")).toBeInTheDocument();
    expect(screen.getByText("Footer")).toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <FullScreenLayout header={<h1>Title</h1>}>
        <h2>Content</h2>
      </FullScreenLayout>,
    );
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
