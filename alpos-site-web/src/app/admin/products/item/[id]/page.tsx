"use client";

import { Restricted } from "@/components/permission";
import { AppScope } from "@/constants/appAbilities";
import { Access } from "@/contexts/permission";
import { api } from "@/api/axios";
import { Prisma } from "@/api/generated/client";
import React from "react";
import { PageTitle } from "@/components/page";
import { CategoryForm } from "@/components/category";
import { ProductForm } from "@/components/product";

export default function Page({ params }: { params: { id: string } }) {
  const [data, setData] = React.useState<Prisma.ProductCreateInput | null>(
    null
  );
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    if (data) return;

    api
      .get(`/products/full/${params.id}`)
      .then((res) => res.data)
      .then(setData);
  }, [data, params.id]);

  if (!mounted) return null;

  return (
    <Restricted access={Access.all} scope={AppScope.adminC}>
      <PageTitle k="product_page" backLink="/admin/products" />
      <ProductForm id={params.id} />
    </Restricted>
  );
}
