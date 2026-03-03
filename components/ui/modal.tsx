"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// ─── Modal variants ────────────────────────────────────────────────────────────

const modalVariants = cva(
  "relative flex flex-col rounded-xl border shadow-xl transition-all duration-200 outline-none",
  {
    variants: {
      variant: {
        default: "bg-card text-card-foreground border-border",
        destructive:
          "bg-destructive/10 text-foreground border-destructive/40 dark:bg-destructive/20",
        outline:
          "bg-background text-foreground border-border shadow-md",
        secondary:
          "bg-secondary text-secondary-foreground border-secondary",
        ghost:
          "bg-background/80 text-foreground border-border/50 shadow-sm backdrop-blur-sm",
        link: "bg-background text-foreground border-border/40 shadow-sm",
        black:
          "bg-black text-white border-black dark:bg-white dark:text-black dark:border-white",
        white:
          "bg-white text-black border-border shadow-2xl dark:bg-black dark:text-white",
      },
      size: {
        sm: "w-full max-w-sm gap-3 p-5 text-sm",
        md: "w-full max-w-lg gap-4 p-6 text-base",
        lg: "w-full max-w-2xl gap-6 p-8 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ModalProps
  extends Omit<React.ComponentProps<"div">, "role">,
    VariantProps<typeof modalVariants> {
  /** Whether the modal is open */
  open: boolean;
  /** Called when the backdrop or close button is clicked */
  onClose?: () => void;
  /** Disables closing on backdrop click */
  disableBackdropClose?: boolean;
}

// ─── Focusable element selector ───────────────────────────────────────────────

const FOCUSABLE_SELECTOR =
  'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

// ─── Backdrop ─────────────────────────────────────────────────────────────────

function ModalBackdrop({
  onClick,
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="modal-backdrop"
      aria-hidden="true"
      className={cn(
        "fixed inset-0 z-0 bg-black/50 backdrop-blur-sm",
        className
      )}
      onClick={onClick}
      {...props}
    />
  );
}

// ─── Modal ────────────────────────────────────────────────────────────────────

function Modal({
  className,
  variant,
  size,
  open,
  onClose,
  disableBackdropClose = false,
  children,
  ...props
}: ModalProps) {
  const dialogRef = React.useRef<HTMLDivElement>(null);
  const titleId = React.useId();
  const descId = React.useId();

  // Close on Escape key
  React.useEffect(() => {
    if (!open) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose?.();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  // Scroll lock while open + return focus to trigger on close
  React.useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    const trigger = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
      trigger?.focus();
    };
  }, [open]);

  // Focus trap + auto-focus first element
  React.useEffect(() => {
    if (!open) return;
    const el = dialogRef.current;
    if (!el) return;

    const getFocusable = () =>
      Array.from(el.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR));

    // Auto-focus first focusable element or the dialog itself
    const focusable = getFocusable();
    (focusable[0] ?? el).focus();

    function trap(e: KeyboardEvent) {
      if (e.key !== "Tab") return;
      const focusable = getFocusable();
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener("keydown", trap);
    return () => document.removeEventListener("keydown", trap);
  }, [open]);

  if (!open) return null;

  return (
    <div data-slot="modal-root" className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <ModalBackdrop onClick={disableBackdropClose ? undefined : onClose} />
      <div
        ref={dialogRef}
        data-slot="modal"
        data-variant={variant ?? "default"}
        data-size={size ?? "md"}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`${titleId}-title`}
        aria-describedby={`${descId}-desc`}
        tabIndex={-1}
        className={cn(modalVariants({ variant, size }), "z-10", className)}
        {...props}
      >
        {/* Pass IDs via context so sub-components can pick them up */}
        <ModalIdContext.Provider value={{ titleId: `${titleId}-title`, descId: `${descId}-desc` }}>
          {children}
        </ModalIdContext.Provider>
      </div>
    </div>
  );
}

// ─── ID context ───────────────────────────────────────────────────────────────

const ModalIdContext = React.createContext<{
  titleId: string;
  descId: string;
}>({ titleId: "", descId: "" });

// ─── Sub-components ───────────────────────────────────────────────────────────

function ModalHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="modal-header"
      className={cn("flex flex-col gap-1.5", className)}
      {...props}
    />
  );
}

function ModalTitle({ className, ...props }: React.ComponentProps<"h2">) {
  const { titleId } = React.useContext(ModalIdContext);
  return (
    <h2
      id={titleId}
      data-slot="modal-title"
      className={cn("text-lg font-semibold leading-none tracking-tight", className)}
      {...props}
    />
  );
}

function ModalDescription({ className, ...props }: React.ComponentProps<"p">) {
  const { descId } = React.useContext(ModalIdContext);
  return (
    <p
      id={descId}
      data-slot="modal-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}

function ModalContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="modal-content"
      className={cn("w-full", className)}
      {...props}
    />
  );
}

function ModalFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="modal-footer"
      className={cn("flex items-center justify-end gap-2 pt-2", className)}
      {...props}
    />
  );
}

function ModalCloseButton({
  onClick,
  className,
  ...props
}: React.ComponentProps<"button">) {
  return (
    <button
      data-slot="modal-close"
      type="button"
      aria-label="Close modal"
      onClick={onClick}
      className={cn(
        "absolute top-2.5 right-2.5 rounded-md p-3.5 opacity-60 transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-foreground",
        className
      )}
      {...props}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    </button>
  );
}

export {
  Modal,
  modalVariants,
  ModalBackdrop,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalContent,
  ModalFooter,
  ModalCloseButton,
};
