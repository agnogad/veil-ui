import type * as React from "react";

import { cn } from "@veil-ui/utils";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../card/index";

interface ImageCardProps extends Omit<React.ComponentProps<"div">, "title"> {
  src: string;
  alt: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  footer?: React.ReactNode;
  imageClassName?: string;
}

function ImageCard({
  className,
  src,
  alt,
  title,
  description,
  footer,
  imageClassName,
  children,
  ...props
}: ImageCardProps) {
  return (
    <Card
      data-slot="image-card"
      className={cn("overflow-hidden py-0", className)}
      {...props}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className={cn("aspect-video w-full object-cover", imageClassName)}
      />
      <CardHeader className="pt-5">
        <CardTitle>{title}</CardTitle>
        {description ? <CardDescription>{description}</CardDescription> : null}
      </CardHeader>
      {children ? <CardContent>{children}</CardContent> : null}
      {footer ? (
        <div className="flex items-center border-t px-5 py-3 text-sm text-muted-foreground">
          {footer}
        </div>
      ) : null}
    </Card>
  );
}

export { ImageCard };
