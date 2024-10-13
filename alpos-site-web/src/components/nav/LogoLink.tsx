"use client";

import { getT } from "@/utils/localizationUtils";
import Image from "next/image";
import logo from "../../../public/initial_logo.png";
import { useLocalization } from "../../contexts/localization";

export default function LogoLink() {
  const { t } = useLocalization();

  return (
    <Image
      className="logo-link"
      alt={getT("/home_tab", t)}
      src={logo}
      priority
    />
  );
}
