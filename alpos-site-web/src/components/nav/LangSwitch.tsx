"use client";

import { AppLocale, useLocalization } from "../../contexts/localization";
import { AppSelect } from "../select";
import { SelectItemType } from "../select/AppSelect";

export default function LangSwitch() {
  const { locale, setLocale } = useLocalization();

  if (!setLocale) return;

  const options: SelectItemType[] = [
    { value: "lv", label: "Latviešu" },
    { value: "en", label: "English" },
    { value: "ru", label: "Русский" },
  ];

  const handleClick = (loc: string) => {
    setLocale(loc as AppLocale);
  };

  return (
    <AppSelect value={locale} options={options} onValueChange={handleClick} />
  );
}
