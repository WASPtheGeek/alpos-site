"use client";

import { getT } from "@/utils/localizationUtils";
import {
  NavItem,
  NavLink,
  NavLinks,
  useDeviceDetection,
} from "@WASPtheGeek/base-components";
import React from "react";
import { AdminNavLinks, LangSwitch, LogoLink } from ".";
import { useLocalization } from "../../contexts/localization";

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
      <NavLink keepVisible noStyle href={"/"} className="logo-link px-2">
        <LogoLink />
      </NavLink>
      <NavLink href={"/solutions"}>{getT("solutions_tab", t)}</NavLink>
      <NavLink href={"/products"}>{getT("products_tab", t)}</NavLink>
      <NavLink href={"/services"}>{getT("services_tab", t)}</NavLink>
      <NavLink href={"/contacts"}>{getT("contacts_tab", t)}</NavLink>
      <AdminNavLinks />
      <NavItem keepVisible end>
        <LangSwitch />
      </NavItem>
    </NavLinks>
  );
}
