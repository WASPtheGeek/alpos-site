"use client";

import { Restricted } from "@/components/permission";
import { AppScope } from "@/constants/appAbilities";
import { Access } from "@/contexts/permission";
import { api } from "@/api/axios";
import { Prisma } from "@/api/generated/client";
import React from "react";
import { PageTitle } from "@/components/page";
import CategoryForm from "./CategoryForm";

export default function Page({ params }: { params: { id: string } }) {
  const [data, setData] = React.useState<Prisma.CategoryCreateInput | null>(
    null
  );
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    if (data) return;

    api
      .get(`/categories/full/${params.id}`)
      .then((res) => res.data)
      .then(setData);
  }, [data, params.id]);

  if (!mounted) return null;

  return (
    <Restricted access={Access.all} scope={AppScope.adminC}>
      <PageTitle k="categories_page" backLink="/admin/categories" />
      {/* todo */}
      <CategoryForm id={params.id} />
    </Restricted>
  );
}
