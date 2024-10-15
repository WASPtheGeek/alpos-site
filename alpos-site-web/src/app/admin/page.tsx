"use client";

import { PageTitle } from "@/components/page";
import { Restricted } from "@/components/permission";
import { AppScope } from "@/constants/appAbilities";
import { useLocalization } from "@/contexts/localization";
import { Access } from "@/contexts/permission";
import { getT } from "@/utils/localizationUtils";
import Link from "next/link";
import React from "react";

export default function Dashboard() {
  const { t } = useLocalization();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const links: { url: string; text: string }[] = [
    { url: "/admin/categories", text: "categories_page" },
    { url: "/admin/products", text: "products_page" },
    { url: "/admin/posts", text: "posts_page" },
    { url: "/admin/texts", text: "texts_page" },
    { url: "/admin/contacts", text: "contacts_page" },
  ];

  return (
    <Restricted
      showMessage
      access={Access.all}
      scope={AppScope.adminC as string}
    >
      <PageTitle k="admin_page" />
      <div className="flex flex-col gap-2">
        {links.map((l) => (
          <div className="w-fit" key={l.url}>
            <Link className="underline" href={l.url}>
              {getT(l.text, t)}
            </Link>
          </div>
        ))}
      </div>
    </Restricted>
  );
}
