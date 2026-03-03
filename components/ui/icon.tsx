import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

//  ui-component Icon | an icon component for showing icons, with a circular background  

const iconVariants = cva(
  "inline-flex items-center justify-center rounded-full shrink-0 transition-colors [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-[1em] [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground",
        destructive:
          "bg-destructive text-white dark:bg-destructive/80",
        outline:
          "border border-border bg-background text-foreground",
        secondary:
          "bg-secondary text-secondary-foreground",
        ghost:
          "bg-accent/50 text-accent-foreground dark:bg-accent/30",
        link:
          "bg-transparent text-primary",
        black:
          "bg-black text-white dark:bg-white dark:text-black",
        white:
          "bg-white text-black border border-border dark:bg-black dark:text-white",
      },
      size: {
        sm: "size-7 text-sm",
        md: "size-9 text-base",
        lg: "size-12 text-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export interface IconProps
  extends React.ComponentProps<"span">,
    VariantProps<typeof iconVariants> {
  disabled?: boolean;
}

function Icon({ className, variant, size, disabled, children, ...props }: IconProps) {
  return (
    <span
      data-slot="icon"
      data-variant={variant ?? "default"}
      data-size={size ?? "md"}
      aria-disabled={disabled || undefined}
      className={cn(
        iconVariants({ variant, size }),
        disabled && "opacity-50 pointer-events-none",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

export { Icon, iconVariants };
