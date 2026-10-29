import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { MegaMenu } from "./index";

const items = [
  {
    label: "Products",
    columns: [
      {
        title: "Build",
        links: [{ label: "Components", href: "#components" }],
      },
    ],
  },
];

describe("MegaMenu", () => {
  it("renders the menu triggers", () => {
    render(<MegaMenu aria-label="Main" items={items} />);
    expect(screen.getByRole("button", { name: "Products" })).toBeInTheDocument();
  });

  it("shows the columns when opened", async () => {
    render(<MegaMenu aria-label="Main" items={items} />);
    await userEvent.click(screen.getByRole("button", { name: "Products" }));
    expect(
      await screen.findByRole("link", { name: "Components" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Build")).toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<MegaMenu aria-label="Main" items={items} />);
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
