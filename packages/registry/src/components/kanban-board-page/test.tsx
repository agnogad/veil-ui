import { render } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { KanbanBoardPageBasic } from "./demo";

describe("Kanban Board Page", () => {
  it("renders the basic example", () => {
    const { container } = render(<KanbanBoardPageBasic />);
    expect(container).not.toBeEmptyDOMElement();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<KanbanBoardPageBasic />);
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
