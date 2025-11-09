import { useState, useEffect, useCallback } from "react";

interface ArmPosition {
  x: number;
  y: number;
  z: number;
  rotation: number;
}

interface Sensors {
  pressure: number;
  temperature: number;
  current: number;
  vibration: number;
}

interface ActivityLog {
  timestamp: string;
  message: string;
  type: "info" | "success" | "warning";
}

export const useRoboticArmSimulation = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(35);
  const [currentFacet, setCurrentFacet] = useState(21);
  const [armPosition, setArmPosition] = useState<ArmPosition>({
    x: 125.5,
    y: 83.2,
    z: 45.8,
    rotation: 37.5,
  });
  const [sensors, setSensors] = useState<Sensors>({
    pressure: 2.4,
    temperature: 42,
    current: 1.8,
    vibration: 0.3,
  });
  const [activityLog, setActivityLog] = useState<ActivityLog[]>([
    { timestamp: "14:32:15", message: "Facet 21 completed", type: "success" },
    { timestamp: "14:30:48", message: "Position adjusted", type: "info" },
    { timestamp: "14:28:22", message: "Facet 20 completed", type: "success" },
    { timestamp: "14:26:55", message: "System calibrated", type: "success" },
  ]);

  const addLog = useCallback((message: string, type: ActivityLog["type"] = "info") => {
    const now = new Date();
    const timestamp = now.toLocaleTimeString("en-US", { hour12: false });
    setActivityLog((prev) => [{ timestamp, message, type }, ...prev.slice(0, 9)]);
  }, []);

  // Simulation loop when running
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      // Update progress
      setProgress((prev) => {
        const newProgress = Math.min(prev + 0.5, 100);
        if (newProgress === 100) {
          setIsRunning(false);
          addLog("Cutting complete!", "success");
        }
        return newProgress;
      });

      // Update facet count
      setCurrentFacet((prev) => {
        if (Math.random() > 0.7 && prev < 58) {
          const newFacet = prev + 1;
          addLog(`Facet ${newFacet} completed`, "success");
          return newFacet;
        }
        return prev;
      });

      // Simulate arm movement
      setArmPosition((prev) => ({
        x: prev.x + (Math.random() - 0.5) * 2,
        y: prev.y + (Math.random() - 0.5) * 2,
        z: prev.z + (Math.random() - 0.5) * 1,
        rotation: (prev.rotation + (Math.random() - 0.5) * 5) % 360,
      }));

      // Update sensors with realistic variations
      setSensors((prev) => ({
        pressure: Math.max(1.5, Math.min(3.5, prev.pressure + (Math.random() - 0.5) * 0.2)),
        temperature: Math.max(38, Math.min(48, prev.temperature + (Math.random() - 0.5) * 0.5)),
        current: Math.max(1.2, Math.min(2.5, prev.current + (Math.random() - 0.5) * 0.1)),
        vibration: Math.max(0.1, Math.min(0.6, prev.vibration + (Math.random() - 0.5) * 0.05)),
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, addLog]);

  const start = useCallback(() => {
    setIsRunning(true);
    addLog("System started - Operation initiated", "success");
  }, [addLog]);

  const pause = useCallback(() => {
    setIsRunning(false);
    addLog("System paused - Operation halted", "warning");
  }, [addLog]);

  const reset = useCallback(() => {
    setIsRunning(false);
    setProgress(0);
    setCurrentFacet(0);
    setArmPosition({ x: 100, y: 80, z: 50, rotation: 0 });
    setSensors({ pressure: 2.4, temperature: 40, current: 1.8, vibration: 0.2 });
    addLog("System reset - Returning to home position", "info");
  }, [addLog]);

  const emergencyStop = useCallback(() => {
    setIsRunning(false);
    addLog("⚠️ EMERGENCY STOP - All operations halted", "warning");
  }, [addLog]);

  return {
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
  };
};
