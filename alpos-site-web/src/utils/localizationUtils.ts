import { TranslationRecord } from "../contexts/localization";

export function getT(key: string, translations?: TranslationRecord[]): string {
  if (!translations) return "Translations not loaded";

  const value = Object.entries(translations).find((x) => x[0] === key)?.[1];

  if (!value) return `Key not found: ${key}`;

  return value as any as string;
}
