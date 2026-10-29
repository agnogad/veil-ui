import { render, screen } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { Button } from "../button/index";
import { ButtonGroup } from "./index";

describe("ButtonGroup", () => {
  it("renders a labeled group", () => {
    render(
      <ButtonGroup aria-label="Pagination">
        <Button>Previous</Button>
        <Button>Next</Button>
      </ButtonGroup>,
    );

    const group = screen.getByRole("group", { name: "Pagination" });
    expect(group).toHaveAttribute("data-orientation", "horizontal");
  });

  it("supports vertical orientation", () => {
    render(
      <ButtonGroup orientation="vertical" aria-label="Layout">
        <Button>Day</Button>
        <Button>Week</Button>
      </ButtonGroup>,
    );
    expect(screen.getByRole("group")).toHaveAttribute(
      "data-orientation",
      "vertical",
    );
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <ButtonGroup aria-label="Pagination">
        <Button>Previous</Button>
        <Button>Next</Button>
      </ButtonGroup>,
    );
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
