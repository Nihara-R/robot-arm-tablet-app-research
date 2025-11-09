import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface ControlButtonProps {
  icon: LucideIcon;
  label: string;
  onClick?: () => void;
  variant?: "default" | "danger" | "success";
  disabled?: boolean;
  className?: string;
}

export const ControlButton = ({
  icon: Icon,
  label,
  onClick,
  variant = "default",
  disabled = false,
  className,
}: ControlButtonProps) => {
  const variantStyles = {
    default: "bg-gradient-to-br from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground shadow-[0_0_20px_hsl(var(--primary)/0.3)] hover:shadow-[0_0_30px_hsl(var(--primary)/0.4)]",
    danger: "bg-gradient-to-br from-destructive to-destructive/80 hover:from-destructive/90 hover:to-destructive/70 text-destructive-foreground shadow-[0_0_20px_hsl(var(--destructive)/0.3)] hover:shadow-[0_0_30px_hsl(var(--destructive)/0.4)]",
    success: "bg-gradient-to-br from-success to-success/80 hover:from-success/90 hover:to-success/70 text-background shadow-[0_0_20px_hsl(var(--success)/0.3)] hover:shadow-[0_0_30px_hsl(var(--success)/0.4)]",
  };

  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "flex flex-col items-center justify-center gap-3 h-28 w-full transition-all duration-300 rounded-xl border border-white/10 hover:scale-[1.02] hover:border-white/20 active:scale-95",
        variantStyles[variant],
        disabled && "opacity-40 cursor-not-allowed hover:scale-100 hover:shadow-none",
        className
      )}
    >
      <Icon className="w-7 h-7" />
      <span className="text-sm font-bold tracking-wider">{label}</span>
    </Button>
  );
};
