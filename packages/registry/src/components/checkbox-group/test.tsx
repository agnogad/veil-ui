import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axe from "axe-core";
import { describe, expect, it, vi } from "vitest";

import { CheckboxGroup } from "./index";

const options = [
  { value: "news", label: "Product news" },
  { value: "tips", label: "Tips" },
];

describe("CheckboxGroup", () => {
  it("renders a labelled group with its options", () => {
    render(<CheckboxGroup label="Preferences" options={options} />);
    expect(
      screen.getByRole("group", { name: "Preferences" }),
    ).toHaveAttribute("data-slot", "checkbox-group");
    expect(screen.getByRole("checkbox", { name: "Product news" })).toBeInTheDocument();
  });

  it("updates uncontrolled selection", async () => {
    const user = userEvent.setup();
    render(<CheckboxGroup label="Preferences" options={options} />);

    await user.click(screen.getByRole("checkbox", { name: "Tips" }));
    expect(screen.getByRole("checkbox", { name: "Tips" })).toHaveAttribute(
      "data-state",
      "checked",
    );
  });

  it("reports controlled changes", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <CheckboxGroup
        label="Preferences"
        options={options}
        value={["news"]}
        onValueChange={onValueChange}
      />,
    );

    await user.click(screen.getByRole("checkbox", { name: "Tips" }));
    expect(onValueChange).toHaveBeenCalledWith(["news", "tips"]);
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <CheckboxGroup label="Preferences" options={options} />,
    );
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
