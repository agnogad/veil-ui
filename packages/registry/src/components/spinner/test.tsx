import { render, screen } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { Spinner } from "./index";

describe("Spinner", () => {
  it("exposes a status role", () => {
    render(<Spinner />);
    expect(screen.getByRole("status")).toHaveTextContent("Loading");
  });

  it("accepts a custom label", () => {
    render(<Spinner label="Saving" />);
    expect(screen.getByRole("status")).toHaveTextContent("Saving");
  });

  it("applies size variants", () => {
    render(<Spinner size="lg" data-testid="spinner" />);
    expect(screen.getByTestId("spinner").querySelector("svg")).toHaveClass(
      "size-6",
    );
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Spinner />);
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
