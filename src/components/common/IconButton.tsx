import { cn } from "@/utils/ui";

interface IconButtonProps {
  className?: string;
  children: React.ReactNode;
  ariaLabel: string;
  onClick?: () => void;
  size?: "sm" | "md" | "lg";
}

export default function IconButton({
  className = "",
  children,
  ariaLabel,
  onClick,
  size = "md",
}: IconButtonProps) {
  const sizeClasses =
    size === "sm" ? "h-8 w-8" : size === "lg" ? "h-12 w-12" : "h-10 w-10";

  return (
    <button
      type="button"
      aria-label={ariaLabel}
      onClick={onClick}
      className={cn([
        "pressable",
        "rounded-lg",
        "bg-white/85 shadow-lg backdrop-blur-sm",
        sizeClasses,
        className,
      ])}
    >
      {children}
    </button>
  );
}
