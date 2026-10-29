import { render, screen } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { CircularProgress } from "./index";

describe("CircularProgress", () => {
  it("exposes the clamped progress value", () => {
    render(<CircularProgress value={140} label="Upload" />);
    const progress = screen.getByRole("progressbar", { name: "Upload" });
    expect(progress).toHaveAttribute("aria-valuenow", "100");
  });

  it("shows the percentage when requested", () => {
    render(<CircularProgress value={65} showValue />);
    expect(screen.getByText("65%")).toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<CircularProgress value={50} label="Progress" />);
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
