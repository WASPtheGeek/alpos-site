import { GridColumnConfig } from "@WASPtheGeek/base-components";
import { Prisma } from "../../../api/generated/client";

export const columnConfig = (
  t: (key: string) => string
): GridColumnConfig<Prisma.CategoryCreateInput>[] => [
  {
    field: "name_en",
    title: t("field_name_en"),
  },
  {
    field: "name_lv",
    title: t("table_name_lv"),
  },
  {
    field: "name_ru",
    title: t("table_name_ru"),
  },
  {
    field: "isActive",
    title: t("table_is_active"),
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
    field: "updatedAt",
    title: t("table_updated_at"),
    type: "Date",
  },
];
