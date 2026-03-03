import { cn } from "@/lib/utils";

type AvatarSize = "sm" | "md" | "lg";

interface AvatarProps {
  name: string;
  size?: AvatarSize;
  className?: string;
}

const AVATAR_COLORS = [
  "bg-red-500 text-white",
  "bg-orange-500 text-white",
  "bg-amber-500 text-white",
  "bg-green-600 text-white",
  "bg-teal-500 text-white",
  "bg-blue-500 text-white",
  "bg-violet-500 text-white",
  "bg-pink-500 text-white",
];

const sizeClasses: Record<AvatarSize, string> = {
  sm: "size-7 text-xs",
  md: "size-9 text-sm",
  lg: "size-12 text-base",
};

function getInitials(name: string): string {
  const trimmed = name.trim();
  if (!trimmed) return "?";

  if (trimmed.includes("@")) {
    const localPart = trimmed.split("@")[0];
    return localPart.charAt(0).toUpperCase();
  }

  const parts = trimmed.split(/\s+/);
  if (parts.length === 1) {
    return parts[0].charAt(0).toUpperCase();
  }

  return (
    parts[0].charAt(0).toUpperCase() +
    parts[parts.length - 1].charAt(0).toUpperCase()
  );
}

function getAvatarColor(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash += name.charCodeAt(i);
  }
  return AVATAR_COLORS[hash % AVATAR_COLORS.length];
}

function Avatar({ name, size = "md", className }: AvatarProps) {
  const initials = getInitials(name);
  const colorClass = getAvatarColor(name);
  const sizeClass = sizeClasses[size];

  return (
    <div
      data-slot="avatar"
      aria-label={name}
      className={cn(
        "inline-flex items-center justify-center rounded-full font-semibold select-none shrink-0",
        colorClass,
        sizeClass,
        className
      )}
    >
      {initials}
    </div>
  );
}

export { Avatar, getInitials, getAvatarColor };
export type { AvatarProps, AvatarSize };
