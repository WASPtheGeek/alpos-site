"use client";

import React from "react";
import { Access, Scope, usePermissions } from "../../contexts";

interface IProps {
  children?: React.ReactNode;
  access: Access;
  scope: Scope;
  message?: string;
  showMessage?: boolean;
}

// todo: move to base-componnets

export default function Restricted(props: IProps) {
  const {
    access,
    scope,
    children,
    message = "Access to this resource is restricted",
    showMessage,
  } = props;

  const { hasPermission } = usePermissions();

  const can = hasPermission(access, scope);

  if (can) {
    return children;
  }

  if (showMessage) return message;

  return;
}
