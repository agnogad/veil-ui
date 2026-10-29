import { render, screen } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { StatusBadge } from "./index";

describe("StatusBadge", () => {
  it("renders the label with its status", () => {
    render(<StatusBadge status="success">Active</StatusBadge>);
    const badge = screen.getByText("Active");
    expect(badge).toHaveAttribute("data-slot", "status-badge");
    expect(badge).toHaveAttribute("data-status", "success");
    expect(badge).toHaveClass("text-emerald-700");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <StatusBadge status="danger">Failed</StatusBadge>,
    );
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
