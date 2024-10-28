"use client";

import { Button, TextInput } from "@WASPtheGeek/base-components";
import React from "react";
import { Prisma } from "../../../../api/generated/client";
import { api } from "@/api/axios";
import { useLocalization } from "@/contexts/localization";
import { getT } from "@/utils/localizationUtils";
import { Form } from "@/components/form";
import { Checkbox } from "@/components/ui/checkbox";
import { parseDate } from "@/utils/dateUtils";
import Image from "next/image";
import { cloneDeep } from "lodash";

interface IProps {
  id?: string;
}

export default function CategoryForm(props: IProps) {
  const { id } = props;
  const [category, setCategory] = React.useState<Prisma.CategoryCreateInput>(
    {}
  );
  const { t } = useLocalization();

  React.useEffect(() => {
    if (!id) return;

    api
      .get(`/categories/full/${id}`)
      .then((res) => res.data)
      .then(setCategory);
  }, [id]);

  const previewFiles = (files?: FileList | null) => {
    if (!files || files.length > 1) return;

    let preview: string = "";
    const file = files[0];

    const reader = new FileReader();
    reader.onload = () => {
      preview = reader.result as string;
      const catClone = cloneDeep(category);
      catClone.imagePath = preview;
      setCategory(catClone);
    };

    reader.readAsDataURL(file);
  };

  const updateValue = (
    field: keyof Prisma.CategoryCreateInput,
    value?: string | boolean
  ) => {
    // clearError();
    const categoryClone = cloneDeep(category);

    categoryClone[field] = value as any;

    setCategory(categoryClone);
  };

  const handleSave = () => {
    api
      .post("/categories", category)
      // todo
      .catch((err) => console.log(err));
  };

  const handleUpdate = () => {
    if (!id) return;

    api
      .put(`/categories/${id}`, category)
      // todo
      .catch((err) => console.log(err));
  };

  const onSubmit = () => {
    if (!id) {
      handleSave();
      return;
    }

    handleUpdate();
  };

  return (
    <Form>
      <div className="space-y-2">
        <div>Image</div>
        <TextInput
          type="file"
          id="image"
          name="image"
          onChange={(e) => {
            previewFiles(e.target.files);
          }}
        />
        {category?.imagePath && (
          <Image
            src={category.imagePath}
            height="400"
            width="400"
            alt="Category Image"
          />
        )}
        {/* {error.image && <div className="text-destructive">{error.image}</div>} */}
      </div>
      <TextInput
        value={category?.name_en}
        label={getT("cat_name_en", t)}
        onChange={(_e, value) => updateValue("name_en", value)}
      />
      <TextInput
        value={category?.name_lv}
        label={getT("cat_name_lv", t)}
        onChange={(_e, value) => updateValue("name_lv", value)}
      />
      <TextInput
        value={category?.name_ru}
        label={getT("cat_name_ru", t)}
        onChange={(_e, value) => updateValue("name_ru", value)}
      />

      <TextInput
        value={category?.description_en}
        label={getT("cat_description_en", t)}
        onChange={(_e, value) => updateValue("description_en", value)}
      />
      <TextInput
        value={category?.description_lv}
        label={getT("cat_description_lv", t)}
        onChange={(_e, value) => updateValue("description_lv", value)}
      />
      <TextInput
        value={category?.description_ru}
        label={getT("cat_description_ru", t)}
        onChange={(_e, value) => updateValue("description_ru", value)}
      />
      <div className="flex items-center space-x-2">
        <Checkbox
          // value={category?.description_ru}
          // label={getT("cat_description_ru", t)}
          checked={category?.isActive}
          onCheckedChange={(checked) => updateValue("isActive", checked)}
        />
        <label
          htmlFor="terms2"
          className="font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {getT("cat_is_active", t)}
        </label>
      </div>
      <TextInput
        value={parseDate(category?.updatedAt)}
        label={getT("cat_updated_at", t)}
        disabled
      />
      <TextInput
        value={parseDate(category?.createdAt)}
        label={getT("cat_created_at", t)}
        disabled
      />
      {/* todo: localize */}
      <Button onClick={onSubmit} label="Submit" />
    </Form>
  );
}
