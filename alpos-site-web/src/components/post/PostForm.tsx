"use client";

import { api } from "@/api/axios";
import { Spinner } from "@WASPtheGeek/base-components";
import { Formik, FormikHelpers } from "formik";
import React from "react";
import { Prisma } from "../../api/generated/client";
import FormContent from "./FormContent";
import { handleAxiosError } from "@/utils/errorUtils";
import { useRouter } from "next/navigation";
import { postUpdateValidationSchema } from "./validation";
import { useLocalization } from "@/contexts/localization";
import { getT } from "@/utils/localizationUtils";
import { PageError } from "@/components/error";

interface IProps {
  id?: string;
}

export default function PostForm(props: IProps) {
  const { id } = props;
  const [post, setPost] = React.useState<Prisma.PostCreateInput>({
    isArchived: true,
  });
  const [loading, setLoading] = React.useState<boolean>(true);
  const [submitting, setSubmitting] = React.useState<boolean>(false);
  const [refresh, setRefresh] = React.useState<boolean>(false);
  const router = useRouter();
  const { t } = useLocalization();

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
      .get(`/posts/full/${id}`)
      .then((res) => res.data)
      .then(setPost)
      .finally(() => setLoading(false));
  }, [id, loading, refresh]);

  const handleSave = (values: Prisma.PostCreateInput) => {
    api
      .post("/posts", values)
      .then((res) => res.data)
      .then((data) => router.replace(`/admin/posts/item/${data.id}`))
      .catch((err) => {
        handleAxiosError(err);
        setSubmitting(false);
      });
  };

  const handleUpdate = (
    values: Prisma.PostCreateInput,
    helpers: FormikHelpers<Prisma.PostCreateInput>
  ) => {
    if (!id) return;

    api
      .put(`/posts/${id}`, values)
      .then((res) => res.data)
      .then(helpers.setValues)
      .catch(handleAxiosError)
      .finally(() => setSubmitting(false));
  };

  const onSubmit = (
    values: Prisma.PostCreateInput,
    helpers: FormikHelpers<Prisma.PostCreateInput>
  ) => {
    setSubmitting(true);

    if (!id) {
      handleSave(values);

      return;
    }

    handleUpdate(values, helpers);
  };

  if (loading) return <Spinner />;
  if (!post)
    return <PageError title={getT("item_not_found", t)} noFullHeight />;

  return (
    <Formik<Prisma.PostCreateInput>
      initialValues={post}
      onSubmit={onSubmit}
      validationSchema={postUpdateValidationSchema(getT("required_field", t))}
      validateOnChange={false}
    >
      {(bag) => <FormContent formik={bag} id={id} submitting={submitting} />}
    </Formik>
  );
}
