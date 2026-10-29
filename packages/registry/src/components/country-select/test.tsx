import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axe from "axe-core";
import { describe, expect, it, vi } from "vitest";

import { CountrySelect } from "./index";

describe("CountrySelect", () => {
  it("shows the placeholder when empty", () => {
    render(<CountrySelect />);
    expect(
      screen.getByRole("combobox", { name: "Country" }),
    ).toHaveTextContent("Select a country");
  });

  it("searches and selects a country", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<CountrySelect onValueChange={onValueChange} />);

    await user.click(screen.getByRole("combobox", { name: "Country" }));
    await user.type(
      screen.getByPlaceholderText("Search countries..."),
      "Turk",
    );

    const option = await screen.findByRole("option", { name: /Turkey/ });
    await user.click(option);

    expect(onValueChange).toHaveBeenCalledWith("TR");
    expect(
      screen.getByRole("combobox", { name: "Country" }),
    ).toHaveTextContent("Turkey");
  });

  it("shows the dial code in dial mode", () => {
    render(<CountrySelect display="dial" defaultValue="GB" />);
    expect(
      screen.getByRole("combobox", { name: "Country" }),
    ).toHaveTextContent("+44");
  });

  it("has no accessibility violations", async () => {
    const user = userEvent.setup();
    render(<CountrySelect defaultValue="TR" />);
    await user.click(screen.getByRole("combobox", { name: "Country" }));

    const results = await axe.run(document.body);
    expect(results.violations).toEqual([]);
  });
});
