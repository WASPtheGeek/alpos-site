"use client";

import React from "react";
import { LocalizationContextProvider } from "../../contexts/localization";

interface IProps {
  children?: React.ReactNode;
}

export default function Providers(props: IProps) {
  const { children } = props;

  return (
    <LocalizationContextProvider>
      {/* <AuthContextProvider>
        <PermissionContextProvider abilities={appAbilities}> */}
      {children}
      {/* </PermissionContextProvider>
      </AuthContextProvider> */}
    </LocalizationContextProvider>
  );
}
