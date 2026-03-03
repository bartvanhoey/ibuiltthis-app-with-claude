import { Icon } from "@/components/ui/icon";
import {
  StarIcon,
  HeartIcon,
  BellIcon,
  ZapIcon,
  ShieldIcon,
  SearchIcon,
  SettingsIcon,
  TrashIcon,
  CheckIcon,
  InfoIcon,
} from "lucide-react";
import type { ReactNode } from "react";

const VARIANTS = [
  "default",
  "destructive",
  "outline",
  "secondary",
  "ghost",
  "link",
  "black",
  "white",
] as const;

const SIZES = ["sm", "md", "lg"] as const;

const SAMPLE_ICONS: { label: string; icon: ReactNode }[] = [
  { label: "Star", icon: <StarIcon /> },
  { label: "Heart", icon: <HeartIcon /> },
  { label: "Bell", icon: <BellIcon /> },
  { label: "Zap", icon: <ZapIcon /> },
  { label: "Shield", icon: <ShieldIcon /> },
  { label: "Search", icon: <SearchIcon /> },
  { label: "Settings", icon: <SettingsIcon /> },
  { label: "Trash", icon: <TrashIcon /> },
  { label: "Check", icon: <CheckIcon /> },
  { label: "Info", icon: <InfoIcon /> },
];

function Section({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="mb-12">
      <h2 className="text-lg font-semibold mb-4 pb-2 border-b border-border">
        {title}
      </h2>
      {children}
    </section>
  );
}

export default function IconPreviewPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-2xl font-bold mb-2">Icon — Component Preview</h1>
      <p className="text-muted-foreground mb-10">
        A circular background wrapper for icons. Supports all theme variants,
        three sizes, and a disabled state.
      </p>

      <Section title="Variants">
        <div className="flex flex-wrap gap-4 items-center">
          {VARIANTS.map((variant) => (
            <div key={variant} className="flex flex-col items-center gap-2">
              <Icon variant={variant} aria-label={variant}>
                <StarIcon />
              </Icon>
              <span className="text-xs text-muted-foreground">{variant}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Sizes">
        <div className="flex gap-6 items-end">
          {SIZES.map((size) => (
            <div key={size} className="flex flex-col items-center gap-2">
              <Icon size={size} aria-label={size}>
                <BellIcon />
              </Icon>
              <span className="text-xs text-muted-foreground font-mono">
                {size}
              </span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Disabled State">
        <div className="flex flex-wrap gap-4 items-center">
          {(["default", "destructive", "outline", "secondary"] as const).map(
            (variant) => (
              <div key={variant} className="flex flex-col items-center gap-2">
                <Icon variant={variant} disabled aria-label={variant}>
                  <ShieldIcon />
                </Icon>
                <span className="text-xs text-muted-foreground">{variant}</span>
              </div>
            )
          )}
        </div>
      </Section>

      <Section title="With Lucide Icons">
        <div className="flex flex-wrap gap-3">
          {SAMPLE_ICONS.map(({ label, icon }) => (
            <div key={label} className="flex flex-col items-center gap-2">
              <Icon aria-label={label}>{icon}</Icon>
              <span className="text-xs text-muted-foreground">{label}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="All Sizes × All Variants">
        <div className="overflow-x-auto">
          <table className="text-sm border-separate border-spacing-3">
            <thead>
              <tr>
                <th className="text-left text-muted-foreground font-normal pr-4">
                  variant
                </th>
                {SIZES.map((s) => (
                  <th
                    key={s}
                    className="text-center text-muted-foreground font-normal px-2"
                  >
                    {s}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {VARIANTS.map((variant) => (
                <tr key={variant}>
                  <td className="text-xs text-muted-foreground font-mono pr-4">
                    {variant}
                  </td>
                  {SIZES.map((size) => (
                    <td key={size} className="text-center">
                      <Icon variant={variant} size={size} aria-label={`${variant}-${size}`}>
                        <ZapIcon />
                      </Icon>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="In Context — Notification Badges">
        <div className="flex flex-col gap-3">
          {(
            [
              { variant: "default", label: "New message", icon: <BellIcon /> },
              { variant: "destructive", label: "Delete item", icon: <TrashIcon /> },
              { variant: "secondary", label: "Saved", icon: <HeartIcon /> },
              { variant: "outline", label: "Info", icon: <InfoIcon /> },
            ] as const
          ).map(({ variant, label, icon }) => (
            <div key={variant} className="flex items-center gap-3">
              <Icon variant={variant}>{icon}</Icon>
              <span className="text-sm">{label}</span>
            </div>
          ))}
        </div>
      </Section>
    </main>
  );
}
