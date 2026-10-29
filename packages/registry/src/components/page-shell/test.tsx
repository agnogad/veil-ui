import { render, screen } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { PageShell } from "./index";

describe("PageShell", () => {
  it("renders main content", () => {
    render(<PageShell>Content</PageShell>);
    expect(screen.getByRole("main")).toHaveTextContent("Content");
  });

  it("renders optional header and footer", () => {
    render(
      <PageShell header="Header" footer="Footer">
        Main
      </PageShell>,
    );
    expect(screen.getByText("Header")).toBeInTheDocument();
    expect(screen.getByText("Footer")).toBeInTheDocument();
  });

  it("applies size presets", () => {
    render(
      <PageShell size="sm" data-testid="shell">
        Main
      </PageShell>,
    );
    expect(screen.getByTestId("shell").querySelector("main div")).toHaveClass(
      "max-w-3xl",
    );
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <PageShell header={<h1>Title</h1>} footer={<p>Footer</p>}>
        <h2>Content</h2>
      </PageShell>,
    );
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
