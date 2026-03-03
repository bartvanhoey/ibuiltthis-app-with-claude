import { render, screen, fireEvent } from "@testing-library/react";
import {
  Modal,
  modalVariants,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalContent,
  ModalFooter,
  ModalCloseButton,
} from "./modal";

// ─── Modal rendering ──────────────────────────────────────────────────────────

describe("<Modal /> — rendering", () => {
  it("renders nothing when open=false", () => {
    render(<Modal open={false} onClose={() => {}}>content</Modal>);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("renders dialog when open=true", () => {
    render(<Modal open={true} onClose={() => {}}>content</Modal>);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("sets aria-modal='true' on the dialog", () => {
    render(<Modal open={true} onClose={() => {}}>content</Modal>);
    expect(screen.getByRole("dialog")).toHaveAttribute("aria-modal", "true");
  });

  it("applies data-slot='modal'", () => {
    render(<Modal open={true} onClose={() => {}}>content</Modal>);
    expect(screen.getByRole("dialog")).toHaveAttribute("data-slot", "modal");
  });

  it("renders children inside the dialog", () => {
    render(<Modal open={true} onClose={() => {}}>hello world</Modal>);
    expect(screen.getByText("hello world")).toBeInTheDocument();
  });
});

// ─── Modal variants ────────────────────────────────────────────────────────────

describe("<Modal /> — variants", () => {
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

  it("defaults to variant='default'", () => {
    render(<Modal open={true} onClose={() => {}}>content</Modal>);
    expect(screen.getByRole("dialog")).toHaveAttribute("data-variant", "default");
  });

  it.each(variants)("sets data-variant='%s'", (variant) => {
    render(
      <Modal open={true} variant={variant} onClose={() => {}}>
        content
      </Modal>
    );
    expect(screen.getByRole("dialog")).toHaveAttribute("data-variant", variant);
  });
});

// ─── Modal sizes ──────────────────────────────────────────────────────────────

describe("<Modal /> — sizes", () => {
  it("defaults to size='md'", () => {
    render(<Modal open={true} onClose={() => {}}>content</Modal>);
    expect(screen.getByRole("dialog")).toHaveAttribute("data-size", "md");
  });

  it("sets data-size='sm'", () => {
    render(<Modal open={true} size="sm" onClose={() => {}}>content</Modal>);
    expect(screen.getByRole("dialog")).toHaveAttribute("data-size", "sm");
  });

  it("sets data-size='lg'", () => {
    render(<Modal open={true} size="lg" onClose={() => {}}>content</Modal>);
    expect(screen.getByRole("dialog")).toHaveAttribute("data-size", "lg");
  });
});

// ─── Backdrop interaction ─────────────────────────────────────────────────────

describe("<Modal /> — backdrop", () => {
  it("calls onClose when backdrop is clicked", () => {
    const onClose = jest.fn();
    render(<Modal open={true} onClose={onClose}>content</Modal>);
    const backdrop = document.querySelector("[data-slot='modal-backdrop']")!;
    fireEvent.click(backdrop);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("does NOT call onClose when disableBackdropClose=true", () => {
    const onClose = jest.fn();
    render(
      <Modal open={true} onClose={onClose} disableBackdropClose>
        content
      </Modal>
    );
    const backdrop = document.querySelector("[data-slot='modal-backdrop']")!;
    fireEvent.click(backdrop);
    expect(onClose).not.toHaveBeenCalled();
  });

  it("renders the backdrop element", () => {
    render(<Modal open={true} onClose={() => {}}>content</Modal>);
    expect(document.querySelector("[data-slot='modal-backdrop']")).toBeInTheDocument();
  });
});

// ─── Escape key ───────────────────────────────────────────────────────────────

describe("<Modal /> — keyboard", () => {
  it("calls onClose when Escape is pressed", () => {
    const onClose = jest.fn();
    render(<Modal open={true} onClose={onClose}>content</Modal>);
    fireEvent.keyDown(document, { key: "Escape" });
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});

// ─── className passthrough ────────────────────────────────────────────────────

describe("<Modal /> — className", () => {
  it("merges a custom className", () => {
    render(
      <Modal open={true} onClose={() => {}} className="custom-class">
        content
      </Modal>
    );
    expect(screen.getByRole("dialog").className).toContain("custom-class");
  });
});

// ─── Sub-components ───────────────────────────────────────────────────────────

describe("Modal sub-components", () => {
  it("ModalHeader renders with data-slot='modal-header'", () => {
    render(<ModalHeader>header</ModalHeader>);
    expect(screen.getByText("header")).toHaveAttribute("data-slot", "modal-header");
  });

  it("ModalTitle renders with data-slot='modal-title'", () => {
    render(<ModalTitle>title</ModalTitle>);
    expect(screen.getByText("title")).toHaveAttribute("data-slot", "modal-title");
  });

  it("ModalDescription renders with data-slot='modal-description'", () => {
    render(<ModalDescription>desc</ModalDescription>);
    expect(screen.getByText("desc")).toHaveAttribute("data-slot", "modal-description");
  });

  it("ModalContent renders with data-slot='modal-content'", () => {
    render(<ModalContent>body</ModalContent>);
    expect(screen.getByText("body")).toHaveAttribute("data-slot", "modal-content");
  });

  it("ModalFooter renders with data-slot='modal-footer'", () => {
    render(<ModalFooter>footer</ModalFooter>);
    expect(screen.getByText("footer")).toHaveAttribute("data-slot", "modal-footer");
  });

  it("ModalCloseButton renders with data-slot='modal-close'", () => {
    render(<ModalCloseButton />);
    expect(document.querySelector("[data-slot='modal-close']")).toBeInTheDocument();
  });

  it("ModalCloseButton calls onClick when clicked", () => {
    const onClick = jest.fn();
    render(<ModalCloseButton onClick={onClick} />);
    fireEvent.click(document.querySelector("[data-slot='modal-close']")!);
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});

// ─── modalVariants utility ────────────────────────────────────────────────────

describe("modalVariants()", () => {
  it("returns a string", () => {
    expect(typeof modalVariants({ variant: "default", size: "md" })).toBe("string");
  });

  it("includes max-w-sm for size='sm'", () => {
    expect(modalVariants({ size: "sm" })).toContain("max-w-sm");
  });

  it("includes max-w-2xl for size='lg'", () => {
    expect(modalVariants({ size: "lg" })).toContain("max-w-2xl");
  });
});
