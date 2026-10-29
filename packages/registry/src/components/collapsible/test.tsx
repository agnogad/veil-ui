import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { Button } from "../button/index";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./index";

describe("Collapsible", () => {
  it("shows and hides its content", async () => {
    const user = userEvent.setup();
    render(
      <Collapsible>
        <CollapsibleTrigger asChild>
          <Button>Toggle details</Button>
        </CollapsibleTrigger>
        <CollapsibleContent>Hidden details</CollapsibleContent>
      </Collapsible>,
    );

    const trigger = screen.getByRole("button", { name: "Toggle details" });
    expect(screen.queryByText("Hidden details")).not.toBeInTheDocument();

    await user.click(trigger);
    expect(screen.getByText("Hidden details")).toBeInTheDocument();
    expect(trigger).toHaveAttribute("aria-expanded", "true");

    await user.click(trigger);
    expect(screen.queryByText("Hidden details")).not.toBeInTheDocument();
  });

  it("supports defaultOpen", () => {
    render(
      <Collapsible defaultOpen>
        <CollapsibleTrigger asChild>
          <Button>Toggle</Button>
        </CollapsibleTrigger>
        <CollapsibleContent>Visible by default</CollapsibleContent>
      </Collapsible>,
    );

    expect(screen.getByText("Visible by default")).toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    const user = userEvent.setup();
    const { container } = render(
      <Collapsible>
        <CollapsibleTrigger asChild>
          <Button>Toggle</Button>
        </CollapsibleTrigger>
        <CollapsibleContent>Details</CollapsibleContent>
      </Collapsible>,
    );
    await user.click(screen.getByRole("button", { name: "Toggle" }));

    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
