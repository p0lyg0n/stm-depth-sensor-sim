"use client";

import { useAppStore } from "@/hooks/useAppStore";
import { translations, type SupportedLanguage } from "@/lib/i18n";

const supportedLanguages: SupportedLanguage[] = ["ja", "en", "ko"];

export function LanguageSwitcher() {
  const setLanguage = useAppStore((state) => state.setLanguage);
  const language = useAppStore((state) => state.language);

  return (
    <div className="flex flex-col gap-2 rounded-lg border border-slate-800 bg-slate-900/60 p-4 shadow-lg">
      <div>
        <h2 className="text-lg font-semibold text-slate-50">{translations.ja.language.label}</h2>
      </div>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setLanguage("ja")}
          className={`flex-1 rounded-md border px-3 py-2 text-sm transition-colors ${
            language === "ja"
              ? "border-brand-400 bg-brand-500/20 text-brand-100"
              : "border-slate-700 bg-slate-800/60 text-slate-200 hover:bg-slate-800"
          }`}
        >
          日本語
        </button>
        <button
          type="button"
          onClick={() => setLanguage("en")}
          className={`flex-1 rounded-md border px-3 py-2 text-sm transition-colors ${
            language === "en"
              ? "border-brand-400 bg-brand-500/20 text-brand-100"
              : "border-slate-700 bg-slate-800/60 text-slate-200 hover:bg-slate-800"
          }`}
        >
          English
        </button>
        <button
          type="button"
          onClick={() => setLanguage("ko")}
          className={`flex-1 rounded-md border px-3 py-2 text-sm transition-colors ${
            language === "ko"
              ? "border-brand-400 bg-brand-500/20 text-brand-100"
              : "border-slate-700 bg-slate-800/60 text-slate-200 hover:bg-slate-800"
          }`}
        >
          한국어
        </button>
      </div>
    </div>
  );
}
