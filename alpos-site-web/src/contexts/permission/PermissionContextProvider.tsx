"use client";

import React from "react";
import { useAuth } from "../auth";
import { PermissionContext } from ".";
import { Ability, Access, PermissionContextType, Scope } from "./types";

interface IProps {
  children?: React.ReactNode;
  abilities: Ability[];
}

function PermissionContextProvider(props: Readonly<IProps>) {
  const { children, abilities } = props;
  const { user } = useAuth();

  const hasPermission = React.useCallback(
    (access: Access, scope: Scope) => {
      if (!abilities || abilities.length === 0) return false;

      const ability = abilities.find(
        (a) => a.scope === scope && a.role === (user?.role ?? "USER")
      );

      if (!ability) return false;

      return access === (access & ability.access);
    },
    [abilities, user]
  );

  const ctxValues: PermissionContextType = React.useMemo(() => {
    return {
      appAbilities: abilities,
      hasPermission,
    };
  }, [abilities, hasPermission]);

  return (
    <PermissionContext.Provider value={ctxValues}>
      {children}
    </PermissionContext.Provider>
  );
}

export default PermissionContextProvider;
