import type * as React from "react";

import { cn } from "@veil-ui/utils";

import { Card, CardContent } from "../card/index";

interface FeatureCardProps extends Omit<React.ComponentProps<"div">, "title"> {
  icon: React.ElementType;
  title: React.ReactNode;
  description: React.ReactNode;
}

function FeatureCard({
  className,
  icon: Icon,
  title,
  description,
  ...props
}: FeatureCardProps) {
  return (
    <Card data-slot="feature-card" className={cn("max-w-sm gap-3", className)} {...props}>
      <CardContent className="space-y-3">
        <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Icon className="size-5" aria-hidden />
        </span>
        <h3 className="text-base font-medium">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}

export { FeatureCard };
