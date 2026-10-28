import { render, screen } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { Progress } from "./index";

describe("Progress", () => {
  it("exposes the progressbar role and value", () => {
    render(<Progress value={42} aria-label="Upload" />);
    const bar = screen.getByRole("progressbar", { name: "Upload" });
    expect(bar).toHaveAttribute("aria-valuenow", "42");
  });

  it("moves the indicator according to the value", () => {
    render(<Progress value={25} data-testid="progress" />);
    const indicator = screen.getByTestId("progress").firstElementChild;
    expect(indicator).toHaveStyle({ transform: "translateX(-75%)" });
  });

  it("handles a missing value", () => {
    render(<Progress aria-label="Loading" data-testid="progress" />);

    const bar = screen.getByRole("progressbar");
    expect(bar).not.toHaveAttribute("aria-valuenow");
    expect(screen.getByTestId("progress").firstElementChild).toHaveStyle({
      transform: "translateX(-100%)",
    });
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Progress value={50} aria-label="Upload" />);
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
