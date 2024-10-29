"use client";

import { Form } from "@/components/form";
import { Checkbox } from "@/components/ui/checkbox";
import { useLocalization } from "@/contexts/localization";
import { parseDate } from "@/utils/dateUtils";
import { getT } from "@/utils/localizationUtils";
import { Button, Icon, TextInput } from "@WASPtheGeek/base-components";
import { FormikProps } from "formik";
import Image from "next/image";
import React from "react";
import { Prisma } from "../../api/generated/client";

interface IProps {
  className?: string;
  id?: string;
  formik: FormikProps<Prisma.CategoryCreateInput>;
  submitting?: boolean;
}

export default function FormContent(props: IProps) {
  const { formik, id, submitting } = props;
  const { t } = useLocalization();

  // todo: move to separate component?
  const previewFiles = (files?: FileList | null) => {
    if (!files || files.length > 1) return;

    let preview: string = "";
    const file = files[0];

    const reader = new FileReader();
    reader.onload = () => {
      preview = reader.result as string;
      formik.setFieldValue("imagePath", preview);
    };

    reader.readAsDataURL(file);
  };

  // todo
  if (submitting) return <div>Submitting...</div>;

  const renderImg = () => {
    if (!formik.values?.imagePath) {
      return (
        <div
          className="flex justify-center items-center"
          style={{ height: "250px", width: "250px" }}
        >
          <Icon disabled className="fas fa-image" />
        </div>
      );
    }

    return (
      <Image
        src={formik.values?.imagePath}
        height="250"
        width="250"
        alt="Category Image"
      />
    );
  };

  return (
    <Form>
      <div className="space-y-2">
        <div>{getT("image", t)}</div>
        <div className="img-content flex gap-2">
          <TextInput
            type="file"
            id="pick_image"
            className="hidden"
            onChange={(e) => {
              previewFiles(e.target.files);
            }}
          />
          <div className="img-border border-2 w-fit">{renderImg()}</div>
          <label
            className="img-select-btn min-w-10 border p-2 h-12 bg-amber-400 font-bold rounded-md flex justify-center hover:cursor-pointer hover:bg-amber-300"
            htmlFor="pick_image"
          >
            {getT("select_image", t)}
          </label>
        </div>
        {/* {error.image && <div className="text-destructive">{error.image}</div>} */}
      </div>
      <TextInput
        {...formik.getFieldProps("name_en")}
        label={getT("cat_name_en", t)}
        //   todo: error message
      />
      <TextInput
        {...formik.getFieldProps("name_lv")}
        label={getT("cat_name_lv", t)}
      />
      <TextInput
        {...formik.getFieldProps("name_ru")}
        label={getT("cat_name_ru", t)}
      />

      <TextInput
        {...formik.getFieldProps("description_en")}
        label={getT("cat_description_en", t)}
      />
      <TextInput
        {...formik.getFieldProps("description_lv")}
        label={getT("cat_description_lv", t)}
      />
      <TextInput
        {...formik.getFieldProps("description_ru")}
        label={getT("cat_description_ru", t)}
      />
      <div className="flex items-center space-x-2">
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
          {getT("cat_is_active", t)}
        </label>
      </div>
      {id && (
        <TextInput
          value={parseDate(formik.values?.updatedAt)}
          label={getT("cat_updated_at", t)}
          disabled
        />
      )}
      {id && (
        <TextInput
          value={parseDate(formik.values?.createdAt)}
          label={getT("cat_created_at", t)}
          disabled
        />
      )}
      <Button
        onClick={formik.submitForm}
        label={getT(id ? "update" : "create", t)}
      />
    </Form>
  );
}
