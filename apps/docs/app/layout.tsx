import { RootProvider } from "fumadocs-ui/provider/next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";

import "./global.css";

export const metadata = {
  title: {
    default: "Veil UI — Copy-paste components for React",
    template: "%s — Veil UI",
  },
  description:
    "A monochrome, Vercel-inspired component collection for React. Built on Radix UI and Tailwind CSS v4. Own your code.",
};

export default function Layout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="flex min-h-screen flex-col font-sans antialiased">
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
