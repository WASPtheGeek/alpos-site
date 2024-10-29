"use client";

import { api } from "@/api/axios";
import { Spinner } from "@WASPtheGeek/base-components";
import { Formik, FormikHelpers } from "formik";
import React from "react";
import { Prisma } from "../../api/generated/client";
import FormContent from "./FormContent";
import { handleAxiosError } from "@/utils/errorUtils";
import { useRouter } from "next/navigation";

interface IProps {
  id?: string;
}

export default function CategoryForm(props: IProps) {
  const { id } = props;
  const [category, setCategory] = React.useState<Prisma.CategoryCreateInput>(
    {}
  );
  const [loading, setLoading] = React.useState<boolean>(true);
  const [submitting, setSubmitting] = React.useState<boolean>(false);
  const [refresh, setRefresh] = React.useState<boolean>(false);
  const router = useRouter();

  React.useEffect(() => {
    if (!loading) return;
    if (refresh) {
      setRefresh(false);
      return;
    }

    if (!id) {
      setLoading(false);

      return;
    }

    api
      .get(`/categories/full/${id}`)
      .then((res) => res.data)
      .then(setCategory)
      .finally(() => setLoading(false));
  }, [id, loading, refresh]);

  const handleSave = (values: Prisma.CategoryCreateInput) => {
    api
      .post("/categories", values)
      .then((res) => res.data)
      .then((data) => router.replace(`/admin/categories/item/${data.id}`))
      .catch((err) => {
        handleAxiosError(err);
        setSubmitting(false);
      });
  };

  const handleUpdate = (
    values: Prisma.CategoryCreateInput,
    helpers: FormikHelpers<Prisma.CategoryCreateInput>
  ) => {
    if (!id) return;

    api
      .put(`/categories/${id}`, values)
      .then((res) => res.data)
      .then(helpers.setValues)
      .catch(handleAxiosError)
      .finally(() => setSubmitting(false));
  };

  const onSubmit = (
    values: Prisma.CategoryCreateInput,
    helpers: FormikHelpers<Prisma.CategoryCreateInput>
  ) => {
    setSubmitting(true);

    if (!id) {
      handleSave(values);

      return;
    }

    handleUpdate(values, helpers);
  };

  if (loading) return <Spinner />;
  // todo: localize, create component
  if (!category) return <div>Error occured</div>;

  return (
    <Formik<Prisma.CategoryCreateInput>
      initialValues={category}
      onSubmit={onSubmit}
      // validationSchema={} todo
    >
      {(bag) => <FormContent formik={bag} id={id} submitting={submitting} />}
    </Formik>
  );
}
