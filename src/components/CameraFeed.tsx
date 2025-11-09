import { Card } from "@/components/ui/card";
import { Camera, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CameraFeedProps {
  label: string;
  isActive?: boolean;
  className?: string;
}

export const CameraFeed = ({ label, isActive = true, className }: CameraFeedProps) => {
  return (
    <Card className={cn("overflow-hidden border-primary/20", className)}>
      <div className="relative aspect-video bg-gradient-to-br from-secondary to-secondary/30 rounded-t-lg overflow-hidden">
        {isActive ? (
          <div className="absolute inset-0">
            {/* Simulated scan lines */}
            <div className="absolute inset-0 bg-[linear-gradient(transparent_0%,rgba(255,255,255,0.05)_50%,transparent_100%)] bg-[length:100%_4px] animate-pulse" />
            
            {/* Center content */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center mx-auto shadow-[0_0_30px_hsl(var(--primary)/0.3)]">
                  <Camera className="w-10 h-10 text-primary" />
                </div>
                <p className="text-sm text-foreground/80 font-medium">Camera Feed: {label}</p>
                <div className="flex gap-2 justify-center items-center">
                  <div className="relative w-2 h-2 rounded-full bg-success">
                    <div className="absolute inset-0 rounded-full bg-success animate-ping" />
                  </div>
                  <span className="text-xs text-success font-bold tracking-wider">LIVE</span>
                </div>
              </div>
            </div>
            
            {/* Corner markers */}
            <div className="absolute top-3 left-3 w-6 h-6 border-l-2 border-t-2 border-primary/50" />
            <div className="absolute top-3 right-3 w-6 h-6 border-r-2 border-t-2 border-primary/50" />
            <div className="absolute bottom-3 left-3 w-6 h-6 border-l-2 border-b-2 border-primary/50" />
            <div className="absolute bottom-3 right-3 w-6 h-6 border-r-2 border-b-2 border-primary/50" />
          </div>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-secondary/80">
            <div className="text-center space-y-3">
              <Camera className="w-12 h-12 text-muted-foreground mx-auto opacity-50" />
              <p className="text-sm text-muted-foreground">Camera Offline</p>
            </div>
          </div>
        )}
        <Button
          size="icon"
          variant="ghost"
          className="absolute top-2 right-2 bg-background/60 backdrop-blur-sm hover:bg-background/80 border border-border/50"
        >
          <Maximize2 className="w-4 h-4" />
        </Button>
      </div>
      <div className="p-3 border-t border-border/50 bg-card/50 backdrop-blur-sm">
        <p className="text-sm font-semibold text-foreground">{label}</p>
      </div>
    </Card>
  );
};
