import { ProductForm } from "@/components/product";
import { PageTitle } from "@/components/page";
import { Restricted } from "@/components/permission";
import { AppScope } from "@/constants/appAbilities";
import { Access } from "@/contexts/permission";
import React from "react";

export default function Page() {
  return (
    <Restricted access={Access.all} scope={AppScope.adminC}>
      <PageTitle k="products_page_new" backLink="/admin/products" />
      <ProductForm />
    </Restricted>
  );
}
