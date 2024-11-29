"use client";

import { api } from "@/api/axios";
import { useLocalization } from "@/contexts/localization";
import { handleAxiosError } from "@/utils/errorUtils";
import { getT } from "@/utils/localizationUtils";
import { Spinner } from "@WASPtheGeek/base-components";
import { Formik, FormikHelpers } from "formik";
import { useRouter } from "next/navigation";
import React from "react";
import { Prisma } from "../../api/generated/client";
import FormContent from "./FormContent";
import { productUpdateValidationSchema } from "./validation";
import { PageError } from "../error";

interface IProps {
  id?: string;
}

export default function ProductForm(props: IProps) {
  const { id } = props;
  const [product, setProduct] = React.useState<Prisma.ProductCreateInput>({
    isActive: false,
    price: 0,
    priceExcludingVAT: 0,
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
      .get(`/products/full/${id}`)
      .then((res) => res.data)
      .then(setProduct)
      .finally(() => setLoading(false));
  }, [id, loading, refresh]);

  const handleSave = (
    values: Prisma.ProductCreateInput,
    helpers: FormikHelpers<Prisma.ProductCreateInput>
  ) => {
    // todo

    values.category = {
      connect: {
        id: "d054c010-770c-4a9f-9b74-1b498fe6228a",
      },
    };
    api
      .post("/products", values)
      .then((res) => res.data)
      .then((data) => router.replace(`/admin/products/item/${data.id}`))
      .catch((err) => {
        handleAxiosError(err, helpers);
        setSubmitting(false);
      });
  };

  const handleUpdate = (
    values: Prisma.ProductCreateInput,
    helpers: FormikHelpers<Prisma.ProductCreateInput>
  ) => {
    if (!id) return;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { categoryId, ...valuesToSend } = values as any;

    api
      .put(`/products/${id}`, valuesToSend)
      .then((res) => res.data)
      .then(helpers.setValues)
      .catch((err) => handleAxiosError(err, helpers))
      .finally(() => setSubmitting(false));
  };

  const onSubmit = (
    values: Prisma.ProductCreateInput,
    helpers: FormikHelpers<Prisma.ProductCreateInput>
  ) => {
    setSubmitting(true);

    if (!id) {
      handleSave(values, helpers);

      return;
    }

    handleUpdate(values, helpers);
  };

  if (loading) return <Spinner />;
  if (id && !product)
    return <PageError title={getT("item_not_found", t)} noFullHeight />;

  return (
    <Formik<Prisma.ProductCreateInput>
      initialValues={product}
      onSubmit={onSubmit}
      validationSchema={productUpdateValidationSchema(
        getT("required_field", t)
      )}
      validateOnChange={false}
      validateOnBlur={false}
    >
      {(bag) => <FormContent formik={bag} id={id} submitting={submitting} />}
    </Formik>
  );
}
