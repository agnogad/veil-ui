import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { MobileNavbar } from "./index";

const links = [
  { label: "Home", href: "/", active: true },
  { label: "Docs", href: "/docs" },
];

describe("MobileNavbar", () => {
  it("renders the title and menu trigger", () => {
    render(<MobileNavbar title="Veil UI" links={links} />);
    expect(screen.getByText("Veil UI")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Open menu" })).toBeInTheDocument();
  });

  it("opens the navigation drawer", async () => {
    render(<MobileNavbar title="Veil UI" links={links} />);
    await userEvent.click(screen.getByRole("button", { name: "Open menu" }));

    expect(
      screen.getByRole("dialog", { name: "Veil UI" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute(
      "aria-current",
      "page",
    );
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <MobileNavbar title="Veil UI" links={links} />,
    );
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
