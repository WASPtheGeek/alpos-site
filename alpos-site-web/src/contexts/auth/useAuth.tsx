import React from "react";
import AuthContext from "./AuthContext";

export const useAuth = () => {
  const ctx = React.useContext(AuthContext);

  if (!ctx) {
    throw new Error("Auth context is not provided");
  }

  return ctx;
};
