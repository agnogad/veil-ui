import "@testing-library/jest-dom/vitest";
import axe from "axe-core";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

// jsdom has no layout engine, so axe cannot compute contrast or ligature
// metrics. Every other rule still runs.
axe.configure({
  rules: [{ id: "color-contrast", enabled: false }],
});

afterEach(() => {
  cleanup();
});
