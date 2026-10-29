import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { CommandMenu } from "./index";

describe("CommandMenu", () => {
  it("opens from its trigger and filters items", async () => {
    render(
      <CommandMenu
        trigger={<button type="button">Open</button>}
        items={[
          { label: "Calendar" },
          { label: "Settings" },
        ]}
      />,
    );

    await userEvent.click(screen.getByRole("button", { name: "Open" }));
    expect(
      screen.getByRole("dialog", { name: "Command menu" }),
    ).toBeInTheDocument();

    await userEvent.type(
      screen.getByRole("combobox", { name: "Search commands…" }),
      "sett",
    );
    expect(screen.getByText("Settings")).toBeInTheDocument();
    expect(screen.queryByText("Calendar")).toBeNull();
  });

  it("runs the selected command and closes", async () => {
    const onSelect = vi.fn();
    render(
      <CommandMenu
        trigger={<button type="button">Open</button>}
        items={[{ label: "Settings", onSelect }]}
      />,
    );

    await userEvent.click(screen.getByRole("button", { name: "Open" }));
    await userEvent.click(screen.getByText("Settings"));

    expect(onSelect).toHaveBeenCalledTimes(1);
    await waitFor(() =>
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
    );
  });
});
