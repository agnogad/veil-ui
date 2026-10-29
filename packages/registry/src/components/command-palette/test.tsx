import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { CommandPalette } from "./index";

describe("CommandPalette", () => {
  it("aliases Command Menu", async () => {
    render(
      <CommandPalette
        trigger={<button type="button">Open</button>}
        items={[{ label: "Search docs" }]}
      />,
    );

    await userEvent.click(screen.getByRole("button", { name: "Open" }));
    expect(
      screen.getByRole("dialog", { name: "Command menu" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Search docs")).toBeInTheDocument();
  });
});
