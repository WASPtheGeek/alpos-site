import React from "react";
import LocalizationContext from "./LocalizationContext";

export const useLocalization = () => {
  const ctx = React.useContext(LocalizationContext);

  if (!ctx) {
    throw new Error("Localization context is not provided");
  }

  return ctx;
};
