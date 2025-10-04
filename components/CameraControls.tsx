"use client";

import { useTranslation } from "@/hooks/useTranslation";

interface CameraControlsProps {
  cameraHeight: number;
  onChangeHeight: (height: number) => void;
  minHeight?: number;
  maxHeight?: number;
}

export function CameraControls({
  cameraHeight,
  onChangeHeight,
  minHeight = 0.5,
  maxHeight = 5
}: CameraControlsProps) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-3 rounded-lg border border-slate-800 bg-slate-900/60 p-3 text-sm shadow-lg md:gap-4 md:p-4">
      <div>
        <h2 className="text-base font-semibold text-slate-50 md:text-lg">{t.cameraPanel.title}</h2>
        <p className="text-xs text-slate-400 md:text-sm">{t.cameraPanel.description}</p>
      </div>
      <label className="flex flex-col gap-2 text-xs text-slate-300 md:text-sm">
        <span>{t.cameraPanel.heightLabel}</span>
        <input
          type="number"
          min={minHeight}
          max={maxHeight}
          step={0.1}
          value={cameraHeight.toFixed(2)}
          onChange={(event) => {
            const value = Number(event.target.value);
            if (!Number.isNaN(value)) {
              onChangeHeight(Math.min(Math.max(value, minHeight), maxHeight));
            }
          }}
          className="w-full rounded-md border border-slate-700 bg-slate-950/40 px-3 py-2 text-slate-100 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
        />
      </label>
    </div>
  );
}
