import { create } from "zustand";
import type { ResolutionSpec, SceneSpec, SensorSpec } from "@/lib/types";
import type { SupportedLanguage } from "@/lib/i18n";

export interface AppState {
  sensors: SensorSpec[];
  scenes: SceneSpec[];
  selectedSensorId?: string;
  selectedDepthResolution?: ResolutionSpec;
  selectedSceneId?: string;
  cameraHeight: number;
  language: SupportedLanguage;
  setSensors: (sensors: SensorSpec[]) => void;
  setScenes: (scenes: SceneSpec[]) => void;
  selectSensor: (sensorId: string) => void;
  selectDepthResolution: (resolution: ResolutionSpec) => void;
  selectScene: (sceneId: string) => void;
  setCameraHeight: (height: number) => void;
  setLanguage: (language: SupportedLanguage) => void;
}

export const useAppStore = create<AppState>((set) => ({
  sensors: [],
  scenes: [],
  selectedSensorId: undefined,
  selectedDepthResolution: undefined,
  selectedSceneId: undefined,
  cameraHeight: 2.2,
  language: "ja",
  setSensors: (sensors) =>
    set((state) => ({
      sensors,
      selectedSensorId: state.selectedSensorId ?? sensors[0]?.id,
      selectedDepthResolution:
        state.selectedDepthResolution ?? sensors[0]?.depthResolutions[0]
    })),
  setScenes: (scenes) =>
    set((state) => ({
      scenes,
      selectedSceneId: state.selectedSceneId ?? scenes[0]?.id,
      cameraHeight:
        state.cameraHeight !== undefined
          ? state.cameraHeight
          : scenes[0]?.defaultCameraPose?.position_m.y ?? 2.2
    })),
  selectSensor: (sensorId) =>
    set((state) => {
      const sensor = state.sensors.find((item) => item.id === sensorId);
      return {
        selectedSensorId: sensorId,
        selectedDepthResolution: sensor?.depthResolutions?.[0]
      };
    }),
  selectDepthResolution: (resolution) =>
    set({
      selectedDepthResolution: resolution
    }),
  selectScene: (sceneId) =>
    set((state) => ({
      selectedSceneId: sceneId,
      cameraHeight:
        state.scenes.find((scene) => scene.id === sceneId)?.defaultCameraPose?.position_m.y ??
        state.cameraHeight
    })),
  setCameraHeight: (height) => set({ cameraHeight: Math.max(0.1, height) }),
  setLanguage: (language) => set({ language })
}));
