import { render, screen } from "@testing-library/react";
import { Avatar } from "@/components/ui/avatar";

describe("<Avatar />", () => {
  it("renders with aria-label matching the name prop", () => {
    render(<Avatar name="John Doe" />);
    expect(screen.getByLabelText("John Doe")).toBeInTheDocument();
  });

  it("displays two-letter initials for a full name", () => {
    render(<Avatar name="John Doe" />);
    expect(screen.getByLabelText("John Doe")).toHaveTextContent("JD");
  });

  it("displays a single initial for a single word", () => {
    render(<Avatar name="Alice" />);
    expect(screen.getByLabelText("Alice")).toHaveTextContent("A");
  });

  it("displays a single initial for an email address", () => {
    render(<Avatar name="john@example.com" />);
    expect(screen.getByLabelText("john@example.com")).toHaveTextContent("J");
  });

  it("displays '?' for an empty name", () => {
    render(<Avatar name="" />);
    expect(screen.getByLabelText("")).toHaveTextContent("?");
  });

  it("applies data-slot='avatar' attribute", () => {
    render(<Avatar name="Test User" />);
    expect(screen.getByLabelText("Test User")).toHaveAttribute(
      "data-slot",
      "avatar"
    );
  });

  it("applies sm size classes", () => {
    render(<Avatar name="Test User" size="sm" />);
    const avatar = screen.getByLabelText("Test User");
    expect(avatar.className).toContain("size-7");
    expect(avatar.className).toContain("text-xs");
  });

  it("applies md size classes by default", () => {
    render(<Avatar name="Test User" />);
    const avatar = screen.getByLabelText("Test User");
    expect(avatar.className).toContain("size-9");
    expect(avatar.className).toContain("text-sm");
  });

  it("applies lg size classes", () => {
    render(<Avatar name="Test User" size="lg" />);
    const avatar = screen.getByLabelText("Test User");
    expect(avatar.className).toContain("size-12");
    expect(avatar.className).toContain("text-base");
  });

  it("merges a custom className into the element", () => {
    render(<Avatar name="Test User" className="custom-class" />);
    expect(screen.getByLabelText("Test User").className).toContain(
      "custom-class"
    );
  });
});
