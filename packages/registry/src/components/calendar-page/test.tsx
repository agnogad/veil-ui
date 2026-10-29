import { render } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { CalendarPageBasic } from "./demo";

describe("Calendar Page", () => {
  it("renders the basic example", () => {
    const { container } = render(<CalendarPageBasic />);
    expect(container).not.toBeEmptyDOMElement();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<CalendarPageBasic />);
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
