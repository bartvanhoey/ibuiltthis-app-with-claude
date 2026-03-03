import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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

function SampleCard({
  variant,
  size,
  disabled,
}: {
  variant: (typeof VARIANTS)[number];
  size?: (typeof SIZES)[number];
  disabled?: boolean;
}) {
  return (
    <Card variant={variant} size={size} disabled={disabled}>
      <CardHeader>
        <CardTitle>
          {variant.charAt(0).toUpperCase() + variant.slice(1)} Card
        </CardTitle>
        <CardDescription>
          {disabled ? "Disabled state" : "This is a card description."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm">
          Card body content goes here. Use it to display any information.
        </p>
      </CardContent>
      <CardFooter className="gap-2">
        <Badge variant="secondary">Tag one</Badge>
        <Badge variant="secondary">Tag two</Badge>
      </CardFooter>
    </Card>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
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

export default function CardPreviewPage() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-2xl font-bold mb-2">Card — Component Preview</h1>
      <p className="text-muted-foreground mb-10">
        All variants, sizes, and states.
      </p>

      <Section title="Variants">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {VARIANTS.map((variant) => (
            <SampleCard key={variant} variant={variant} />
          ))}
        </div>
      </Section>

      <Section title="Sizes">
        <div className="flex flex-col gap-6">
          {SIZES.map((size) => (
            <div key={size} className="flex flex-col gap-1">
              <span className="text-xs text-muted-foreground font-mono mb-1">
                size=&quot;{size}&quot;
              </span>
              <SampleCard variant="default" size={size} />
            </div>
          ))}
        </div>
      </Section>

      <Section title="Disabled State">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {(["default", "destructive", "outline"] as const).map((variant) => (
            <SampleCard key={variant} variant={variant} disabled />
          ))}
        </div>
      </Section>

      <Section title="Composition Example">
        <div className="max-w-sm">
          <Card variant="default">
            <CardHeader>
              <CardTitle>Full Composition</CardTitle>
              <CardDescription>
                Using CardHeader, CardContent, and CardFooter together.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed">
                This card uses all sub-components: header, title, description,
                content, and footer — matching the same structure used in
                ProductCard throughout the app.
              </p>
            </CardContent>
            <CardFooter className="border-t border-border pt-4 mt-2">
              <span className="text-xs text-muted-foreground">Footer area</span>
            </CardFooter>
          </Card>
        </div>
      </Section>
    </main>
  );
}
