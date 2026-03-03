import { render, screen } from "@testing-library/react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardAction,
  cardVariants,
} from "./card";

// ─── Card variants ────────────────────────────────────────────────────────────

describe("<Card /> — variants", () => {
  const variants = [
    "default",
    "destructive",
    "outline",
    "secondary",
    "ghost",
    "link",
    "black",
    "white",
  ] as const;

  it("renders without crashing", () => {
    render(<Card>content</Card>);
    expect(screen.getByText("content")).toBeInTheDocument();
  });

  it("applies data-slot='card'", () => {
    render(<Card>content</Card>);
    expect(screen.getByText("content")).toHaveAttribute("data-slot", "card");
  });

  it.each(variants)("sets data-variant='%s'", (variant) => {
    render(<Card variant={variant}>content</Card>);
    expect(screen.getByText("content")).toHaveAttribute(
      "data-variant",
      variant
    );
  });

  it("defaults to variant='default'", () => {
    render(<Card>content</Card>);
    expect(screen.getByText("content")).toHaveAttribute(
      "data-variant",
      "default"
    );
  });
});

// ─── Card sizes ───────────────────────────────────────────────────────────────

describe("<Card /> — sizes", () => {
  it("defaults to size='md'", () => {
    render(<Card>content</Card>);
    expect(screen.getByText("content")).toHaveAttribute("data-size", "md");
  });

  it("sets data-size='sm'", () => {
    render(<Card size="sm">content</Card>);
    expect(screen.getByText("content")).toHaveAttribute("data-size", "sm");
  });

  it("sets data-size='lg'", () => {
    render(<Card size="lg">content</Card>);
    expect(screen.getByText("content")).toHaveAttribute("data-size", "lg");
  });
});

// ─── Disabled state ───────────────────────────────────────────────────────────

describe("<Card /> — disabled", () => {
  it("sets aria-disabled when disabled=true", () => {
    render(<Card disabled>content</Card>);
    expect(screen.getByText("content")).toHaveAttribute("aria-disabled", "true");
  });

  it("does not set aria-disabled when disabled is omitted", () => {
    render(<Card>content</Card>);
    expect(screen.getByText("content")).not.toHaveAttribute("aria-disabled");
  });

  it("applies opacity and pointer-events classes when disabled", () => {
    render(<Card disabled>content</Card>);
    const el = screen.getByText("content");
    expect(el.className).toContain("opacity-50");
    expect(el.className).toContain("pointer-events-none");
  });
});

// ─── className passthrough ────────────────────────────────────────────────────

describe("<Card /> — className", () => {
  it("merges a custom className", () => {
    render(<Card className="custom-class">content</Card>);
    expect(screen.getByText("content").className).toContain("custom-class");
  });
});

// ─── Sub-components ───────────────────────────────────────────────────────────

describe("Card sub-components", () => {
  it("CardHeader renders with data-slot='card-header'", () => {
    render(<CardHeader>header</CardHeader>);
    expect(screen.getByText("header")).toHaveAttribute(
      "data-slot",
      "card-header"
    );
  });

  it("CardTitle renders with data-slot='card-title'", () => {
    render(<CardTitle>title</CardTitle>);
    expect(screen.getByText("title")).toHaveAttribute("data-slot", "card-title");
  });

  it("CardDescription renders with data-slot='card-description'", () => {
    render(<CardDescription>desc</CardDescription>);
    expect(screen.getByText("desc")).toHaveAttribute(
      "data-slot",
      "card-description"
    );
  });

  it("CardContent renders with data-slot='card-content'", () => {
    render(<CardContent>body</CardContent>);
    expect(screen.getByText("body")).toHaveAttribute(
      "data-slot",
      "card-content"
    );
  });

  it("CardFooter renders with data-slot='card-footer'", () => {
    render(<CardFooter>footer</CardFooter>);
    expect(screen.getByText("footer")).toHaveAttribute(
      "data-slot",
      "card-footer"
    );
  });

  it("CardAction renders with data-slot='card-action'", () => {
    render(<CardAction>action</CardAction>);
    expect(screen.getByText("action")).toHaveAttribute(
      "data-slot",
      "card-action"
    );
  });
});

// ─── cardVariants utility ─────────────────────────────────────────────────────

describe("cardVariants()", () => {
  it("returns a string", () => {
    expect(typeof cardVariants({ variant: "default", size: "md" })).toBe(
      "string"
    );
  });

  it("includes size-specific class for sm", () => {
    expect(cardVariants({ size: "sm" })).toContain("rounded-lg");
  });

  it("includes size-specific class for lg", () => {
    expect(cardVariants({ size: "lg" })).toContain("rounded-2xl");
  });
});
