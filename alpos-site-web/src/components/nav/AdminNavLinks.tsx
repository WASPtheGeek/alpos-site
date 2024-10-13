"use client";

// import { NavLink } from "@WASPtheGeek/base-components";
// import { api } from "../../api";
// import { useAuth } from "../../context/auth";
import React from "react";

export default function AdminNavLinks() {
  // const { isAuthorized, user, setUser } = useAuth();

  // const [mounted, setMounted] = React.useState(false);

  // React.useEffect(() => {
  //   setMounted(true);
  // }, []);

  // const logout = React.useCallback(() => {
  //   api.delete("/auth/logout").finally(() => {
  //     if (setUser) setUser(undefined);
  //   });
  // }, [setUser]);

  // const content = React.useMemo(() => {
  //   if (!isAuthorized) return <NavLink href={"/login"}>Login</NavLink>;

  //   return (
  //     <>
  //       {user && (
  //         <div className="hidden sm:block p-2">
  //           {user.email}
  //           <br />
  //           {user.role}
  //         </div>
  //       )}
  //       <i className="m-auto fas fa-sign-out p-2" onClick={logout} />
  //     </>
  //   );
  // }, [isAuthorized, user, logout]);

  // if (!mounted) return null;

  return (
    <div className="h-full ml-auto text-center my-auto flex gap-10">
      {/* {content} */}
    </div>
  );
}
