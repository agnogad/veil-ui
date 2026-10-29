import type * as React from "react";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";

import { cn } from "@veil-ui/utils";

const components: Components = {
  h1: ({ className, ...props }) => (
    <h1
      className={cn("mt-6 text-2xl font-semibold tracking-tight first:mt-0", className)}
      {...props}
    />
  ),
  h2: ({ className, ...props }) => (
    <h2
      className={cn("mt-6 text-xl font-semibold tracking-tight first:mt-0", className)}
      {...props}
    />
  ),
  h3: ({ className, ...props }) => (
    <h3
      className={cn("mt-5 text-lg font-semibold first:mt-0", className)}
      {...props}
    />
  ),
  p: ({ className, ...props }) => (
    <p className={cn("mt-4 leading-relaxed first:mt-0", className)} {...props} />
  ),
  a: ({ className, ...props }) => (
    <a
      className={cn(
        "font-medium underline decoration-muted-foreground/40 underline-offset-4 hover:decoration-current",
        className,
      )}
      {...props}
    />
  ),
  ul: ({ className, ...props }) => (
    <ul className={cn("my-4 list-disc space-y-1 pl-5", className)} {...props} />
  ),
  ol: ({ className, ...props }) => (
    <ol
      className={cn("my-4 list-decimal space-y-1 pl-5", className)}
      {...props}
    />
  ),
  li: ({ className, ...props }) => (
    <li className={cn("leading-relaxed", className)} {...props} />
  ),
  blockquote: ({ className, ...props }) => (
    <blockquote
      className={cn(
        "my-4 border-l-2 pl-4 text-sm italic text-muted-foreground",
        className,
      )}
      {...props}
    />
  ),
  code: ({ className, children, ...props }) => {
    const isBlock = className?.includes("language-");
    if (isBlock) {
      return (
        <code className={cn("font-mono", className)} {...props}>
          {children}
        </code>
      );
    }
    return (
      <code
        className={cn(
          "rounded bg-muted px-1.5 py-0.5 font-mono text-[0.85em]",
          className,
        )}
        {...props}
      >
        {children}
      </code>
    );
  },
  pre: ({ className, ...props }) => (
    <pre
      className={cn(
        "my-4 overflow-x-auto rounded-lg border bg-muted/40 p-4 text-sm",
        className,
      )}
      {...props}
    />
  ),
  table: ({ className, ...props }) => (
    <div className="my-4 overflow-x-auto">
      <table
        className={cn("w-full border-collapse text-left text-sm", className)}
        {...props}
      />
    </div>
  ),
  th: ({ className, ...props }) => (
    <th
      className={cn("border px-3 py-2 font-medium", className)}
      {...props}
    />
  ),
  td: ({ className, ...props }) => (
    <td className={cn("border px-3 py-2 align-top", className)} {...props} />
  ),
  hr: ({ className, ...props }) => (
    <hr className={cn("my-6 border-border", className)} {...props} />
  ),
  img: ({ className, ...props }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img className={cn("my-4 max-w-full rounded-md", className)} {...props} />
  ),
};

interface MarkdownProps extends Omit<React.ComponentProps<"div">, "children"> {
  children: string;
}

function Markdown({ children, className, ...props }: MarkdownProps) {
  return (
    <div data-slot="markdown" className={cn("text-sm", className)} {...props}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {children}
      </ReactMarkdown>
    </div>
  );
}

export { Markdown };
export type { MarkdownProps };
