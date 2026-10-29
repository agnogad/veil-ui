import type * as React from "react";

import { cn } from "@veil-ui/utils";

import { Card, CardDescription, CardHeader, CardTitle } from "../card/index";

interface ArticleCardProps extends Omit<React.ComponentProps<"div">, "title"> {
  src?: string;
  alt?: string;
  category?: string;
  title: React.ReactNode;
  excerpt?: React.ReactNode;
  author: string;
  date: string;
  readTime?: string;
  href?: string;
}

function ArticleCard({
  className,
  src,
  alt = "",
  category,
  title,
  excerpt,
  author,
  date,
  readTime,
  href = "#",
  ...props
}: ArticleCardProps) {
  return (
    <Card
      data-slot="article-card"
      className={cn("max-w-md overflow-hidden py-0", className)}
      {...props}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className="aspect-[2/1] w-full object-cover"
        />
      ) : null}
      <CardHeader className="pt-5">
        {category ? (
          <span className="text-xs font-medium uppercase tracking-wide text-primary">
            {category}
          </span>
        ) : null}
        <CardTitle className="text-lg leading-snug">
          <a className="outline-none hover:underline focus-visible:ring-2 focus-visible:ring-ring" href={href}>
            {title}
          </a>
        </CardTitle>
        {excerpt ? (
          <CardDescription className="line-clamp-2">{excerpt}</CardDescription>
        ) : null}
      </CardHeader>
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 border-t px-5 py-3 text-xs text-muted-foreground">
        <span className="font-medium text-foreground">{author}</span>
        <span aria-hidden>·</span>
        <time>{date}</time>
        {readTime ? (
          <>
            <span aria-hidden>·</span>
            <span>{readTime}</span>
          </>
        ) : null}
      </div>
    </Card>
  );
}

export { ArticleCard };
