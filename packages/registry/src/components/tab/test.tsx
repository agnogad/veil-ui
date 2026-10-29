import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { Tab, TabContent, TabList, TabTrigger } from "./index";

describe("Tab", () => {
  it("re-exports the Tabs primitives and switches panels", async () => {
    const user = userEvent.setup();
    render(
      <Tab defaultValue="account">
        <TabList>
          <TabTrigger value="account">Account</TabTrigger>
          <TabTrigger value="password">Password</TabTrigger>
        </TabList>
        <TabContent value="account">Account panel</TabContent>
        <TabContent value="password">Password panel</TabContent>
      </Tab>,
    );

    expect(screen.getByRole("tablist")).toHaveAttribute(
      "data-slot",
      "tabs-list",
    );
    await user.click(screen.getByRole("tab", { name: "Password" }));
    expect(screen.getByText("Password panel")).toBeVisible();
  });
});
