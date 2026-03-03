import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// ─── Variant-aware Card ───────────────────────────────────────────────────────

const cardVariants = cva(
  "flex flex-col gap-6 rounded-xl border py-6 shadow-sm transition-colors",
  {
    variants: {
      variant: {
        default: "bg-card text-card-foreground border-border",
        destructive:
          "bg-destructive/10 text-destructive border-destructive/40 dark:bg-destructive/20",
        outline: "bg-transparent text-card-foreground border-border shadow-none",
        secondary: "bg-secondary text-secondary-foreground border-secondary",
        ghost: "bg-transparent text-card-foreground border-transparent shadow-none",
        link: "bg-transparent text-primary border-transparent shadow-none",
        black: "bg-black text-white border-black dark:bg-white dark:text-black dark:border-white",
        white: "bg-white text-black border-border dark:bg-black dark:text-white",
      },
      size: {
        sm: "py-4 gap-3 rounded-lg text-sm",
        md: "py-6 gap-6 rounded-xl text-base",
        lg: "py-8 gap-8 rounded-2xl text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export interface CardProps
  extends React.ComponentProps<"div">,
    VariantProps<typeof cardVariants> {
  disabled?: boolean;
}

function Card({ className, variant, size, disabled, ...props }: CardProps) {
  return (
    <div
      data-slot="card"
      data-variant={variant ?? "default"}
      data-size={size ?? "md"}
      aria-disabled={disabled || undefined}
      className={cn(
        cardVariants({ variant, size }),
        disabled && "opacity-50 pointer-events-none",
        className
      )}
      {...props}
    />
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className
      )}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn("leading-none font-semibold", className)}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-6", className)}
      {...props}
    />
  );
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center px-6 [.border-t]:pt-6", className)}
      {...props}
    />
  );
}

export {
  Card,
  cardVariants,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
};
