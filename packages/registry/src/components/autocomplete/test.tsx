import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axe from "axe-core";
import { describe, expect, it, vi } from "vitest";

import { Autocomplete } from "./index";

const options = [
  { value: "berlin", label: "Berlin" },
  { value: "lisbon", label: "Lisbon" },
];

describe("Autocomplete", () => {
  it("filters options as the user types", async () => {
    const user = userEvent.setup();
    render(<Autocomplete options={options} aria-label="City" />);

    const input = screen.getByRole("combobox", { name: "City" });
    await user.type(input, "lis");

    expect(
      await screen.findByRole("option", { name: "Lisbon" }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("option", { name: "Berlin" }),
    ).not.toBeInTheDocument();
  });

  it("selects with the keyboard", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <Autocomplete
        options={options}
        aria-label="City"
        onValueChange={onValueChange}
      />,
    );

    const input = screen.getByRole("combobox", { name: "City" });
    await user.type(input, "ber");
    await user.keyboard("{ArrowDown}{Enter}");

    expect(onValueChange).toHaveBeenCalledWith("berlin", options[0]);
    expect(input).toHaveValue("Berlin");
  });

  it("selects with a pointer", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <Autocomplete
        options={options}
        aria-label="City"
        onValueChange={onValueChange}
      />,
    );

    await user.click(screen.getByRole("combobox", { name: "City" }));
    await user.click(await screen.findByRole("option", { name: "Lisbon" }));

    expect(onValueChange).toHaveBeenCalledWith("lisbon", options[1]);
  });

  it("shows the empty message", async () => {
    const user = userEvent.setup();
    render(<Autocomplete options={options} aria-label="City" />);

    await user.type(
      screen.getByRole("combobox", { name: "City" }),
      "zzz",
    );

    expect(screen.getByText("No matches found.")).toBeInTheDocument();
  });

  it("has no accessibility violations when open", async () => {
    const user = userEvent.setup();
    const { container } = render(
      <Autocomplete options={options} aria-label="City" />,
    );

    await user.click(screen.getByRole("combobox", { name: "City" }));
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
