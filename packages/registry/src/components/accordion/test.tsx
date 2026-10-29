import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./index";

function Example({
  type = "single",
}: {
  type?: "single" | "multiple";
}) {
  return (
    <Accordion
      type={type}
      {...(type === "single" ? { collapsible: true } : {})}
      className="w-full"
    >
      <AccordionItem value="one">
        <AccordionTrigger>First panel</AccordionTrigger>
        <AccordionContent>First content</AccordionContent>
      </AccordionItem>
      <AccordionItem value="two">
        <AccordionTrigger>Second panel</AccordionTrigger>
        <AccordionContent>Second content</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

describe("Accordion", () => {
  it("expands and collapses a panel", async () => {
    const user = userEvent.setup();
    render(<Example />);

    const trigger = screen.getByRole("button", { name: "First panel" });
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByText("First content")).not.toBeInTheDocument();

    await user.click(trigger);

    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText("First content")).toBeInTheDocument();

    await user.click(trigger);
    expect(screen.queryByText("First content")).not.toBeInTheDocument();
  });

  it("closes the previous panel in single mode", async () => {
    const user = userEvent.setup();
    render(<Example />);

    await user.click(screen.getByRole("button", { name: "First panel" }));
    await user.click(screen.getByRole("button", { name: "Second panel" }));

    expect(screen.queryByText("First content")).not.toBeInTheDocument();
    expect(screen.getByText("Second content")).toBeInTheDocument();
  });

  it("keeps multiple panels open", async () => {
    const user = userEvent.setup();
    render(<Example type="multiple" />);

    await user.click(screen.getByRole("button", { name: "First panel" }));
    await user.click(screen.getByRole("button", { name: "Second panel" }));

    expect(screen.getByText("First content")).toBeInTheDocument();
    expect(screen.getByText("Second content")).toBeInTheDocument();
  });

  it("toggles with the keyboard", async () => {
    const user = userEvent.setup();
    render(<Example />);

    const trigger = screen.getByRole("button", { name: "First panel" });
    trigger.focus();
    await user.keyboard("{Enter}");

    expect(trigger).toHaveAttribute("aria-expanded", "true");
  });

  it("has no accessibility violations", async () => {
    const user = userEvent.setup();
    const { container } = render(<Example />);
    await user.click(screen.getByRole("button", { name: "First panel" }));

    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
