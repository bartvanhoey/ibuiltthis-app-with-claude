import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

export default function StatsCard({
  label,
  value,
  icon: Icon,
  hasBorder
}: {
  label: string;
  value: string;
  icon: LucideIcon;
  hasBorder?: boolean;
}) {
  return (
    <div className={cn("space-y-2", hasBorder && "border-x border-border/50")}>
      <div className="flex items-center justify-center">
        <Icon className="size-5 text-primary/70" />
        <p className="text-3xl sm:text-4xl font-bold">{value}</p>
      </div>
        <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
}
