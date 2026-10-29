import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { RadioGroup, RadioGroupItem } from "./index";

function Example() {
  return (
    <RadioGroup defaultValue="a" aria-label="Choice">
      <RadioGroupItem value="a" aria-label="Option A" />
      <RadioGroupItem value="b" aria-label="Option B" />
    </RadioGroup>
  );
}

describe("RadioGroup", () => {
  it("checks the default value", () => {
    render(<Example />);
    expect(
      screen.getByRole("radio", { name: "Option A" }),
    ).toHaveAttribute("data-state", "checked");
  });

  it("selects another option on click", async () => {
    const user = userEvent.setup();
    render(<Example />);

    await user.click(screen.getByRole("radio", { name: "Option B" }));
    expect(
      screen.getByRole("radio", { name: "Option B" }),
    ).toHaveAttribute("data-state", "checked");
    expect(
      screen.getByRole("radio", { name: "Option A" }),
    ).toHaveAttribute("data-state", "unchecked");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Example />);
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
