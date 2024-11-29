"use client";

import { api } from "@/api/axios";
import { Spinner } from "@WASPtheGeek/base-components";
import { Formik, FormikHelpers } from "formik";
import React from "react";
import { Prisma } from "../../api/generated/client";
import FormContent from "./FormContent";
import { handleAxiosError } from "@/utils/errorUtils";
import { useRouter } from "next/navigation";
import { textsUpdateValidationSchema } from "./validation";
import { useLocalization } from "@/contexts/localization";
import { getT } from "@/utils/localizationUtils";
import { PageError } from "@/components/error";

interface IProps {
  id?: string;
}

export default function TextsForm(props: IProps) {
  const { id } = props;
  const [txt, setTxt] = React.useState<Prisma.TextToDisplayCreateInput>({
    key: "",
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
      .get(`/texts/full/${id}`)
      .then((res) => res.data)
      .then(setTxt)
      .finally(() => setLoading(false));
  }, [id, loading, refresh]);

  const handleSave = (values: Prisma.TextToDisplayCreateInput) => {
    api
      .post("/texts", values)
      .then((res) => res.data)
      .then((data) => router.replace(`/admin/texts/item/${data.id}`))
      .catch((err) => {
        handleAxiosError(err);
        setSubmitting(false);
      });
  };

  const handleUpdate = (
    values: Prisma.TextToDisplayCreateInput,
    helpers: FormikHelpers<Prisma.TextToDisplayCreateInput>
  ) => {
    if (!id) return;

    api
      .put(`/texts/${id}`, values)
      .then((res) => res.data)
      .then(helpers.setValues)
      .catch(handleAxiosError)
      .finally(() => setSubmitting(false));
  };

  const onSubmit = (
    values: Prisma.TextToDisplayCreateInput,
    helpers: FormikHelpers<Prisma.TextToDisplayCreateInput>
  ) => {
    setSubmitting(true);

    if (!id) {
      handleSave(values);

      return;
    }

    handleUpdate(values, helpers);
  };

  if (loading) return <Spinner />;
  if (id && !txt)
    return <PageError title={getT("item_not_found", t)} noFullHeight />;

  return (
    <Formik<Prisma.TextToDisplayCreateInput>
      initialValues={txt}
      onSubmit={onSubmit}
      validationSchema={textsUpdateValidationSchema(getT("required_field", t))}
      validateOnChange={false}
    >
      {(bag) => <FormContent formik={bag} id={id} submitting={submitting} />}
    </Formik>
  );
}
