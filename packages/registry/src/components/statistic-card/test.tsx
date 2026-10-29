import { render } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { StatisticCardBasic } from "./demo";

describe("Statistic Card", () => {
  it("renders the basic example", () => {
    const { container } = render(<StatisticCardBasic />);
    expect(container).not.toBeEmptyDOMElement();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<StatisticCardBasic />);
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
