"use client";

import { api } from "@/api/axios";
import { Restricted } from "@/components/permission";
import { AppScope } from "@/constants/appAbilities";
import { Access } from "@/contexts/permission";
import { Grid } from "@WASPtheGeek/base-components";
import { Prisma } from "@/api/generated/client";
import { columnConfig } from "./config";
import React from "react";

export default function AdminCatTable() {
  const [data, setData] = React.useState<Prisma.CategoryCreateInput[] | null>(
    null
  );

  React.useEffect(() => {
    if (data) return;

    api
      .get("/categories/list/full")
      .then((res) => res.data)
      .then(setData);
  }, [data]);

  return (
    <Restricted access={Access.all} scope={AppScope.adminC}>
      <Grid columnConfigs={columnConfig} data={data} />
    </Restricted>
  );
}
