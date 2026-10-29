import { render, screen } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { SuccessState } from "./index";

describe("SuccessState", () => {
  it("renders as a status region with the default title", () => {
    render(<SuccessState />);
    const region = screen.getByRole("status");
    expect(region).toHaveAttribute("data-slot", "success-state");
    expect(screen.getByText("All done")).toBeInTheDocument();
  });

  it("renders a custom description and action", () => {
    render(
      <SuccessState
        title="Saved"
        description="Your profile was updated."
        action={<button type="button">Continue</button>}
      />,
    );
    expect(screen.getByText("Your profile was updated.")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Continue" }),
    ).toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<SuccessState title="Saved" />);
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
