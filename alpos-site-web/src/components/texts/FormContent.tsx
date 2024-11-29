"use client";

import { Form } from "@/components/form";
import { useLocalization } from "@/contexts/localization";
import { parseDate } from "@/utils/dateUtils";
import { getT } from "@/utils/localizationUtils";
import {
  Button,
  Spinner,
  TextInput,
  TextInputFormik,
} from "@WASPtheGeek/base-components";
import { FormikProps } from "formik";
import React from "react";
import { Prisma } from "../../api/generated/client";

interface IProps {
  className?: string;
  id?: string;
  formik: FormikProps<Prisma.TextToDisplayCreateInput>;
  submitting?: boolean;
}

export default function FormContent(props: IProps) {
  const { formik, id, submitting } = props;
  const { t } = useLocalization();

  if (submitting) return <Spinner />;

  return (
    <Form>
      <div className="grid sm:grid-cols-2 gap-4">
        <TextInputFormik
          formikProps={formik}
          bagField="key"
          {...formik.getFieldProps("key")}
          label={getT("field_key", t)}
        />
        <TextInputFormik
          formikProps={formik}
          bagField="en"
          {...formik.getFieldProps("en")}
          label={getT("field_content_en", t)}
        />
        <TextInputFormik
          formikProps={formik}
          bagField="lv"
          {...formik.getFieldProps("lv")}
          label={getT("field_content_lv", t)}
        />
        <TextInputFormik
          formikProps={formik}
          bagField="ru"
          {...formik.getFieldProps("ru")}
          label={getT("field_content_ru", t)}
        />
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        {id && (
          <TextInput
            value={parseDate(formik.values?.updatedAt)}
            label={getT("field_updated_at", t)}
            disabled
          />
        )}
      </div>
      <Button
        disabled={!formik.dirty}
        className="md:w-80 md:ml-auto"
        onClick={formik.submitForm}
        label={getT(id ? "update" : "create", t)}
      />
    </Form>
  );
}
