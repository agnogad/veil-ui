import { Quote, Star } from "lucide-react";
import type * as React from "react";

import { cn } from "@veil-ui/utils";

import { Avatar, AvatarFallback, AvatarImage } from "../avatar/index";
import { Card, CardContent, CardFooter } from "../card/index";

interface TestimonialCardProps extends React.ComponentProps<"div"> {
  quote: React.ReactNode;
  name: string;
  role?: string;
  avatarSrc?: string;
  rating?: number;
}

function TestimonialCard({
  className,
  quote,
  name,
  role,
  avatarSrc,
  rating,
  ...props
}: TestimonialCardProps) {
  const fallback = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <Card
      data-slot="testimonial-card"
      className={cn("max-w-md gap-3", className)}
      {...props}
    >
      <CardContent className="space-y-4">
        <Quote className="size-6 text-primary/40" aria-hidden />
        {rating !== undefined ? (
          <div
            className="flex items-center gap-0.5"
            role="img"
            aria-label={`${rating} out of 5 stars`}
          >
            {Array.from({ length: 5 }, (_, index) => (
              <Star
                key={index}
                className={cn(
                  "size-3.5",
                  index < rating
                    ? "fill-amber-500 text-amber-500"
                    : "text-muted-foreground/40",
                )}
                aria-hidden
              />
            ))}
          </div>
        ) : null}
        <blockquote className="text-sm leading-relaxed">{quote}</blockquote>
      </CardContent>
      <CardFooter className="gap-3">
        <Avatar size="sm">
          {avatarSrc ? <AvatarImage src={avatarSrc} alt="" /> : null}
          <AvatarFallback>{fallback}</AvatarFallback>
        </Avatar>
        <figcaption className="text-sm">
          <span className="font-medium">{name}</span>
          {role ? (
            <span className="text-muted-foreground"> · {role}</span>
          ) : null}
        </figcaption>
      </CardFooter>
    </Card>
  );
}

export { TestimonialCard };
