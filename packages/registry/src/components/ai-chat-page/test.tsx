import { render } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { AiChatPageBasic } from "./demo";

describe("AI Chat Page", () => {
  it("renders the basic example", () => {
    const { container } = render(<AiChatPageBasic />);
    expect(container).not.toBeEmptyDOMElement();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<AiChatPageBasic />);
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
