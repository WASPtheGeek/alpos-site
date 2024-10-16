"use client";

import { api } from "@/api/axios";
import { useLocalStorage } from "@WASPtheGeek/base-components";
import React from "react";
import { LocalizationContext } from ".";
import { AppConstants } from "../../constants/appConstants";
import { AppLocale, LocalizationContextType, TranslationRecord } from "./types";

interface IProps {
  children?: React.ReactNode;
}

function LocalizationContextProvider(props: Readonly<IProps>) {
  const { children } = props;

  const [locale, setLocale] = useLocalStorage(AppConstants.app_locale_key);
  const [ctxLocale, setCtxLocale] = React.useState<AppLocale | undefined>(
    locale
  );

  const [t, setT] = useLocalStorage(AppConstants.translations_key);
  const [ctxT, setCtxT] = React.useState<TranslationRecord[]>(t ?? []);

  const updateTranslations = React.useCallback(
    (data?: TranslationRecord[]) => {
      setT(data);
      setCtxT(data ?? []);
    },
    [setT]
  );

  const refreshTranslations = React.useCallback(() => {
    api
      .get("/localizations")
      .then((res) => res.data)
      .then(updateTranslations)
      .catch((err) => console.error(err)); // todo: handle error
  }, [updateTranslations]);

  React.useEffect(() => {
    // load translations on the first load
    refreshTranslations();
  }, []);

  const updateLocale = React.useCallback(
    (data?: AppLocale) => {
      if ((data === ctxLocale) === locale) return;

      window.location.reload();

      setLocale(data);
      setCtxLocale(data);

      refreshTranslations();
    },
    [setLocale, ctxLocale, locale, refreshTranslations]
  );

  const ctxValues: LocalizationContextType = React.useMemo(() => {
    return {
      t: ctxT,
      locale: ctxLocale,
      setLocale: updateLocale,
    };
  }, [ctxT, ctxLocale, updateLocale]);

  return (
    <LocalizationContext.Provider value={ctxValues}>
      {children}
    </LocalizationContext.Provider>
  );
}

export default LocalizationContextProvider;
