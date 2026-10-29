import { render, screen } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { FormActions } from "./index";

describe("FormActions", () => {
  it("right-aligns actions by default", () => {
    render(<FormActions data-testid="actions" />);
    const actions = screen.getByTestId("actions");
    expect(actions).toHaveClass("justify-end");
    expect(actions).toHaveAttribute("data-align", "end");
  });

  it("supports split alignment", () => {
    render(<FormActions align="between" data-testid="actions" />);
    expect(screen.getByTestId("actions")).toHaveClass("justify-between");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <FormActions>
        <button type="button">Cancel</button>
        <button type="submit">Save</button>
      </FormActions>,
    );
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
