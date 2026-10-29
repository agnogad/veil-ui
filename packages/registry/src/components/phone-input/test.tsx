import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axe from "axe-core";
import { describe, expect, it, vi } from "vitest";

import { PhoneInput } from "./index";

describe("PhoneInput", () => {
  it("shows the default country dial code", () => {
    render(<PhoneInput defaultCountry="TR" />);
    expect(
      screen.getByRole("combobox", { name: "Country code" }),
    ).toHaveTextContent("+90");
  });

  it("reports typed digits", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<PhoneInput onValueChange={onValueChange} />);

    await user.type(
      screen.getByRole("textbox", { name: "Phone number" }),
      "555 123 4567",
    );

    expect(onValueChange).toHaveBeenLastCalledWith("555 123 4567");
  });

  it("drops characters that are not phone digits", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<PhoneInput onValueChange={onValueChange} />);

    await user.type(
      screen.getByRole("textbox", { name: "Phone number" }),
      "abc12",
    );

    expect(onValueChange).toHaveBeenLastCalledWith("12");
  });

  it("changes the country and dial code", async () => {
    const user = userEvent.setup();
    const onCountryChange = vi.fn();
    render(<PhoneInput onCountryChange={onCountryChange} />);

    await user.click(screen.getByRole("combobox", { name: "Country code" }));
    await user.click(await screen.findByRole("option", { name: /Germany/ }));

    expect(onCountryChange).toHaveBeenCalledWith("DE");
    expect(
      screen.getByRole("combobox", { name: "Country code" }),
    ).toHaveTextContent("+49");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<PhoneInput defaultCountry="TR" />);
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
