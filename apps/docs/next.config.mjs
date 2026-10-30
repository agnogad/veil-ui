import { createMDX } from "fumadocs-mdx/next";

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  // Static GitHub Pages deployment lives under https://<user>.github.io/veil-ui/
  output: "export",
  basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? "",
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
  allowedDevOrigins: ["*.trycloudflare.com", "mostly-rand-reduced-occupied.trycloudflare.com"],
  transpilePackages: ["@veil-ui/registry", "@veil-ui/utils", "@veil-ui/tokens"],
};

export default withMDX(config);
