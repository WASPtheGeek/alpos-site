"use client";

import { useLocalization } from "@/contexts/localization";
import { getT } from "@/utils/localizationUtils";
import { Nav, NavLinks, NavLinkVertical } from "@WASPtheGeek/base-components";

export default function VerticalAdminNav() {
  const { t } = useLocalization();

  const links: { url: string; text: string }[] = [
    { url: "/admin/categories", text: "categories_page" },
    { url: "/admin/products", text: "products_page" },
    { url: "/admin/posts", text: "posts_page" },
    { url: "/admin/texts", text: "texts_page" },
    { url: "/admin/contacts", text: "contacts_page" },
  ];

  return (
    <Nav type="vertical" className="w-1/5 border-t-2">
      <NavLinks type="vertical">
        {links.map((l) => (
          <NavLinkVertical key={l.url} href={l.url}>
            {getT(l.text, t)}
          </NavLinkVertical>
        ))}
      </NavLinks>
    </Nav>
  );
}
