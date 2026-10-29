import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axe from "axe-core";
import { describe, expect, it, vi } from "vitest";

import { MultiSelect } from "./index";

const options = [
  { value: "design", label: "Design" },
  { value: "engineering", label: "Engineering" },
];

describe("MultiSelect", () => {
  it("opens and toggles options", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <MultiSelect
        options={options}
        label="Teams"
        defaultValue={["design"]}
        onValueChange={onValueChange}
      />,
    );

    const trigger = screen.getByRole("combobox");
    expect(trigger).toHaveTextContent("Design");

    await user.click(trigger);
    await user.click(
      screen.getByRole("checkbox", { name: "Engineering" }),
    );

    expect(onValueChange).toHaveBeenCalledWith(["design", "engineering"]);
    expect(screen.getByRole("combobox")).toHaveTextContent(
      "Design, Engineering",
    );
  });

  it("clears the selection", async () => {
    const user = userEvent.setup();
    render(
      <MultiSelect
        options={options}
        label="Teams"
        defaultValue={["design", "engineering"]}
      />,
    );

    await user.click(screen.getByRole("combobox"));
    await user.click(screen.getByRole("button", { name: "Clear selection" }));

    expect(screen.getByRole("combobox")).toHaveTextContent("Select options");
  });

  it("has no accessibility violations when open", async () => {
    const user = userEvent.setup();
    render(<MultiSelect options={options} label="Teams" />);

    await user.click(screen.getByRole("combobox"));
    const results = await axe.run(document.body);
    expect(results.violations).toEqual([]);
  });
});
