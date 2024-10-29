"use client";

import { PageTitle } from "@/components/page";
import { Restricted } from "@/components/permission";
import { AppScope } from "@/constants/appAbilities";
import { Access } from "@/contexts/permission";
import AdminCatTable from "./table";
import React from "react";
import { Button } from "@WASPtheGeek/base-components";
import { useRouter } from "next/navigation";
import { getT } from "@/utils/localizationUtils";
import { useLocalization } from "@/contexts/localization";

export default function AdminCategories() {
  const router = useRouter();
  const { t } = useLocalization();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Restricted access={Access.all} scope={AppScope.adminC}>
      <PageTitle
        k="categories_page"
        actions={
          <Button
            label={getT("create", t)}
            onClick={() => router.replace("/admin/categories/new")}
          />
        }
      />
      <AdminCatTable />
    </Restricted>
  );
}
