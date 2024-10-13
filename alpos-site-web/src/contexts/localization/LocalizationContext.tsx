"use client";

import React from "react";
import { LocalizationContextType } from ".";

const LocalizationContext = React.createContext<LocalizationContextType>({
  locale: "lv",
  t: [],
});

export default LocalizationContext;
