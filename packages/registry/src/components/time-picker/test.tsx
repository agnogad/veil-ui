import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axe from "axe-core";
import { describe, expect, it, vi } from "vitest";

import { TimePicker } from "./index";

describe("TimePicker", () => {
  it("shows the placeholder when empty", () => {
    render(<TimePicker />);
    expect(screen.getByRole("button", { name: "Choose time" })).toHaveTextContent(
      "Pick a time",
    );
  });

  it("selects hours and minutes", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<TimePicker onValueChange={onValueChange} />);

    await user.click(screen.getByRole("button", { name: "Choose time" }));
    await user.click(screen.getByRole("option", { name: "10 hours" }));

    expect(onValueChange).toHaveBeenLastCalledWith("10:00");
    expect(
      screen.getByRole("option", { name: "10 hours" }),
    ).toHaveAttribute("aria-selected", "true");

    await user.click(screen.getByRole("option", { name: "30 minutes" }));

    expect(onValueChange).toHaveBeenLastCalledWith("10:30");
    expect(
      screen.getByRole("button", { name: "Choose time" }),
    ).toHaveTextContent("10:30");
  });

  it("respects the minute step", async () => {
    const user = userEvent.setup();
    render(<TimePicker defaultValue="08:00" minuteStep={15} />);

    await user.click(screen.getByRole("button", { name: "Choose time" }));

    expect(screen.getAllByRole("option", { name: /minutes/ })).toHaveLength(4);
  });

  it("closes with the Done button", async () => {
    const user = userEvent.setup();
    render(<TimePicker />);

    await user.click(screen.getByRole("button", { name: "Choose time" }));
    await user.click(screen.getByRole("button", { name: "Done" }));

    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    const user = userEvent.setup();
    render(<TimePicker defaultValue="09:30" />);
    await user.click(screen.getByRole("button", { name: "Choose time" }));

    const results = await axe.run(document.body);
    expect(results.violations).toEqual([]);
  });
});
