import { useAppStore } from "@/hooks/useAppStore";
import { translations, type SupportedLanguage } from "@/lib/i18n";

export function useTranslation() {
  const language = useAppStore((state) => state.language);
  const t = translations[language];
  return { t, language };
}

export type { SupportedLanguage } from "@/lib/i18n";
