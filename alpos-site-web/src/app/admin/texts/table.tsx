"use client";

import { api } from "@/api/axios";
import { Prisma } from "@/api/generated/client";
import { Restricted } from "@/components/permission";
import { AppGrid, TableAction } from "@/components/table";
import { AppScope } from "@/constants/appAbilities";
import { useLocalization } from "@/contexts/localization";
import { Access } from "@/contexts/permission";
import { getT } from "@/utils/localizationUtils";
import React from "react";
import { columnConfig } from "./config";

export default function AdminTextsTable() {
  const [data, setData] = React.useState<
    Prisma.TextToDisplayCreateInput[] | null
  >(null);
  const { t } = useLocalization();

  React.useEffect(() => {
    if (data) return;

    api
      .get("/texts")
      .then((res) => res.data)
      .then(setData);
  }, [data]);

  const getTitle = (key: string): string => getT(key, t);

  return (
    <Restricted access={Access.all} scope={AppScope.adminC}>
      <AppGrid
        columnConfigs={columnConfig(getTitle)}
        data={data}
        actionsTemplate={(d: any) => (
          <TableAction link={`/admin/texts/item/${d.id}`} />
        )}
      />
    </Restricted>
  );
}