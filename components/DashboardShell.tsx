"use client";

import { useEffect } from "react";
import type { SceneSpec, SensorSpec } from "@/lib/types";
import { useAppStore } from "@/hooks/useAppStore";
import { useTranslation } from "@/hooks/useTranslation";
import { SensorSelector } from "@/components/SensorSelector";
import { SceneSelector } from "@/components/SceneSelector";
import { CameraControls } from "@/components/CameraControls";
import { DepthViewCanvas } from "@/components/DepthViewCanvas";
import { CoverageStats } from "@/components/CoverageStats";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

interface DashboardShellProps {
  sensors: SensorSpec[];
  scenes: SceneSpec[];
}

export function DashboardShell({ sensors, scenes }: DashboardShellProps) {
  const {
    sensors: storeSensors,
    scenes: storeScenes,
    selectedSensorId,
    selectedDepthResolution,
    selectedSceneId,
    cameraHeight,
    setSensors,
    setScenes,
    selectSensor,
    selectDepthResolution,
    selectScene,
    setCameraHeight
  } = useAppStore();
  const { t } = useTranslation();

  useEffect(() => {
    if (storeSensors.length === 0 && sensors.length > 0) {
      setSensors(sensors);
    }
  }, [sensors, storeSensors.length, setSensors]);

  useEffect(() => {
    if (storeScenes.length === 0 && scenes.length > 0) {
      setScenes(scenes);
    }
  }, [scenes, storeScenes.length, setScenes]);

  const selectedSensor = storeSensors.find((sensor) => sensor.id === selectedSensorId);
  const selectedScene = storeScenes.find((scene) => scene.id === selectedSceneId);

  return (
    <section className="flex flex-col gap-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold text-slate-50">{t.appName}</h1>
        <p className="max-w-3xl text-sm text-slate-400">{t.appDescription}</p>
      </header>
      <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
        <div className="space-y-6">
          <LanguageSwitcher />
          <SensorSelector
            sensors={storeSensors}
            selectedSensor={selectedSensor}
            selectedResolution={selectedDepthResolution}
            onSelectSensor={selectSensor}
            onSelectResolution={selectDepthResolution}
          />
          <CameraControls cameraHeight={cameraHeight} onChangeHeight={setCameraHeight} />
          <SceneSelector scenes={storeScenes} selectedScene={selectedScene} onSelectScene={selectScene} />
          <CoverageStats scene={selectedScene} sensor={selectedSensor} />
        </div>
        <div className="space-y-6">
          <DepthViewCanvas
            scene={selectedScene}
            sensor={selectedSensor}
            resolution={selectedDepthResolution}
            cameraHeight={cameraHeight}
          />
        </div>
      </div>
    </section>
  );
}
