"use client";

import React from "react";
import { Form } from "@/components/form";
import { Checkbox } from "@/components/ui/checkbox";
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
import { Prisma } from "../../api/generated/client";

interface IProps {
  className?: string;
  id?: string;
  formik: FormikProps<Prisma.PostCreateInput>;
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
          bagField="title_en"
          {...formik.getFieldProps("title_en")}
          label={getT("field_title_en", t)}
        />
        <TextInputFormik
          formikProps={formik}
          bagField="title_lv"
          {...formik.getFieldProps("title_lv")}
          label={getT("field_title_lv", t)}
        />
        <TextInputFormik
          formikProps={formik}
          bagField="title_ru"
          {...formik.getFieldProps("title_ru")}
          label={getT("field_title_ru", t)}
        />

        <TextInputFormik
          formikProps={formik}
          bagField="description_en"
          {...formik.getFieldProps("description_en")}
          label={getT("field_description_en", t)}
        />
        <TextInputFormik
          formikProps={formik}
          bagField="description_lv"
          {...formik.getFieldProps("description_lv")}
          label={getT("field_description_lv", t)}
        />
        <TextInputFormik
          formikProps={formik}
          bagField="description_ru"
          {...formik.getFieldProps("description_ru")}
          label={getT("field_description_ru", t)}
        />

        {/* todo: set html parser? */}
        <TextInputFormik
          formikProps={formik}
          bagField="content_en"
          {...formik.getFieldProps("content_en")}
          label={getT("field_content_en", t)}
        />
        <TextInputFormik
          formikProps={formik}
          bagField="content_lv"
          {...formik.getFieldProps("content_lv")}
          label={getT("field_content_lv", t)}
        />
        <TextInputFormik
          formikProps={formik}
          bagField="content_ru"
          {...formik.getFieldProps("content_ru")}
          label={getT("field_content_ru", t)}
        />
      </div>
      {/* todo: custom input */}
      <div className="flex items-center space-x-2 my-4">
        <Checkbox
          checked={formik.values?.isArchived}
          onCheckedChange={(checked) =>
            formik.setFieldValue("isArchived", checked)
          }
        />
        <label
          htmlFor="terms2"
          className="font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {getT("post_is_archived", t)}
        </label>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        {id && (
          <TextInput
            value={parseDate(formik.values?.updatedAt)}
            label={getT("field_updated_at", t)}
            disabled
          />
        )}
        {id && (
          <TextInput
            value={parseDate(formik.values?.createdAt)}
            label={getT("field_created_at", t)}
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
