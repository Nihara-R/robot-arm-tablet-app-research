import { Card } from "@/components/ui/card";
import { Move3d } from "lucide-react";

interface ArmPositionDisplayProps {
  x: number;
  y: number;
  z: number;
  rotation: number;
}

export const ArmPositionDisplay = ({ x, y, z, rotation }: ArmPositionDisplayProps) => {
  return (
    <Card className="p-6 border-accent/20 bg-gradient-to-br from-card to-card/50">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
          <Move3d className="w-5 h-5 text-primary" />
        </div>
        <h3 className="text-sm font-semibold text-foreground uppercase tracking-widest">ARM POSITION</h3>
      </div>
      
      <div className="space-y-3">
        <div className="flex justify-between items-center p-3 rounded-lg bg-muted/30 border border-border/50">
          <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">X-Axis</span>
          <span className="text-xl font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
            {x.toFixed(2)} <span className="text-sm text-muted-foreground">mm</span>
          </span>
        </div>
        <div className="flex justify-between items-center p-3 rounded-lg bg-muted/30 border border-border/50">
          <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Y-Axis</span>
          <span className="text-xl font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
            {y.toFixed(2)} <span className="text-sm text-muted-foreground">mm</span>
          </span>
        </div>
        <div className="flex justify-between items-center p-3 rounded-lg bg-muted/30 border border-border/50">
          <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Z-Axis</span>
          <span className="text-xl font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
            {z.toFixed(2)} <span className="text-sm text-muted-foreground">mm</span>
          </span>
        </div>
        <div className="flex justify-between items-center p-3 rounded-lg bg-primary/10 border border-primary/30 shadow-[0_0_15px_hsl(var(--primary)/0.1)]">
          <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Rotation</span>
          <span className="text-xl font-bold text-primary">
            {rotation.toFixed(1)}<span className="text-sm">°</span>
          </span>
        </div>
      </div>
    </Card>
  );
};
