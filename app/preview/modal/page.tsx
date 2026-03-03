"use client";

import { useState } from "react";
import {
  Modal,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalContent,
  ModalFooter,
  ModalCloseButton,
} from "@/components/ui/modal";
import { Button } from "@/components/ui/button";

type Variant =
  | "default"
  | "destructive"
  | "outline"
  | "secondary"
  | "ghost"
  | "link"
  | "black"
  | "white";

type Size = "sm" | "md" | "lg";

const variants: Variant[] = [
  "default",
  "destructive",
  "outline",
  "secondary",
  "ghost",
  "link",
  "black",
  "white",
];

const sizes: Size[] = ["sm", "md", "lg"];

/** Which cancel button variant pairs well with each modal variant */
const cancelVariantMap: Record<Variant, React.ComponentProps<typeof Button>["variant"]> = {
  default: "ghost",
  destructive: "ghost",
  outline: "ghost",
  secondary: "outline",
  ghost: "outline",
  link: "ghost",
  black: "outline",
  white: "ghost",
};

/** Title colour override for the destructive variant (body text stays neutral) */
function titleClass(variant: Variant) {
  return variant === "destructive" ? "text-destructive" : undefined;
}

function DemoModal({
  variant,
  size,
  label,
}: {
  variant: Variant;
  size?: Size;
  label: string;
}) {
  const [open, setOpen] = useState(false);

  const cancelVariant = cancelVariantMap[variant];
  const closeRingClass =
    variant === "black"
      ? "focus-visible:ring-white dark:focus-visible:ring-black"
      : undefined;

  return (
    <>
      <Button variant={variant} size="sm" onClick={() => setOpen(true)}>
        {label}
      </Button>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        variant={variant}
        size={size ?? "md"}
      >
        <ModalCloseButton onClick={() => setOpen(false)} className={closeRingClass} />
        <ModalHeader>
          <ModalTitle className={titleClass(variant)}>Modal — {variant}</ModalTitle>
          <ModalDescription>
            This is the <strong>{variant}</strong> variant at size{" "}
            <strong>{size ?? "md"}</strong>.
          </ModalDescription>
        </ModalHeader>
        <ModalContent>
          <p className="text-sm leading-relaxed py-2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </ModalContent>
        <ModalFooter>
          <Button variant={cancelVariant} size="sm" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button variant={variant} size="sm" onClick={() => setOpen(false)}>
            Confirm
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="text-lg font-semibold mb-4 text-foreground border-b border-border pb-2">
        {title}
      </h2>
      {children}
    </section>
  );
}

export default function ModalPreviewPage() {
  const [backdropOpen, setBackdropOpen] = useState(false);
  const [lockedOpen, setLockedOpen] = useState(false);

  return (
    <main className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-2xl font-bold mb-2">Modal Preview</h1>
      <p className="text-muted-foreground mb-10">
        Sandbox for testing the Modal component variants, sizes, and behaviours.
      </p>

      {/* Variants */}
      <Section title="Variants">
        <div className="flex flex-wrap gap-3">
          {variants.map((v) => (
            <DemoModal key={v} variant={v} label={v} />
          ))}
        </div>
      </Section>

      {/* Sizes */}
      <Section title="Sizes">
        <div className="flex flex-wrap gap-3">
          {sizes.map((s) => (
            <DemoModal key={s} variant="default" size={s} label={`size: ${s}`} />
          ))}
        </div>
      </Section>

      {/* Backdrop blur */}
      <Section title="Semi-transparent Backdrop">
        <Button variant="outline" onClick={() => setBackdropOpen(true)}>
          Open with backdrop
        </Button>
        <Modal open={backdropOpen} onClose={() => setBackdropOpen(false)}>
          <ModalCloseButton onClick={() => setBackdropOpen(false)} />
          <ModalHeader>
            <ModalTitle>Backdrop Demo</ModalTitle>
            <ModalDescription>
              The backdrop is semi-transparent with a blur effect. Click outside
              or press Escape to close.
            </ModalDescription>
          </ModalHeader>
          <ModalContent>
            <p className="text-sm py-2 leading-relaxed">
              The backdrop uses{" "}
              <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">
                bg-black/50 backdrop-blur-sm
              </code>{" "}
              to create the frosted-glass overlay effect.
            </p>
          </ModalContent>
          <ModalFooter>
            <Button onClick={() => setBackdropOpen(false)}>Got it</Button>
          </ModalFooter>
        </Modal>
      </Section>

      {/* Locked (no backdrop close) */}
      <Section title="Locked (disableBackdropClose)">
        <Button variant="secondary" onClick={() => setLockedOpen(true)}>
          Open locked modal
        </Button>
        <Modal
          open={lockedOpen}
          onClose={() => setLockedOpen(false)}
          disableBackdropClose
          variant="destructive"
        >
          <ModalCloseButton onClick={() => setLockedOpen(false)} />
          <ModalHeader>
            <ModalTitle className="text-destructive">Action Required</ModalTitle>
            <ModalDescription>
              Clicking the backdrop will not close this modal — use the close
              button or press Escape.
            </ModalDescription>
          </ModalHeader>
          <ModalContent>
            <p className="text-sm py-2 leading-relaxed">
              Use{" "}
              <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">
                disableBackdropClose
              </code>{" "}
              to prevent accidental dismissal on important confirmations.
            </p>
          </ModalContent>
          <ModalFooter>
            <Button variant="destructive" onClick={() => setLockedOpen(false)}>
              Acknowledge
            </Button>
          </ModalFooter>
        </Modal>
      </Section>
    </main>
  );
}
