import sensors from "@data/sensors.json";
import scenes from "@data/scenes.json";
import type { SceneSpec, SensorSpec } from "@/lib/types";

export function loadSensors(): SensorSpec[] {
  return sensors as SensorSpec[];
}

export function loadScenes(): SceneSpec[] {
  return scenes as SceneSpec[];
}
