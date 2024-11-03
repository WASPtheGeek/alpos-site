"use client";

import React from "react";
import { Form } from "@/components/form";
import { Checkbox } from "@/components/ui/checkbox";
import { useLocalization } from "@/contexts/localization";
import { parseDate } from "@/utils/dateUtils";
import { getT } from "@/utils/localizationUtils";
import {
  Button,
  ImagePickerFormik,
  Spinner,
  TextInput,
  TextInputFormik,
  NumberInputFormik,
} from "@WASPtheGeek/base-components";
import { FormikProps } from "formik";
import { Prisma } from "../../api/generated/client";

interface IProps {
  className?: string;
  id?: string;
  formik: FormikProps<Prisma.ProductCreateInput>;
  submitting?: boolean;
}

export default function FormContent(props: IProps) {
  const { formik, id, submitting } = props;
  const { t } = useLocalization();

  if (submitting) return <Spinner />;

  return (
    <Form>
      {/* todo: payload too large */}
      <ImagePickerFormik
        {...formik.getFieldProps("imagePath")}
        onChange={(data) => formik.setFieldValue("imagePath", data)}
        formikProps={formik}
        bagField="imagePath"
        selectText={getT("select_image", t)}
        width={150}
        height={150}
      />
      <div className="grid sm:grid-cols-2 gap-4">
        <TextInputFormik
          formikProps={formik}
          bagField="name_en"
          {...formik.getFieldProps("name_en")}
          label={getT("field_name_en", t)}
        />
        <TextInputFormik
          formikProps={formik}
          bagField="name_lv"
          {...formik.getFieldProps("name_lv")}
          label={getT("field_name_lv", t)}
        />
        <TextInputFormik
          formikProps={formik}
          bagField="name_ru"
          {...formik.getFieldProps("name_ru")}
          label={getT("field_name_ru", t)}
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
        <TextInputFormik
          formikProps={formik}
          bagField="manufacturer"
          {...formik.getFieldProps("manufacturer")}
          label={getT("field_manufacturer", t)}
        />
        <TextInputFormik
          formikProps={formik}
          bagField="country"
          {...formik.getFieldProps("country")}
          label={getT("field_country", t)}
        />
        {/* not working */}
        <NumberInputFormik
          formikProps={formik}
          bagField="price"
          value={formik.values?.price as number}
          onChange={(v) => formik.setFieldValue("price", v)}
          label={getT("field_price", t)}
        />
        <NumberInputFormik
          formikProps={formik}
          bagField="priceExcludingVAT"
          value={formik.values?.priceExcludingVAT as number}
          onChange={(v) => formik.setFieldValue("priceExcludingVAT", v)}
          label={getT("field_priceExcludingVAT", t)}
        />
      </div>
      {/* todo */}
      <div>Category</div>
      <div>filePath</div>
      {/* todo: custom input */}
      {/* todo: this isn't working */}
      <div className="flex items-center space-x-2 my-4">
        <Checkbox
          checked={formik.values?.isActive}
          onCheckedChange={(checked) =>
            formik.setFieldValue("isActive", checked)
          }
        />
        <label
          htmlFor="terms2"
          className="font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {getT("prod_is_active", t)}
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
