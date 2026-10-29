import { render, screen } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import {
  DescriptionDetails,
  DescriptionList,
  DescriptionTerm,
} from "./index";

describe("DescriptionList", () => {
  it("renders dl, dt and dd elements", () => {
    render(
      <DescriptionList>
        <DescriptionTerm>License</DescriptionTerm>
        <DescriptionDetails>MIT</DescriptionDetails>
      </DescriptionList>,
    );
    expect(screen.getByText("License").tagName).toBe("DT");
    expect(screen.getByText("MIT").tagName).toBe("DD");
    expect(
      screen.getByText("MIT").closest("dl"),
    ).toHaveAttribute("data-slot", "description-list");
  });

  it("supports an inline layout", () => {
    const { container } = render(
      <DescriptionList layout="inline">
        <DescriptionTerm>Term</DescriptionTerm>
        <DescriptionDetails>Detail</DescriptionDetails>
      </DescriptionList>,
    );
    expect(container.querySelector("dl")).toHaveClass("sm:grid-cols-[minmax(6rem,auto)_1fr]");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <DescriptionList>
        <DescriptionTerm>Term</DescriptionTerm>
        <DescriptionDetails>Detail</DescriptionDetails>
      </DescriptionList>,
    );
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
