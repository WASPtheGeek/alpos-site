import { Icon } from "@WASPtheGeek/base-components";
import Link from "next/link";
import React from "react";

export default function TableAction({ link }: { link?: string }) {
  if (!link) return;

  return (
    <div className="flex justify-center">
      <Link href={link}>
        <Icon className="fas fa-up-right-from-square text-amber-600" />
      </Link>
    </div>
  );
}
