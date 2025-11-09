import { cn } from "@/lib/utils";

interface StatusIndicatorProps {
  status: "active" | "idle" | "warning" | "error";
  label: string;
  className?: string;
}

export const StatusIndicator = ({ status, label, className }: StatusIndicatorProps) => {
  const statusConfig = {
    active: {
      color: "bg-success",
      shadowColor: "shadow-[0_0_20px_hsl(var(--success)/0.5)]",
      label: label || "ACTIVE",
    },
    idle: {
      color: "bg-muted-foreground",
      shadowColor: "shadow-[0_0_10px_hsl(var(--muted-foreground)/0.3)]",
      label: label || "IDLE",
    },
    warning: {
      color: "bg-warning",
      shadowColor: "shadow-[0_0_20px_hsl(var(--warning)/0.5)]",
      label: label || "WARNING",
    },
    error: {
      color: "bg-destructive",
      shadowColor: "shadow-[0_0_20px_hsl(var(--destructive)/0.5)]",
      label: label || "ERROR",
    },
  };

  const config = statusConfig[status];

  return (
    <div className={cn(
      "flex items-center gap-3 px-5 py-3 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50",
      className
    )}>
      <div className="relative">
        <div className={cn(
          "w-3 h-3 rounded-full animate-pulse",
          config.color,
          config.shadowColor
        )} />
        <div className={cn(
          "absolute inset-0 w-3 h-3 rounded-full animate-ping",
          config.color,
          "opacity-75"
        )} />
      </div>
      <span className="text-sm font-bold text-foreground tracking-widest">
        {config.label}
      </span>
    </div>
  );
};
