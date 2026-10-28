import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { Button } from "../button/index";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./index";

function Fixture() {
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button>Hover</Button>
        </TooltipTrigger>
        <TooltipContent>Helpful text</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

describe("Tooltip", () => {
  it("is hidden by default", () => {
    render(<Fixture />);
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
  });

  it("opens on keyboard focus", async () => {
    render(<Fixture />);
    await userEvent.tab();
    expect(await screen.findByRole("tooltip")).toHaveTextContent("Helpful text");
  });

  it("describes the trigger", async () => {
    render(<Fixture />);
    await userEvent.tab();
    const trigger = screen.getByRole("button", { name: "Hover" });
    expect(trigger).toHaveAttribute("aria-describedby");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Fixture />);
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
