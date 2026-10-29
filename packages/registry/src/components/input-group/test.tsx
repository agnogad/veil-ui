import { render, screen } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { Input } from "../input/index";
import { InputGroup, InputGroupAddon } from "./index";

describe("InputGroup", () => {
  it("renders an input with an addon", () => {
    render(
      <InputGroup>
        <InputGroupAddon>@</InputGroupAddon>
        <Input aria-label="Handle" />
      </InputGroup>,
    );

    expect(screen.getByRole("textbox", { name: "Handle" })).toBeInTheDocument();
    expect(screen.getByText("@")).toHaveAttribute(
      "data-slot",
      "input-group-addon",
    );
  });

  it("supports an end addon", () => {
    render(
      <InputGroup>
        <Input aria-label="Slug" />
        <InputGroupAddon align="inline-end">.dev</InputGroupAddon>
      </InputGroup>,
    );
    expect(screen.getByText(".dev")).toHaveAttribute("data-align", "inline-end");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <InputGroup>
        <label htmlFor="handle" className="sr-only">
          Handle
        </label>
        <InputGroupAddon>@</InputGroupAddon>
        <Input id="handle" />
      </InputGroup>,
    );
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
