import { render, screen } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { LoadingOverlay } from "./index";

describe("LoadingOverlay", () => {
  it("renders a busy status with its label", () => {
    const { container } = render(<LoadingOverlay label="Saving" />);
    expect(container.firstChild).toHaveAttribute("aria-busy", "true");
    expect(screen.getByRole("status")).toBeInTheDocument();
    expect(screen.getAllByText("Saving").length).toBeGreaterThan(0);
  });

  it("renders nothing when hidden", () => {
    const { container } = render(<LoadingOverlay visible={false} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<LoadingOverlay label="Loading" />);
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
