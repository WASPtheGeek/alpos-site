"use client";

import { getT } from "@/utils/localizationUtils";
import {
  NavItem,
  NavLink,
  NavLinks,
  useDeviceDetection,
} from "@WASPtheGeek/base-components";
import React from "react";
import { LangSwitch, LogoLink, UserLink } from ".";
import { useLocalization } from "../../contexts/localization";
import { Restricted } from "../permission";
import { Access } from "@/contexts/permission";
import { AppScope } from "@/constants/appAbilities";

export default function AppNavLinks() {
  const { t } = useLocalization();
  const device = useDeviceDetection();

  const isMobile = React.useMemo(() => device === "Mobile", [device]);

  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <NavLinks isMobile={isMobile}>
      {/* logo */}
      <NavLink keepVisible noStyle href={"/"} className="logo-link px-2">
        <LogoLink />
      </NavLink>

      {/* user links */}
      <NavLink href={"/solutions"}>{getT("solutions_tab", t)}</NavLink>
      <NavLink href={"/products"}>{getT("products_tab", t)}</NavLink>
      <NavLink href={"/services"}>{getT("services_tab", t)}</NavLink>
      <NavLink href={"/contacts"}>{getT("contacts_tab", t)}</NavLink>

      {/* admin links */}
      <Restricted access={Access.all} scope={AppScope.adminC as string}>
        <NavLink href={"/admin"}>{getT("admin_tab", t)}</NavLink>
      </Restricted>

      {/* lang */}
      <NavItem keepVisible end>
        <LangSwitch />
      </NavItem>

      {/* auth */}
      <NavItem keepVisible className="py-4">
        <UserLink />
      </NavItem>
    </NavLinks>
  );
}
