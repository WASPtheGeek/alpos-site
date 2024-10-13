"use client";

import React from "react";
import { AppLocale, useLocalization } from "../../contexts/localization";
import { cn } from "@WASPtheGeek/base-components";

export default function LangSwitch() {
  const { locale, setLocale } = useLocalization();

  if (!setLocale) return <div>Loading...</div>;

  const clsn = (loc: AppLocale) =>
    cn({
      hidden: loc === locale,
    });

  // todo: add dropdown
  return (
    <div className="flex gap-2">
      <button className={clsn("lv")} onClick={() => setLocale("lv")}>
        lv
      </button>
      <button className={clsn("en")} onClick={() => setLocale("en")}>
        en
      </button>
      <button className={clsn("ru")} onClick={() => setLocale("ru")}>
        ru
      </button>
      <br />
    </div>
  );
}
