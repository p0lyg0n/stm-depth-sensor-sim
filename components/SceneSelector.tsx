"use client";

import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { clsx } from "clsx";
import type { SceneSpec } from "@/lib/types";
import { useTranslation } from "@/hooks/useTranslation";

interface SceneSelectorProps {
  scenes: SceneSpec[];
  selectedScene?: SceneSpec;
  onSelectScene: (sceneId: string) => void;
}

export function SceneSelector({ scenes, selectedScene, onSelectScene }: SceneSelectorProps) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-4 rounded-lg border border-slate-800 bg-slate-900/50 p-4 shadow-lg">
      <div>
        <h2 className="text-lg font-semibold text-slate-50">{t.scenePanel.title}</h2>
        <p className="text-sm text-slate-400">{t.scenePanel.description}</p>
      </div>
      <Listbox value={selectedScene?.id} onChange={onSelectScene}>
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full cursor-default rounded-md bg-slate-800/60 py-2 pl-3 pr-10 text-left text-sm text-slate-100 shadow-md focus:outline-none focus-visible:border-brand-500 focus-visible:ring-2 focus-visible:ring-brand-400">
            <span className="block truncate">
              {selectedScene ? selectedScene.name : t.scenePanel.title}
            </span>
          </Listbox.Button>
          <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-slate-800 py-1 text-sm shadow-lg ring-1 ring-black/5 focus:outline-none">
              {scenes.map((scene) => (
                <Listbox.Option
                  key={scene.id}
                  value={scene.id}
                  className={({ active }) =>
                    clsx(
                      "relative cursor-default select-none py-2 pl-3 pr-9",
                      active ? "bg-brand-500/20 text-brand-200" : "text-slate-200"
                    )
                  }
                >
                  {({ selected }) => (
                    <span className={clsx("block truncate", selected ? "font-medium" : "font-normal")}>{scene.name}</span>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
      {selectedScene && (
        <div className="space-y-2 rounded-md bg-slate-950/40 p-3 text-sm text-slate-300">
          {selectedScene.description && <p className="text-slate-200">{selectedScene.description}</p>}
          <ul className="space-y-1">
            <li className="text-slate-200">
              {t.scenePanel.sizeLabel(selectedScene.dimensions_m)}
            </li>
            {selectedScene.defaultCameraPose && (
              <li className="text-slate-200">
                {t.scenePanel.cameraPositionLabel(selectedScene.defaultCameraPose.position_m)}
              </li>
            )}
            {selectedScene.constraints?.coverageGoal && (
              <li className="text-slate-200">
                {t.scenePanel.goalLabel(selectedScene.constraints.coverageGoal)}
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
