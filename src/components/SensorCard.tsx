import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface SensorCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  unit?: string;
  status?: "normal" | "warning" | "critical";
  className?: string;
}

export const SensorCard = ({
  icon: Icon,
  label,
  value,
  unit,
  status = "normal",
  className,
}: SensorCardProps) => {
  const statusColors = {
    normal: "border-success/40 bg-success/5 shadow-[0_0_15px_hsl(var(--success)/0.1)]",
    warning: "border-warning/40 bg-warning/5 shadow-[0_0_15px_hsl(var(--warning)/0.1)]",
    critical: "border-destructive/40 bg-destructive/5 shadow-[0_0_15px_hsl(var(--destructive)/0.1)]",
  };

  const statusIndicator = {
    normal: "bg-success",
    warning: "bg-warning",
    critical: "bg-destructive",
  };

  return (
    <Card className={cn(
      "p-4 border-2 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg backdrop-blur-sm",
      statusColors[status],
      className
    )}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Icon className="w-4 h-4 text-primary" />
            </div>
            <p className="text-xs text-muted-foreground uppercase tracking-widest font-semibold">{label}</p>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              {value}
            </span>
            {unit && <span className="text-sm text-muted-foreground font-medium">{unit}</span>}
          </div>
        </div>
        <div className={cn("w-2 h-2 rounded-full animate-pulse", statusIndicator[status])} />
      </div>
    </Card>
  );
};
