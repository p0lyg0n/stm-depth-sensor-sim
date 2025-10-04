"use client";

import { useAppStore } from "@/hooks/useAppStore";
import type { SupportedLanguage } from "@/lib/i18n";

const supportedLanguages: SupportedLanguage[] = ["ja", "en", "ko"];
const labels: Record<SupportedLanguage, string> = {
  ja: "日本語",
  en: "English",
  ko: "한국어"
};

export function LanguageSwitcher() {
  const setLanguage = useAppStore((state) => state.setLanguage);
  const language = useAppStore((state) => state.language);

  return (
    <div className="flex flex-col gap-2 rounded-lg border border-slate-800 bg-slate-900/60 p-3 text-sm shadow-lg md:p-4">
      <h2 className="text-base font-semibold text-slate-50 md:text-lg">言語</h2>
      <div className="flex gap-2">
        {supportedLanguages.map((value) => (
          <button
            key={value}
            type="button"
            onClick={() => setLanguage(value)}
            className={`flex-1 rounded-md border px-2 py-2 transition-colors ${
              language === value
                ? "border-brand-400 bg-brand-500/20 text-brand-100"
                : "border-slate-700 bg-slate-800/60 text-slate-200 hover:bg-slate-800"
            }`}
          >
            {labels[value]}
          </button>
        ))}
      </div>
    </div>
  );
}
