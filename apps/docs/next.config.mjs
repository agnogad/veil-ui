import { createMDX } from "fumadocs-mdx/next";

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  allowedDevOrigins: ["*.trycloudflare.com", "mostly-rand-reduced-occupied.trycloudflare.com"],
  transpilePackages: ["@veil-ui/registry", "@veil-ui/utils", "@veil-ui/tokens"],
};

export default withMDX(config);
