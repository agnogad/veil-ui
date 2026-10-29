import { render } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { NotificationCardBasic } from "./demo";

describe("Notification Card", () => {
  it("renders the basic example", () => {
    const { container } = render(<NotificationCardBasic />);
    expect(container).not.toBeEmptyDOMElement();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<NotificationCardBasic />);
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
