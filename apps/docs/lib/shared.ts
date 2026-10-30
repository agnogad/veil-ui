export const appName = "Veil UI";

/** Set to e.g. `/veil-ui` for GitHub Pages, empty for local dev. */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Prefix hand-written absolute paths with the deployment base path. */
export const withBasePath = (url: string) =>
  url.startsWith("/") && !url.startsWith("//") ? `${basePath}${url}` : url;

export const docsRoute = "/docs";

export const gitConfig = {
  user: "veil-ui",
  repo: "veil-ui",
  branch: "main",
};

export const siteConfig = {
  name: appName,
  url: "https://veil-ui.dev",
  description:
    "A monochrome, Vercel-inspired component collection for React. Built on Radix UI and Tailwind CSS v4.",
};
