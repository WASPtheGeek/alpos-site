"use client";

import React from "react";
import {
  AuthContextProvider,
  LocalizationContextProvider,
  PermissionContextProvider,
} from "@/contexts/index";
import { appAbilities } from "@/constants/appAbilities";

interface IProps {
  children?: React.ReactNode;
}

export default function Providers(props: IProps) {
  const { children } = props;

  return (
    <LocalizationContextProvider>
      <AuthContextProvider>
        <PermissionContextProvider abilities={appAbilities}>
          {children}
        </PermissionContextProvider>
      </AuthContextProvider>
    </LocalizationContextProvider>
  );
}
