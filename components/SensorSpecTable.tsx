"use client";

import type { SensorSpec } from "@/lib/types";
import { useTranslation } from "@/hooks/useTranslation";

interface SensorSpecTableProps {
  sensor?: SensorSpec;
}

function formatRange(range?: SensorSpec["depthRange_m"], unit = "m") {
  if (!range) return "-";
  const min = range.min?.toFixed(2);
  const max = range.max?.toFixed(2);
  if (min && max) {
    return `${min}${unit} – ${max}${unit}`;
  }
  if (max) return `0 – ${max}${unit}`;
  return min ? `${min}${unit}` : "-";
}

function formatFov(fov?: SensorSpec["depthFov_deg"]) {
  if (!fov) return "-";
  const { horizontal, vertical, diagonal } = fov;
  const base = `${horizontal}° × ${vertical}°`;
  return diagonal ? `${base} (diag ${diagonal}°)` : base;
}

function formatResolutions(res?: SensorSpec["depthResolutions"]) {
  if (!res || res.length === 0) return "-";
  return res
    .map((entry) => {
      const label = entry.label ? `${entry.label} ` : "";
      const fps = entry.fps?.length ? ` @ ${entry.fps.join("/")} FPS` : "";
      return `${label}${entry.width}×${entry.height}${fps}`;
    })
    .join(", ");
}

function formatRgbResolutions(res?: SensorSpec["rgbResolutions"]) {
  if (!res || res.length === 0) return "-";
  return res
    .map((entry) => {
      const fps = entry.fps?.length ? ` @ ${entry.fps.join("/")} FPS` : "";
      return `${entry.width}×${entry.height}${fps}`;
    })
    .join(", ");
}

function formatImu(imu?: SensorSpec["imu"]) {
  if (!imu) return "-";
  const enabled = Object.entries(imu)
    .filter(([, value]) => Boolean(value))
    .map(([key]) => key.toUpperCase());
  return enabled.length ? enabled.join(", ") : "-";
}

export function SensorSpecTable({ sensor }: SensorSpecTableProps) {
  const { t } = useTranslation();

  return (
    <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-3 text-xs text-slate-200 shadow-lg md:p-4 md:text-sm">
      <h3 className="mb-2 text-base font-semibold text-slate-50 md:text-lg">
        {t.sensorPanel.specTitle}
      </h3>
      {!sensor ? (
        <p className="text-slate-400">-</p>
      ) : (
        <dl className="grid gap-2">
          <SpecRow label={t.sensorSpec.vendor} value={sensor.vendor ?? "-"} />
          <SpecRow label={t.sensorSpec.type} value={sensor.sensorType ?? "-"} />
          <SpecRow label={t.sensorSpec.depthRange} value={formatRange(sensor.depthRange_m)} />
          <SpecRow label={t.sensorSpec.fov} value={formatFov(sensor.depthFov_deg)} />
          <SpecRow
            label={t.sensorSpec.baseline}
            value={sensor.baseline_mm ? `${sensor.baseline_mm} mm` : "-"}
          />
          <SpecRow
            label={t.sensorSpec.depthRes}
            value={formatResolutions(sensor.depthResolutions)}
          />
          <SpecRow
            label={t.sensorSpec.rgbRes}
            value={formatRgbResolutions(sensor.rgbResolutions)}
          />
          <SpecRow label={t.sensorSpec.interfaces} value={sensor.interfaces.join(", ") || "-"} />
          <SpecRow
            label={t.sensorSpec.imu}
            value={formatImu(sensor.imu)}
          />
          <SpecRow
            label={t.sensorSpec.power}
            value={sensor.power_W ? `${sensor.power_W.toFixed(2)} W` : "-"}
          />
          {sensor.notes && sensor.notes.length > 0 && (
            <SpecRow label={t.sensorSpec.notes} value={sensor.notes.join(" / ")} />
          )}
        </dl>
      )}
    </div>
  );
}

function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <dt className="w-32 shrink-0 text-slate-400 md:w-36">{label}</dt>
      <dd className="flex-1 text-slate-100">{value || "-"}</dd>
    </div>
  );
}
