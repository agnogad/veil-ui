import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { TabBar, TabBarContent, TabBarItem, TabBarList } from "./index";

describe("TabBar", () => {
  it("re-exports the Tabs primitives", () => {
    render(
      <TabBar defaultValue="overview">
        <TabBarList>
          <TabBarItem value="overview">Overview</TabBarItem>
        </TabBarList>
        <TabBarContent value="overview">Project overview.</TabBarContent>
      </TabBar>,
    );

    expect(screen.getByRole("tab", { name: "Overview" })).toHaveAttribute(
      "data-slot",
      "tabs-trigger",
    );
  });
});
