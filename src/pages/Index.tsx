import { StatusIndicator } from "@/components/StatusIndicator";
import { SensorCard } from "@/components/SensorCard";
import { ControlButton } from "@/components/ControlButton";
import { CameraFeed } from "@/components/CameraFeed";
import { ArmPositionDisplay } from "@/components/ArmPositionDisplay";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useRoboticArmSimulation } from "@/hooks/useRoboticArmSimulation";
import { 
  Gauge, 
  Thermometer, 
  Zap, 
  Play, 
  Pause, 
  RotateCcw, 
  AlertOctagon,
  Activity,
  Gem
} from "lucide-react";

const Index = () => {
  const {
    isRunning,
    progress,
    currentFacet,
    armPosition,
    sensors,
    activityLog,
    start,
    pause,
    reset,
    emergencyStop,
  } = useRoboticArmSimulation();

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-background via-background to-background/95 overflow-auto">
      <div className="min-h-screen max-w-[1280px] mx-auto p-6">
        {/* Header */}
        <header className="mb-6 animate-in fade-in slide-in-from-top duration-500">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-[0_0_20px_hsl(var(--primary)/0.3)]">
                <Gem className="w-7 h-7 text-background" />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary to-accent animate-pulse opacity-50" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground tracking-tight">Gem Cutting Control</h1>
                <p className="text-sm text-muted-foreground">Intelligent Robotic Arm Interface</p>
              </div>
            </div>
            <div className="flex gap-4">
              <StatusIndicator 
                status={isRunning ? "active" : "idle"} 
                label={isRunning ? "OPERATING" : "STANDBY"} 
              />
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Camera Feeds & Position */}
          <div className="space-y-6 animate-in fade-in slide-in-from-left duration-700">
            <CameraFeed label="Primary View" isActive={isRunning} />
            <CameraFeed label="Detail View" isActive={isRunning} />
            <ArmPositionDisplay 
              x={armPosition.x} 
              y={armPosition.y} 
              z={armPosition.z} 
              rotation={armPosition.rotation} 
            />
          </div>

          {/* Middle Column - Main Control & Progress */}
          <div className="space-y-6 animate-in fade-in duration-700 delay-150">
            {/* Cutting Progress */}
            <Card className="p-6 border-primary/20 shadow-[0_0_30px_hsl(var(--primary)/0.1)] bg-gradient-to-br from-card to-card/50">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-foreground uppercase tracking-widest">
                    Cutting Progress
                  </h3>
                  <span className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    {progress.toFixed(1)}%
                  </span>
                </div>
                <div className="relative">
                  <Progress value={progress} className="h-4 bg-muted/50" />
                  <div 
                    className="absolute top-0 left-0 h-4 bg-gradient-to-r from-primary via-accent to-primary rounded-full transition-all duration-300 shadow-[0_0_15px_hsl(var(--primary)/0.5)]"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Estimated: {Math.floor((100 - progress) * 0.15)}:{Math.floor(((100 - progress) * 0.15 % 1) * 60).toString().padStart(2, '0')}</span>
                  <span>{isRunning ? "Running..." : "Paused"}</span>
                </div>
              </div>
            </Card>

            {/* Pattern Info */}
            <Card className="p-6 border-accent/20 bg-gradient-to-br from-card to-card/50">
              <h3 className="text-sm font-semibold text-foreground uppercase tracking-widest mb-4 flex items-center gap-2">
                <div className="w-1 h-4 bg-gradient-to-b from-primary to-accent rounded-full" />
                Active Pattern
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 rounded-lg bg-muted/30">
                  <span className="text-sm text-muted-foreground">Pattern Type</span>
                  <span className="text-sm font-semibold text-foreground">Brilliant Cut</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg bg-muted/30">
                  <span className="text-sm text-muted-foreground">Total Facets</span>
                  <span className="text-sm font-semibold text-foreground">58</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg bg-primary/10 border border-primary/30">
                  <span className="text-sm text-muted-foreground">Current Facet</span>
                  <span className="text-sm font-bold text-primary">{currentFacet}/58</span>
                </div>
              </div>
            </Card>

            {/* Control Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <ControlButton
                icon={Play}
                label="Start"
                variant="success"
                onClick={start}
                disabled={isRunning}
              />
              <ControlButton
                icon={Pause}
                label="Pause"
                onClick={pause}
                disabled={!isRunning}
              />
              <ControlButton
                icon={RotateCcw}
                label="Reset"
                onClick={reset}
              />
              <ControlButton
                icon={AlertOctagon}
                label="E-STOP"
                variant="danger"
                onClick={emergencyStop}
              />
            </div>
          </div>

          {/* Right Column - Sensors & Status */}
          <div className="space-y-6 animate-in fade-in slide-in-from-right duration-700 delay-300">
            <Card className="p-6 border-success/20 bg-gradient-to-br from-card to-card/50">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Activity className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-sm font-semibold text-foreground uppercase tracking-widest">
                  System Sensors
                </h3>
              </div>
              <div className="space-y-4">
                <SensorCard
                  icon={Gauge}
                  label="Grip Pressure"
                  value={sensors.pressure.toFixed(2)}
                  unit="N"
                  status={sensors.pressure > 3 ? "warning" : "normal"}
                />
                <SensorCard
                  icon={Thermometer}
                  label="Temperature"
                  value={sensors.temperature.toFixed(1)}
                  unit="°C"
                  status={sensors.temperature > 45 ? "warning" : "normal"}
                />
                <SensorCard
                  icon={Zap}
                  label="Motor Current"
                  value={sensors.current.toFixed(2)}
                  unit="A"
                  status={sensors.current > 2.2 ? "warning" : "normal"}
                />
                <SensorCard
                  icon={Activity}
                  label="Vibration Level"
                  value={sensors.vibration.toFixed(2)}
                  unit="mm/s"
                  status={sensors.vibration > 0.5 ? "warning" : "normal"}
                />
              </div>
            </Card>

            {/* System Log */}
            <Card className="p-6 border-muted/20 bg-gradient-to-br from-card to-card/50">
              <h3 className="text-sm font-semibold text-foreground uppercase tracking-widest mb-4 flex items-center gap-2">
                <div className="w-1 h-4 bg-gradient-to-b from-accent to-primary rounded-full" />
                Recent Activity
              </h3>
              <div className="space-y-2 max-h-[300px] overflow-y-auto">
                {activityLog.map((log, index) => (
                  <div 
                    key={index} 
                    className="flex gap-3 p-2 rounded-lg hover:bg-muted/20 transition-colors animate-in fade-in slide-in-from-bottom duration-300"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <span className="text-xs text-muted-foreground font-mono min-w-[60px]">
                      {log.timestamp}
                    </span>
                    <span className={`text-xs ${
                      log.type === "success" ? "text-success" : 
                      log.type === "warning" ? "text-warning" : 
                      "text-foreground"
                    }`}>
                      {log.message}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
