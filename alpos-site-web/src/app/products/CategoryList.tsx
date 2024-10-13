"use client";

import { api } from "@/api/axios";
import React from "react";
import { CategoryViewModel } from "@/api/generated/models";

export default function CategoryList() {
  const [data, setData] = React.useState<CategoryViewModel[] | null>(null);

  React.useEffect(() => {
    if (data) return;

    api
      .get("/categories")
      .then((res) => res.data)
      .then(setData);
  }, [data]);

  return (
    <div>
      {data?.map((c) => (
        <div key={c.id}>
          <h4>{c.name}</h4>
          <p>{c.description}</p>
        </div>
      ))}
    </div>
  );
}
