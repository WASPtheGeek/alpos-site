"use client";

import React from "react";
import { PermissionContextType } from "./types";

const PermissionContext = React.createContext<PermissionContextType>({
  appAbilities: [],
  hasPermission: () => false,
});

export default PermissionContext;
