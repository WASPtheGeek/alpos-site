"use client";

import { api } from "@/api/axios";
import { Prisma } from "@/api/generated/client";
import { PageTitle } from "@/components/page";
import { Restricted } from "@/components/permission";
import { AppScope } from "@/constants/appAbilities";
import { Access } from "@/contexts/permission";
import React from "react";

export default function Page({ params }: { params: { id: string } }) {
  const [data, setData] = React.useState<Prisma.PostCreateInput | null>(null);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    if (data) return;

    api
      .get(`/posts/full/${params.id}`)
      .then((res) => res.data)
      .then(setData);
  }, [data, params.id]);

  if (!mounted) return null;

  return (
    <Restricted access={Access.all} scope={AppScope.adminC}>
      <PageTitle k="post_page" backLink="/admin/posts" />
      {/* todo */}
      {/* <CategoryForm id={params.id} /> */}
    </Restricted>
  );
}
