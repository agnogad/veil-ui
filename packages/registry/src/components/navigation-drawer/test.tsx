import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { NavigationDrawer } from "./index";

describe("NavigationDrawer", () => {
  it("opens from its trigger", async () => {
    render(
      <NavigationDrawer
        title="Navigation"
        trigger={<button type="button">Open</button>}
      >
        <a href="#docs">Docs</a>
      </NavigationDrawer>,
    );

    await userEvent.click(screen.getByRole("button", { name: "Open" }));
    expect(
      screen.getByRole("dialog", { name: "Navigation" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Docs" })).toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <NavigationDrawer
        title="Navigation"
        trigger={<button type="button">Open</button>}
      >
        <a href="#docs">Docs</a>
      </NavigationDrawer>,
    );
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
