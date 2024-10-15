"use client";

import React from "react";
import { api } from "../../api";
import { useLocalStorage } from "@WASPtheGeek/base-components";
import { AppConstants } from "../../constants";
import { Prisma } from "../../api/generated/client";
import { AxiosError, HttpStatusCode } from "axios";
import { AuthContextType } from "./types";
import { AuthContext } from ".";

interface IProps {
  children?: React.ReactNode;
}

function AuthContextProvider(props: Readonly<IProps>) {
  const { children } = props;

  const [user, setUser] = useLocalStorage(AppConstants.user_storage_key);
  const [ctxUser, setCtxUser] = React.useState<
    Prisma.UserCreateInput | undefined
  >(user);

  const isAuthorized = React.useMemo(() => {
    if (ctxUser && typeof ctxUser === "object") return true;

    return false;
  }, [ctxUser]);

  const updateUser = React.useCallback(
    (data?: Prisma.UserCreateInput) => {
      setUser(data);
      setCtxUser(data);
    },
    [setUser]
  );

  React.useEffect(() => {
    if (ctxUser) return;

    // fetch user
    api
      .get("/users/current")
      .then((data) => data.data)
      .then(updateUser)
      .catch((error: AxiosError) => {
        if (error.status === HttpStatusCode.Forbidden) {
        }
      });
  }, [ctxUser, updateUser]);

  const ctxValues: AuthContextType = React.useMemo(() => {
    return {
      isAuthorized,
      user: ctxUser,
      setUser: updateUser,
    };
  }, [isAuthorized, ctxUser, updateUser]);

  return (
    <AuthContext.Provider value={ctxValues}>{children}</AuthContext.Provider>
  );
}

export default AuthContextProvider;
