import { render, screen } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { ErrorState } from "./index";

describe("ErrorState", () => {
  it("renders the default message inside an alert region", () => {
    render(<ErrorState />);
    const region = screen.getByRole("alert");
    expect(region).toHaveAttribute("data-slot", "error-state");
    expect(
      screen.getByText("Something went wrong"),
    ).toBeInTheDocument();
  });

  it("renders a custom title and retry action", () => {
    render(
      <ErrorState
        title="Load failed"
        action={<button type="button">Retry</button>}
      />,
    );
    expect(screen.getByRole("button", { name: "Retry" })).toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<ErrorState />);
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
