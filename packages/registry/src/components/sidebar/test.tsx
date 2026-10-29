import { render, screen } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarItem,
} from "./index";

describe("Sidebar", () => {
  it("renders an aside with slots", () => {
    render(
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Workspace</SidebarGroupLabel>
            <SidebarItem href="#projects" active>
              Projects
            </SidebarItem>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>,
    );
    expect(screen.getByRole("complementary")).toHaveAttribute(
      "data-slot",
      "sidebar",
    );
    expect(screen.getByText("Workspace")).toHaveAttribute(
      "data-slot",
      "sidebar-group-label",
    );
    expect(screen.getByRole("link", { name: "Projects" })).toHaveAttribute(
      "aria-current",
      "page",
    );
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <Sidebar>
        <SidebarContent>
          <SidebarItem href="#docs">Docs</SidebarItem>
        </SidebarContent>
      </Sidebar>,
    );
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
