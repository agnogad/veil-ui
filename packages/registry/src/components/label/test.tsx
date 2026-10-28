import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { Label } from "./index";

describe("Label", () => {
  it("renders a label element", () => {
    render(<Label>Email</Label>);
    const label = screen.getByText("Email");
    expect(label.tagName).toBe("LABEL");
    expect(label).toHaveAttribute("data-slot", "label");
  });

  it("focuses the associated input when clicked", async () => {
    render(
      <>
        <Label htmlFor="email">Email</Label>
        <input id="email" />
      </>,
    );

    await userEvent.click(screen.getByText("Email"));
    expect(screen.getByRole("textbox")).toHaveFocus();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <>
        <Label htmlFor="email">Email</Label>
        <input id="email" />
      </>,
    );
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
