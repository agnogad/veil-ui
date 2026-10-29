import { render, screen } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { AppShell } from "./index";

describe("AppShell", () => {
  it("renders a main region", () => {
    render(<AppShell>Content</AppShell>);
    expect(screen.getByRole("main")).toHaveTextContent("Content");
  });

  it("renders optional header and sidebar", () => {
    render(
      <AppShell header="Header" sidebar="Sidebar">
        Main
      </AppShell>,
    );
    expect(screen.getByText("Header")).toBeInTheDocument();
    expect(screen.getByText("Sidebar")).toBeInTheDocument();
    expect(
      document.querySelector('[data-slot="app-shell-sidebar"]'),
    ).toBeInTheDocument();
  });

  it("applies sidebar width presets", () => {
    render(
      <AppShell sidebar="Sidebar" sidebarWidth="lg" data-testid="shell">
        Main
      </AppShell>,
    );
    expect(screen.getByTestId("shell")).toContainElement(
      screen.getByText("Sidebar"),
    );
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <AppShell header={<h1>Title</h1>} sidebar={<nav>Navigation</nav>}>
        <h2>Content</h2>
      </AppShell>,
    );
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
