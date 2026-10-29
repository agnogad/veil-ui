import { render, screen } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { StatusIndicator } from "./index";

describe("StatusIndicator", () => {
  it("renders the status label", () => {
    render(<StatusIndicator status="busy" label="In a meeting" />);
    expect(screen.getByText("In a meeting")).toBeInTheDocument();
    expect(screen.getByText("In a meeting").closest("span")).toHaveAttribute(
      "data-status",
      "busy",
    );
  });

  it("falls back to the status name", () => {
    render(<StatusIndicator status="away" />);
    expect(screen.getByText("away")).toBeInTheDocument();
  });

  it("adds a ping animation when pulsing", () => {
    const { container } = render(<StatusIndicator pulse />);
    expect(container.querySelector(".animate-ping")).not.toBeNull();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <StatusIndicator status="online" label="Online" pulse />,
    );
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
