"use client";

import React from "react";
import { useLocalization } from "../../contexts/localization";

export default function LangSwitch() {
  const { setLocale } = useLocalization();

  if (!setLocale) return <div>Loading...</div>;

  // todo: add dropdown
  return (
    <div className="flex gap-2">
      <button onClick={() => setLocale("lv")}>lv</button>
      <button onClick={() => setLocale("en")}>en</button>
      <button onClick={() => setLocale("ru")}>ru</button>
      <br />
    </div>
  );
}
