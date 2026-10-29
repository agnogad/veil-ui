import { render } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { AttachmentBasic } from "./demo";

describe("Attachment", () => {
  it("renders the basic example", () => {
    const { container } = render(<AttachmentBasic />);
    expect(container).not.toBeEmptyDOMElement();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<AttachmentBasic />);
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
