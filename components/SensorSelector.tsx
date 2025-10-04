"use client";

import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { clsx } from "clsx";
import type { ResolutionSpec, SensorSpec } from "@/lib/types";
import { useTranslation } from "@/hooks/useTranslation";

interface SensorSelectorProps {
  sensors: SensorSpec[];
  selectedSensor?: SensorSpec;
  selectedResolution?: ResolutionSpec;
  onSelectSensor: (sensorId: string) => void;
  onSelectResolution: (resolution: ResolutionSpec) => void;
}

export function SensorSelector({
  sensors,
  selectedSensor,
  selectedResolution,
  onSelectSensor,
  onSelectResolution
}: SensorSelectorProps) {
  const { t } = useTranslation();

  return (
    <div className="relative flex flex-col gap-4 rounded-lg border border-slate-800 bg-slate-900/50 p-4 shadow-lg">
      <div>
        <h2 className="text-lg font-semibold text-slate-50">{t.sensorPanel.title}</h2>
        <p className="text-sm text-slate-400">{t.sensorPanel.description}</p>
      </div>
      <Listbox value={selectedSensor?.id} onChange={onSelectSensor}>
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full cursor-default rounded-md bg-slate-800/60 py-2 pl-3 pr-10 text-left text-sm text-slate-100 shadow-md focus:outline-none focus-visible:border-brand-500 focus-visible:ring-2 focus-visible:ring-brand-400">
            <span className="block truncate">
              {selectedSensor ? `${selectedSensor.name} (${selectedSensor.vendor})` : t.sensorPanel.title}
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-slate-800 py-1 text-sm shadow-lg ring-1 ring-black/5 focus:outline-none">
              {sensors.map((sensor) => (
                <Listbox.Option
                  key={sensor.id}
                  value={sensor.id}
                  className={({ active }) =>
                    clsx(
                      "relative cursor-default select-none py-2 pl-3 pr-9",
                      active ? "bg-brand-500/20 text-brand-200" : "text-slate-200"
                    )
                  }
                >
                  {({ selected }) => (
                    <span
                      className={clsx(
                        "block truncate",
                        selected ? "font-medium" : "font-normal"
                      )}
                    >
                      {sensor.name} ({sensor.vendor})
                    </span>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
      {selectedSensor && (
        <Listbox
          value={selectedResolution}
          by={(a, b) => `${a?.width}x${a?.height}-${a?.fps?.join("-")}` === `${b?.width}x${b?.height}-${b?.fps?.join("-")}`}
          onChange={onSelectResolution}
        >
          <div className="relative mt-1">
            <Listbox.Button className="relative w-full cursor-default rounded-md bg-slate-800/60 py-2 pl-3 pr-10 text-left text-sm text-slate-100 shadow-md focus:outline-none focus-visible:border-brand-500 focus-visible:ring-2 focus-visible:ring-brand-400">
              <span className="block truncate">
                {selectedResolution
                  ? `${selectedResolution.label ? `${selectedResolution.label} ` : ""}${selectedResolution.width}x${selectedResolution.height} @ ${selectedResolution.fps.join("/")} FPS`
                  : t.sensorPanel.resolutionPlaceholder}
              </span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-slate-800 py-1 text-sm shadow-lg ring-1 ring-black/5 focus:outline-none">
                {selectedSensor.depthResolutions.map((resolution) => (
                  <Listbox.Option
                    key={`${resolution.width}x${resolution.height}-${resolution.fps.join("-")}`}
                    value={resolution}
                    className={({ active }) =>
                      clsx(
                        "relative cursor-default select-none py-2 pl-3 pr-9",
                        active ? "bg-brand-500/20 text-brand-200" : "text-slate-200"
                      )
                    }
                  >
                    {({ selected }) => (
                      <span
                        className={clsx(
                          "block truncate",
                          selected ? "font-medium" : "font-normal"
                        )}
                      >
                        {(resolution.label ? `${resolution.label} ` : "") + `${resolution.width}x${resolution.height}`} @ {resolution.fps.join("/")} FPS
                      </span>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
      )}
    </div>
  );
}
