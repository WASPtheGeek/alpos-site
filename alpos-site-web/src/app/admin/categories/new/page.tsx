import { CategoryForm } from "@/components/category";
import { PageTitle } from "@/components/page";
import { Restricted } from "@/components/permission";
import { AppScope } from "@/constants/appAbilities";
import { Access } from "@/contexts/permission";
import React from "react";

export default function Page() {
  return (
    <Restricted access={Access.all} scope={AppScope.adminC}>
      <PageTitle k="categories_page_new" backLink="/admin/categories" />
      <CategoryForm />
    </Restricted>
  );
}
