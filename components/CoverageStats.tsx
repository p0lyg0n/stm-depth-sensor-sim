import type { SceneSpec, SensorSpec } from "@/lib/types";
import { useTranslation } from "@/hooks/useTranslation";
import { formatCoverage } from "@/lib/i18n";

interface CoverageStatsProps {
  scene?: SceneSpec;
  sensor?: SensorSpec;
  coverageRatio?: number;
}

export function CoverageStats({ scene, sensor, coverageRatio }: CoverageStatsProps) {
  const { t, language } = useTranslation();

  return (
    <div className="grid gap-3 rounded-lg border border-slate-800 bg-slate-900/60 p-3 text-sm text-slate-200 shadow-lg md:p-4">
      <h2 className="text-base font-semibold text-slate-50 md:text-lg">{t.coveragePanel.title}</h2>
      <p className="text-xs text-slate-400 md:text-sm">{t.coveragePanel.description}</p>
      <div className="grid gap-2">
        <InfoRow label={t.coveragePanel.sceneLabel} value={scene ? scene.name : "-"} />
        <InfoRow label={t.coveragePanel.sensorLabel} value={sensor ? `${sensor.name} (${sensor.vendor})` : "-"} />
        <InfoRow
          label={t.coveragePanel.coverageLabel}
          value={formatCoverage(coverageRatio, language)}
        />
      </div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-md bg-slate-950/30 px-3 py-2 text-xs md:text-sm">
      <span className="text-slate-400">{label}</span>
      <span className="font-medium text-slate-100">{value}</span>
    </div>
  );
}
