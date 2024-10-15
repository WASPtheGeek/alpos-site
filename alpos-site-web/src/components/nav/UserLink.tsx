"use client";

import Link from "next/link";
import React from "react";
import { api } from "../../api";
import { useAuth } from "../../contexts";

export default function UserLink() {
  const { isAuthorized, user, setUser } = useAuth();

  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const logout = React.useCallback(() => {
    api.delete("/auth/logout").finally(() => {
      if (setUser) setUser(undefined);
    });
  }, [setUser]);

  const content = React.useMemo(() => {
    if (!isAuthorized)
      return (
        <Link href={"/login"}>
          <i className="hover:cursor-pointer m-auto fas fa-user p-2" />
        </Link>
      );

    return (
      <>
        {user && <div className="hidden lg:block">{user.email}</div>}
        <i
          className="hover:cursor-pointer m-auto fas fa-sign-out p-2"
          onClick={logout}
        />
      </>
    );
  }, [isAuthorized, user, logout]);

  if (!mounted) return null;

  return <div className="flex gap-4 items-center">{content}</div>;
}
