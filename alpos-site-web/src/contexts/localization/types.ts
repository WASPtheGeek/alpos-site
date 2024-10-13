export type AppLocale = "lv" | "en" | "ru";
export type TranslationRecord = { [key: string]: string };
export type LocalizationContextType = {
  locale?: AppLocale;
  t?: TranslationRecord[];
  setLocale?: (locale?: AppLocale) => void;
};
