import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "./index";

function Fixture() {
  return (
    <Tabs defaultValue="one">
      <TabsList aria-label="Sections">
        <TabsTrigger value="one">One</TabsTrigger>
        <TabsTrigger value="two">Two</TabsTrigger>
      </TabsList>
      <TabsContent value="one">First panel</TabsContent>
      <TabsContent value="two">Second panel</TabsContent>
    </Tabs>
  );
}

describe("Tabs", () => {
  it("shows the default panel", () => {
    render(<Fixture />);
    expect(screen.getByText("First panel")).toBeVisible();
    expect(screen.getByRole("tab", { name: "One" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
  });

  it("switches panels on click", async () => {
    render(<Fixture />);
    await userEvent.click(screen.getByRole("tab", { name: "Two" }));
    expect(screen.getByText("Second panel")).toBeVisible();
    expect(screen.getByRole("tab", { name: "Two" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
  });

  it("supports arrow-key navigation", async () => {
    render(<Fixture />);
    await userEvent.tab();
    await userEvent.keyboard("{ArrowRight}");
    expect(screen.getByRole("tab", { name: "Two" })).toHaveFocus();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Fixture />);
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
