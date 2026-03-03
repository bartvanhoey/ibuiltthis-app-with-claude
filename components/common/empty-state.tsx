import { LucideIcon } from "lucide-react";
import React from "react";

export default function EmptyState({ message, icon: Icon }: { message?: string; icon?: LucideIcon }) {
  return (
    <div className="empty-state">   
      {Icon && <Icon className="size-12 text-muted-foreground/50 mx-auto mb-4" />}
      <p className="text-lg font-medium" >{message || "No products found"}</p>
    </div>
  );
}
