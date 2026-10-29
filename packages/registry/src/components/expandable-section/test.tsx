import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { ExpandableSection } from "./index";

describe("ExpandableSection", () => {
  it("expands and collapses", async () => {
    const user = userEvent.setup();
    render(
      <ExpandableSection title="Advanced" description="Extra options">
        <p>Hidden body</p>
      </ExpandableSection>,
    );

    const trigger = screen.getByRole("button", {
      name: /Advanced/,
    });
    expect(screen.getByText("Extra options")).toBeInTheDocument();
    expect(screen.queryByText("Hidden body")).not.toBeInTheDocument();

    await user.click(trigger);
    expect(screen.getByText("Hidden body")).toBeInTheDocument();
    expect(trigger).toHaveAttribute("aria-expanded", "true");

    await user.click(trigger);
    expect(screen.queryByText("Hidden body")).not.toBeInTheDocument();
  });

  it("supports defaultOpen", () => {
    render(
      <ExpandableSection title="Address" defaultOpen>
        <p>Visible body</p>
      </ExpandableSection>,
    );
    expect(screen.getByText("Visible body")).toBeInTheDocument();
  });

  it("cannot be toggled when disabled", async () => {
    const user = userEvent.setup();
    render(
      <ExpandableSection title="Locked" disabled>
        <p>Body</p>
      </ExpandableSection>,
    );

    const trigger = screen.getByRole("button", { name: "Locked" });
    expect(trigger).toBeDisabled();
    await user.click(trigger);
    expect(screen.queryByText("Body")).not.toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    const user = userEvent.setup();
    const { container } = render(
      <ExpandableSection title="Advanced" description="Extra options">
        <p>Body</p>
      </ExpandableSection>,
    );
    await user.click(screen.getByRole("button", { name: /Advanced/ }));

    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
