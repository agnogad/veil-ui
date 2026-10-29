import { render } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { QrcodeBasic } from "./demo";

describe("QR Code", () => {
  it("renders the basic example", () => {
    const { container } = render(<QrcodeBasic />);
    expect(container).not.toBeEmptyDOMElement();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<QrcodeBasic />);
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
