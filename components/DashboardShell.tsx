"use client";

import { useEffect } from "react";
import type { ReactNode } from "react";
import type { SceneSpec, SensorSpec } from "@/lib/types";
import { useAppStore } from "@/hooks/useAppStore";
import { useTranslation } from "@/hooks/useTranslation";
import { SensorSelector } from "@/components/SensorSelector";
import { SensorSpecTable } from "@/components/SensorSpecTable";
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
    cameraDistanceMode,
    manualCameraDistance,
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
    <section className="relative flex flex-col gap-4 md:gap-8">
      <div className="absolute right-2 top-2 z-10 flex gap-1 text-[10px] text-slate-300">
        <LanguageSwitcher variant="compact" className="text-[10px]" />
      </div>
      <header className="space-y-2 pr-24 md:pr-32">
        <h1 className="text-2xl font-semibold text-slate-50 md:text-4xl">{t.appName}</h1>
        <p className="max-w-3xl text-xs text-slate-400 md:text-sm">{t.appDescription}</p>
      </header>
      <div className="grid gap-4 md:grid-cols-[minmax(0,360px)_1fr] md:gap-6">
        <div className="space-y-4 md:space-y-6">
          <SensorSelector
            sensors={storeSensors}
            selectedSensor={selectedSensor}
            selectedResolution={selectedDepthResolution}
            onSelectSensor={selectSensor}
            onSelectResolution={selectDepthResolution}
          />
          <CameraControls cameraHeight={cameraHeight} onChangeHeight={setCameraHeight} />
          <CollapsibleSection title={t.sensorPanel.specTitle}>
            <SensorSpecTable sensor={selectedSensor} variant="plain" />
          </CollapsibleSection>
          <CollapsibleSection title={t.scenePanel.title}>
            <SceneSelector
              scenes={storeScenes}
              selectedScene={selectedScene}
              onSelectScene={selectScene}
              variant="plain"
            />
          </CollapsibleSection>
          <CollapsibleSection title={t.coveragePanel.title}>
            <CoverageStats scene={selectedScene} sensor={selectedSensor} variant="plain" />
          </CollapsibleSection>
        </div>
        <div className="space-y-4 md:space-y-6">
          <DepthViewCanvas
            scene={selectedScene}
            sensor={selectedSensor}
            resolution={selectedDepthResolution}
            cameraHeight={cameraHeight}
            cameraDistanceMode={cameraDistanceMode}
            manualCameraDistance={manualCameraDistance}
          />
        </div>
      </div>
      <footer className="rounded-lg border border-slate-800 bg-slate-900/60 p-3 text-xs text-slate-300 shadow md:p-4 md:text-sm">
        {t.appNotes}
      </footer>
    </section>
  );
}

function CollapsibleSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <details className="group rounded-lg border border-slate-800 bg-slate-900/50 p-3 shadow-lg transition-colors group-open:bg-slate-900/70">
      <summary className="flex cursor-pointer items-center justify-between rounded-md px-1 py-1 text-sm font-semibold text-slate-200 transition-colors hover:text-brand-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 md:text-base [&_::-webkit-details-marker]:hidden">
        {title}
        <span
          aria-hidden
          className="text-xs text-slate-500 transition-transform group-open:rotate-180 group-open:text-brand-300"
        >&gt;</span>
      </summary>
      <div className="mt-3 text-xs text-slate-200 md:text-sm">{children}</div>
    </details>
  );
}

