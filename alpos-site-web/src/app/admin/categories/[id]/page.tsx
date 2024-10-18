"use client";
import { Restricted } from "@/components/permission";
import { AppScope } from "@/constants/appAbilities";
import { Access } from "@/contexts/permission";
import { api } from "@/api/axios";
import { Prisma } from "@/api/generated/client";
import React from "react";

export default function Page({ params }: { params: { id: string } }) {
  const [data, setData] = React.useState<Prisma.CategoryCreateInput | null>(
    null
  );

  React.useEffect(() => {
    if (data) return;

    api
      .get(`/categories/full/${params.id}`)
      .then((res) => res.data)
      .then(setData);
  }, [data, params.id]);

  return (
    <Restricted access={Access.all} scope={AppScope.adminC}>
      {/* todo */}
      Category: {params.id} {data?.name_en}
    </Restricted>
  );
}
