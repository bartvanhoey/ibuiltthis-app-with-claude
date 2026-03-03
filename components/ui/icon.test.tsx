import { render, screen } from "@testing-library/react";
import { Icon, iconVariants } from "./icon";

// ─── Rendering ────────────────────────────────────────────────────────────────

describe("<Icon /> — rendering", () => {
  it("renders children", () => {
    render(<Icon aria-label="star">★</Icon>);
    expect(screen.getByText("★")).toBeInTheDocument();
  });

  it("applies data-slot='icon'", () => {
    render(<Icon aria-label="icon">★</Icon>);
    expect(screen.getByText("★")).toHaveAttribute("data-slot", "icon");
  });
});

// ─── Variants ─────────────────────────────────────────────────────────────────

describe("<Icon /> — variants", () => {
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

  it.each(variants)("sets data-variant='%s'", (variant) => {
    render(<Icon variant={variant}>★</Icon>);
    expect(screen.getByText("★")).toHaveAttribute("data-variant", variant);
  });

  it("defaults to data-variant='default'", () => {
    render(<Icon>★</Icon>);
    expect(screen.getByText("★")).toHaveAttribute("data-variant", "default");
  });
});

// ─── Sizes ────────────────────────────────────────────────────────────────────

describe("<Icon /> — sizes", () => {
  it("defaults to data-size='md'", () => {
    render(<Icon>★</Icon>);
    expect(screen.getByText("★")).toHaveAttribute("data-size", "md");
  });

  it("sets data-size='sm'", () => {
    render(<Icon size="sm">★</Icon>);
    expect(screen.getByText("★")).toHaveAttribute("data-size", "sm");
  });

  it("sets data-size='lg'", () => {
    render(<Icon size="lg">★</Icon>);
    expect(screen.getByText("★")).toHaveAttribute("data-size", "lg");
  });

  it("applies size-7 class for sm", () => {
    render(<Icon size="sm">★</Icon>);
    expect(screen.getByText("★").className).toContain("size-7");
  });

  it("applies size-9 class for md", () => {
    render(<Icon size="md">★</Icon>);
    expect(screen.getByText("★").className).toContain("size-9");
  });

  it("applies size-12 class for lg", () => {
    render(<Icon size="lg">★</Icon>);
    expect(screen.getByText("★").className).toContain("size-12");
  });
});

// ─── Disabled ─────────────────────────────────────────────────────────────────

describe("<Icon /> — disabled", () => {
  it("sets aria-disabled when disabled=true", () => {
    render(<Icon disabled>★</Icon>);
    expect(screen.getByText("★")).toHaveAttribute("aria-disabled", "true");
  });

  it("does not set aria-disabled when disabled is omitted", () => {
    render(<Icon>★</Icon>);
    expect(screen.getByText("★")).not.toHaveAttribute("aria-disabled");
  });

  it("applies opacity-50 and pointer-events-none when disabled", () => {
    render(<Icon disabled>★</Icon>);
    const el = screen.getByText("★");
    expect(el.className).toContain("opacity-50");
    expect(el.className).toContain("pointer-events-none");
  });
});

// ─── className passthrough ────────────────────────────────────────────────────

describe("<Icon /> — className", () => {
  it("merges a custom className", () => {
    render(<Icon className="custom-class">★</Icon>);
    expect(screen.getByText("★").className).toContain("custom-class");
  });
});

// ─── iconVariants utility ─────────────────────────────────────────────────────

describe("iconVariants()", () => {
  it("returns a string", () => {
    expect(typeof iconVariants({ variant: "default", size: "md" })).toBe("string");
  });

  it("includes rounded-full in all variants", () => {
    expect(iconVariants({ variant: "default" })).toContain("rounded-full");
  });
});
