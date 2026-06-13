"use client";

import { cn } from "@/lib/cn";

interface StackProps {
  direction?: "row" | "column";
  gap?: number;
  align?: "start" | "center" | "end" | "stretch" | "baseline";
  justify?: "start" | "center" | "end" | "between" | "around" | "evenly";
  className?: string;
  children?: React.ReactNode;
}

export function Stack({
  direction = "column",
  gap = 2,
  align,
  justify,
  className,
  children,
}: StackProps) {
  return (
    <div
      className={cn(
        "flex",
        direction === "row" ? "flex-row" : "flex-col",
        gap && `gap-${gap}`,
        align && `items-${align}`,
        justify && `justify-${justify}`,
        className
      )}
    >
      {children}
    </div>
  );
}

interface GridProps {
  columns?: number;
  gap?: number;
  className?: string;
  children?: React.ReactNode;
}

export function Grid({
  columns = 2,
  gap = 2,
  className,
  children,
}: GridProps) {
  return (
    <div
      className={cn(
        "grid",
        columns && `grid-cols-${columns}`,
        gap && `gap-${gap}`,
        className
      )}
    >
      {children}
    </div>
  );
}

interface HeadingProps {
  text?: string;
  level?: 1 | 2 | 3 | 4;
  className?: string;
}

export function Heading({ text, level = 2, className }: HeadingProps) {
  const Tag = `h${level}` as const;
  const sizeClasses = {
    1: "text-3xl font-bold tracking-tight",
    2: "text-2xl font-semibold tracking-tight",
    3: "text-xl font-semibold",
    4: "text-lg font-semibold",
  };

  return (
    <Tag className={cn(sizeClasses[level], "text-foreground", className)}>
      {text}
    </Tag>
  );
}

interface TextProps {
  text?: string;
  variant?: "body" | "muted" | "caption" | "lead";
  className?: string;
}

export function Text({ text, variant = "body", className }: TextProps) {
  const variantClasses = {
    body: "text-sm text-foreground",
    muted: "text-sm text-muted-foreground",
    caption: "text-xs text-muted-foreground",
    lead: "text-base text-foreground font-medium",
  };

  return (
    <p className={cn(variantClasses[variant], className)}>{text}</p>
  );
}

interface TailwindStyleProps {
  css: string;
}

export function TailwindStyle({ css }: TailwindStyleProps) {
  return <style type="text/tailwindcss">{css}</style>;
}
