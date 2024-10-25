"use client";

import { TextInput } from "@WASPtheGeek/base-components";
import React from "react";
import { Prisma } from "../../../../api/generated/client";
import { api } from "@/api/axios";
import { useLocalization } from "@/contexts/localization";
import { getT } from "@/utils/localizationUtils";
import { Form } from "@/components/form";

interface IProps {
  id?: string;
}

export default function CategoryForm(props: IProps) {
  const { id } = props;
  const [category, setCategory] =
    React.useState<Prisma.CategoryCreateInput | null>(null);
  const { t } = useLocalization();

  React.useEffect(() => {
    if (!id) return;

    api
      .get(`/categories/full/${id}`)
      .then((res) => res.data)
      .then(setCategory);
  }, [id]);

  return (
    <Form>
      <TextInput value={category?.name_en} label={getT("cat_name_en", t)} />
      <TextInput value={category?.name_lv} label={getT("cat_name_lv", t)} />
      <TextInput value={category?.name_ru} label={getT("cat_name_ru", t)} />

      <TextInput
        value={category?.description_en}
        label={getT("cat_description_en", t)}
      />
      <TextInput
        value={category?.description_lv}
        label={getT("cat_description_lv", t)}
      />
      <TextInput
        value={category?.description_ru}
        label={getT("cat_description_ru", t)}
      />
    </Form>
  );
}
