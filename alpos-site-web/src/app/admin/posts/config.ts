import { GridColumnConfig } from "@WASPtheGeek/base-components";
import { Prisma } from "../../../api/generated/client";

export const columnConfig = (
  t: (key: string) => string
): GridColumnConfig<Prisma.PostCreateInput>[] => [
  {
    field: "title_en",
    title: t("field_title_en"),
  },
  {
    field: "title_lv",
    title: t("table_title_lv"),
  },
  {
    field: "title_ru",
    title: t("table_title_ru"),
  },
  // todo: views
  {
    field: "isArchived",
    title: t("table_is_archived"),
    type: "Boolean",
  },
  {
    field: "description_en",
    title: t("table_descr_en"),
  },
  {
    field: "description_lv",
    title: t("table_descr_lv"),
  },
  {
    field: "description_ru",
    title: t("table_descr_ru"),
  },
  {
    field: "content_en",
    title: t("table_content_en"),
  },
  {
    field: "content_lv",
    title: t("table_content_lv"),
  },
  {
    field: "content_ru",
    title: t("table_content_ru"),
  },
  {
    field: "updatedAt",
    title: t("table_updated_at"),
    type: "Date",
  },
];
