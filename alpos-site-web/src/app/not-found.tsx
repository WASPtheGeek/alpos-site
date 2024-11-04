"use client";

import { useLocalization } from "@/contexts/localization";
import { getT } from "@/utils/localizationUtils";
import React from "react";
import { PageError } from "../components/error";

export default function Custom404() {
  const { t } = useLocalization();

  return <PageError title={getT("page_not_found", t)} />;
}
