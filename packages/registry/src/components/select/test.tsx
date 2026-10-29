import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./index";

function Example() {
  return (
    <Select defaultValue="apple">
      <SelectTrigger aria-label="Fruit">
        <SelectValue placeholder="Pick a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="banana">Banana</SelectItem>
      </SelectContent>
    </Select>
  );
}

describe("Select", () => {
  it("shows the selected value on the trigger", () => {
    render(<Example />);
    expect(
      screen.getByRole("combobox", { name: "Fruit" }),
    ).toHaveTextContent("Apple");
  });

  it("opens the listbox and selects an option", async () => {
    const user = userEvent.setup();
    render(<Example />);

    await user.click(screen.getByRole("combobox", { name: "Fruit" }));
    const option = await screen.findByRole("option", { name: "Banana" });
    await user.click(option);

    expect(
      screen.getByRole("combobox", { name: "Fruit" }),
    ).toHaveTextContent("Banana");
  });

  it("has no accessibility violations when open", async () => {
    const user = userEvent.setup();
    render(<Example />);

    await user.click(screen.getByRole("combobox", { name: "Fruit" }));
    await screen.findByRole("option", { name: "Banana" });

    const results = await axe.run(document.body);
    expect(results.violations).toEqual([]);
  });
});
