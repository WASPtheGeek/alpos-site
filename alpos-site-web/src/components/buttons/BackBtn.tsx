import { cn, Icon } from "@WASPtheGeek/base-components";
import React from "react";
import Link from "next/link";
import { useLocalization } from "@/contexts/localization";
import { getT } from "@/utils/localizationUtils";

export default function BackBtn({
  link,
  className,
  localizationKey,
}: {
  link: string;
  className?: string;
  localizationKey?: string;
}) {
  const clsn = cn("text-amber-500", "flex gap-2 items-center", className);
  const { t } = useLocalization();

  return (
    <Link href={link} className={clsn}>
      <Icon className="fas fa-arrow-left" />
      <p>{getT(localizationKey ?? "back", t)}</p>
    </Link>
  );
}
