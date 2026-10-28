import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";

import { appName, gitConfig } from "./shared";

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <span className="flex items-center gap-2 font-semibold tracking-tight">
          <span
            aria-hidden
            className="flex size-5 items-center justify-center rounded-[5px] bg-foreground text-[10px] font-bold text-background"
          >
            V
          </span>
          {appName}
        </span>
      ),
    },
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
    links: [
      { text: "Docs", url: "/docs" },
      { text: "Components", url: "/docs/components/button" },
    ],
  };
}
