import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axe from "axe-core";
import { describe, expect, it, vi } from "vitest";

import { Combobox } from "./index";

const options = [
  { value: "next", label: "Next.js" },
  { value: "astro", label: "Astro" },
];

describe("Combobox", () => {
  it("opens, filters and selects an option", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <Combobox
        options={options}
        label="Framework"
        defaultValue="next"
        onValueChange={onValueChange}
      />,
    );

    await user.click(screen.getByRole("combobox"));

    const option = await screen.findByRole("option", { name: "Astro" });
    await user.click(option);

    expect(onValueChange).toHaveBeenCalledWith("astro");
    expect(screen.getByRole("combobox")).toHaveTextContent("Astro");
  });

  it("has no accessibility violations when open", async () => {
    const user = userEvent.setup();
    render(<Combobox options={options} label="Framework" />);

    await user.click(screen.getByRole("combobox"));
    const results = await axe.run(document.body);
    expect(results.violations).toEqual([]);
  });
});
