import { useTranslation } from "react-i18next";

const LANGS = [
  { code: "en", label: "EN", flag: "🇬🇧" },
  { code: "fr", label: "FR", flag: "🇫🇷" },
  { code: "rw", label: "RW", flag: "🇷🇼" },
];

export function LanguageSwitcher() {
  const { i18n } = useTranslation();

  return (
    <div className="flex items-center gap-1 rounded-xl border border-border/40 bg-card/30 p-1 backdrop-blur">
      {LANGS.map((lang) => (
        <button
          key={lang.code}
          onClick={() => i18n.changeLanguage(lang.code)}
          title={lang.code.toUpperCase()}
          className={`flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-bold uppercase tracking-widest transition-all
            ${i18n.language === lang.code
              ? "bg-primary text-primary-foreground shadow"
              : "text-muted-foreground hover:text-foreground"
            }`}
        >
          <span>{lang.flag}</span>
          <span>{lang.label}</span>
        </button>
      ))}
    </div>
  );
}
