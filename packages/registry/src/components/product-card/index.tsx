"use client";
import { Star } from "lucide-react";
import type * as React from "react";

import { cn } from "@veil-ui/utils";

import { Button } from "../button/index";
import { Card, CardContent, CardHeader, CardTitle } from "../card/index";

interface ProductCardProps extends React.ComponentProps<"div"> {
  src: string;
  alt: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating?: number;
  reviewCount?: number;
  badge?: string;
  currency?: string;
  onAddToCart?: () => void;
}

function formatPrice(value: number, currency: string) {
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency,
  }).format(value);
}

function ProductCard({
  className,
  src,
  alt,
  name,
  price,
  originalPrice,
  rating,
  reviewCount,
  badge,
  currency = "USD",
  onAddToCart,
  ...props
}: ProductCardProps) {
  const discounted = originalPrice !== undefined && originalPrice > price;

  return (
    <Card
      data-slot="product-card"
      className={cn("group max-w-xs overflow-hidden py-0", className)}
      {...props}
    >
      <div className="relative">
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {badge ? (
          <span className="absolute left-3 top-3 rounded-full bg-primary px-2 py-0.5 text-xs font-medium text-primary-foreground">
            {badge}
          </span>
        ) : null}
      </div>
      <CardHeader className="pt-4">
        <CardTitle className="text-sm">{name}</CardTitle>
        {rating !== undefined ? (
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Star className="size-3.5 fill-current text-amber-500" aria-hidden />
            <span>{rating.toFixed(1)}</span>
            {reviewCount !== undefined ? <span>({reviewCount})</span> : null}
          </div>
        ) : null}
      </CardHeader>
      <CardContent className="flex items-center justify-between gap-3 pb-4">
        <p className="flex items-baseline gap-2">
          <span className="text-base font-semibold">
            {formatPrice(price, currency)}
          </span>
          {discounted ? (
            <span className="text-xs text-muted-foreground line-through">
              {formatPrice(originalPrice, currency)}
            </span>
          ) : null}
        </p>
        <Button type="button" size="sm" onClick={onAddToCart}>
          Add to cart
        </Button>
      </CardContent>
    </Card>
  );
}

export { ProductCard };
