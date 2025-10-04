import { Suspense } from "react";
import { loadScenes, loadSensors } from "@/lib/loadData";
import { DashboardShell } from "@/components/DashboardShell";

export default async function Page() {
  const sensors = loadSensors();
  const scenes = loadScenes();

  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col gap-6 px-6 py-10">
      <Suspense fallback={<div className="text-slate-400">読み込み中...</div>}>
        <DashboardShell sensors={sensors} scenes={scenes} />
      </Suspense>
    </main>
  );
}
