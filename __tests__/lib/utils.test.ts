import { getInitials, getAvatarColor } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

// ─── getInitials ─────────────────────────────────────────────────────────────

describe("getInitials", () => {
  it("returns '?' for an empty string", () => {
    expect(getInitials("")).toBe("?");
  });

  it("returns '?' for a whitespace-only string", () => {
    expect(getInitials("   ")).toBe("?");
  });

  it("returns a single uppercase initial for a single word", () => {
    expect(getInitials("alice")).toBe("A");
  });

  it("returns first and last initials for a full name", () => {
    expect(getInitials("John Doe")).toBe("JD");
  });

  it("uses first and last word for names with more than two words", () => {
    expect(getInitials("Mary Jane Watson")).toBe("MW");
  });

  it("extracts the local-part initial for an email address", () => {
    expect(getInitials("john@example.com")).toBe("J");
  });

  it("handles extra interior whitespace between words", () => {
    expect(getInitials("John   Doe")).toBe("JD");
  });
});

// ─── getAvatarColor ──────────────────────────────────────────────────────────

describe("getAvatarColor", () => {
  it("returns a non-empty string", () => {
    expect(getAvatarColor("Alice")).toBeTruthy();
  });

  it("includes text-white (all palette entries use white text)", () => {
    expect(getAvatarColor("Alice")).toContain("text-white");
  });

  it("returns the same color for the same name (deterministic)", () => {
    expect(getAvatarColor("Bob")).toBe(getAvatarColor("Bob"));
  });

  it("returns varied colors across different names", () => {
    const colors = new Set(
      ["Alice", "Bob", "Charlie", "Dave", "Eve", "Frank", "Grace", "Heidi"].map(
        getAvatarColor
      )
    );
    expect(colors.size).toBeGreaterThan(1);
  });
});

// ─── cn ──────────────────────────────────────────────────────────────────────

describe("cn", () => {
  it("merges class names", () => {
    expect(cn("px-2", "py-2")).toBe("px-2 py-2");
  });

  it("resolves Tailwind conflicts by keeping the last value", () => {
    expect(cn("px-2", "px-4")).toBe("px-4");
  });

  it("filters out falsy values", () => {
    expect(cn("btn", false, undefined, null, "active")).toBe("btn active");
  });

  it("handles conditional class objects", () => {
    expect(cn("base", { active: true, disabled: false })).toBe("base active");
  });

  it("returns an empty string when called with no arguments", () => {
    expect(cn()).toBe("");
  });
});
