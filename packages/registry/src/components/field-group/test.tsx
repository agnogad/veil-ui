import { render, screen } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { FieldGroup, FieldGroupLegend, FieldGroupRow } from "./index";

describe("FieldGroup", () => {
  it("renders a fieldset with a legend", () => {
    render(
      <FieldGroup>
        <FieldGroupLegend>Workspace</FieldGroupLegend>
      </FieldGroup>,
    );
    expect(screen.getByRole("group", { name: "Workspace" })).toHaveAttribute(
      "data-slot",
      "field-group",
    );
  });

  it("disables every control inside", () => {
    render(
      <FieldGroup disabled>
        <input aria-label="Name" />
      </FieldGroup>,
    );
    expect(screen.getByLabelText("Name")).toBeDisabled();
  });

  it("lays out rows in two columns", () => {
    render(<FieldGroupRow data-testid="row" />);
    expect(screen.getByTestId("row")).toHaveClass("sm:grid-cols-2");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <FieldGroup>
        <FieldGroupLegend>Contact</FieldGroupLegend>
        <label htmlFor="email">Email</label>
        <input id="email" type="email" />
      </FieldGroup>,
    );
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
