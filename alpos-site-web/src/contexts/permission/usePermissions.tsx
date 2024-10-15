import React from "react";
import { PermissionContext } from ".";

export const usePermissions = () => {
  const ctx = React.useContext(PermissionContext);

  if (!ctx) {
    throw new Error("Permission context is not provided");
  }

  return ctx;
};
