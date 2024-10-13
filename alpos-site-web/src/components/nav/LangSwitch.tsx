"use client";

import { cn } from "@WASPtheGeek/base-components";
import { AppLocale, useLocalization } from "../../contexts/localization";

export default function LangSwitch() {
  const { locale, setLocale } = useLocalization();

  if (!setLocale) return <div>Loading...</div>;

  const clsn = (loc: AppLocale) =>
    cn({
      hidden: loc === locale,
    });

  const handleClick = (loc: AppLocale) => {
    setLocale(loc);
  };

  // todo: add dropdown
  return (
    <div className="flex gap-2">
      <button className={clsn("lv")} onClick={() => handleClick("lv")}>
        lv
      </button>
      <button className={clsn("en")} onClick={() => handleClick("en")}>
        en
      </button>
      <button className={clsn("ru")} onClick={() => handleClick("ru")}>
        ru
      </button>
      <br />
    </div>
  );
}
