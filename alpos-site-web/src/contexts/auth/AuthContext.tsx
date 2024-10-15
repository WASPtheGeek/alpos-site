"use client";

import React from "react";
import { AuthContextType } from ".";

const AuthContext = React.createContext<AuthContextType>({
  isAuthorized: false,
});

export default AuthContext;
