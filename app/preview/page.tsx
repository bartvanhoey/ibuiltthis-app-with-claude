"use client";

import type { ReactNode } from "react";
import { Avatar, getInitials, getAvatarColor } from "@/components/ui/avatar";

const showcaseNames = [
  "john@example.com",
  "kulkarni.ankita09@gmail.com",
  "Jane Smith",
  "Alex Johnson",
  "mike@example.com",
  "Mary Jane Watson",
  "bob",
  "",
];

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="text-lg font-semibold mb-4 text-foreground border-b border-border pb-2">
        {title}
      </h2>
      {children}
    </section>
  );
}

export default function PreviewPage() {
  return (
    <main className="max-w-2xl mx-auto px-6 py-12">
      <h1 className="text-2xl font-bold mb-2">Component Preview</h1>
      <p className="text-muted-foreground mb-10">
        Sandbox for testing UI components.
      </p>

      <Section title="Avatar — Sizes">
        <div className="flex items-end gap-6">
          {(["sm", "md", "lg"] as const).map((size) => (
            <div key={size} className="flex flex-col items-center gap-2">
              <Avatar name="Jane Smith" size={size} />
              <span className="text-xs text-muted-foreground">{size}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Avatar — Email vs Full Name vs Single Word">
        <div className="flex flex-wrap gap-6">
          {[
            { name: "john@example.com", label: "Email" },
            { name: "Jane Smith", label: "Full name" },
            { name: "johnsmith", label: "Single word" },
            { name: "", label: "Empty fallback" },
          ].map(({ name, label }) => (
            <div key={label} className="flex flex-col items-center gap-2">
              <Avatar name={name} />
              <div className="text-center">
                <p className="text-xs font-mono font-semibold">
                  {getInitials(name) || "?"}
                </p>
                <p className="text-xs text-muted-foreground">{label}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Avatar — Deterministic Colors">
        <div className="flex flex-wrap gap-4">
          {showcaseNames.map((name, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <Avatar name={name} />
              <p className="text-xs text-muted-foreground text-center max-w-20 truncate">
                {name || "(empty)"}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Avatar — With Submitter Row">
        <div className="flex flex-col gap-3">
          {["john@example.com", "Jane Smith", "kulkarni.ankita09@gmail.com"].map(
            (name) => (
              <div
                key={name}
                className="flex items-center gap-3 p-3 rounded-lg border border-border bg-card"
              >
                <Avatar name={name} size="md" />
                <div>
                  <p className="text-sm font-medium">{name}</p>
                  <p className="text-xs text-muted-foreground font-mono">
                    initials: {getInitials(name)} · color:{" "}
                    {getAvatarColor(name).split(" ")[0].replace("bg-", "")}
                  </p>
                </div>
              </div>
            )
          )}
        </div>
      </Section>
    </main>
  );
}
