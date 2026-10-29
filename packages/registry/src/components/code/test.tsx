import { render, screen } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { Code } from "./index";

describe("Code", () => {
  it("renders a code element with monospace styles", () => {
    render(<Code>const x = 1</Code>);
    const code = screen.getByText("const x = 1");
    expect(code.tagName).toBe("CODE");
    expect(code).toHaveClass("font-mono", "bg-muted");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <p>
        Use <Code>cn()</Code> to merge classes.
      </p>,
    );
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
