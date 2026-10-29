import { render, screen } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "./index";

describe("ResizablePanel", () => {
  it("renders a group with panels and a handle", () => {
    render(
      <ResizablePanelGroup data-testid="group">
        <ResizablePanel>One</ResizablePanel>
        <ResizableHandle />
        <ResizablePanel>Two</ResizablePanel>
      </ResizablePanelGroup>,
    );
    expect(screen.getByTestId("group")).toHaveAttribute(
      "data-slot",
      "resizable-panel-group",
    );
    expect(
      document.querySelectorAll('[data-slot="resizable-panel"]'),
    ).toHaveLength(2);
    expect(document.querySelector('[data-slot="resizable-handle"]')).toBeInTheDocument();
  });

  it("supports vertical groups", () => {
    render(
      <ResizablePanelGroup orientation="vertical" data-testid="group">
        <ResizablePanel>Top</ResizablePanel>
        <ResizableHandle />
        <ResizablePanel>Bottom</ResizablePanel>
      </ResizablePanelGroup>,
    );
    expect(screen.getByTestId("group")).toHaveClass("flex-col");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <ResizablePanelGroup className="h-40">
        <ResizablePanel>
          <p>One</p>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel>
          <p>Two</p>
        </ResizablePanel>
      </ResizablePanelGroup>,
    );
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
