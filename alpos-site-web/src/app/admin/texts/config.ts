import { GridColumnConfig } from "@WASPtheGeek/base-components";
import { Prisma } from "../../../api/generated/client";

export const columnConfig = (
  t: (key: string) => string
): GridColumnConfig<Prisma.TextToDisplayCreateInput>[] => [
  {
    field: "key",
    title: t("table_key"),
  },
  {
    field: "lv",
    title: t("table_content_lv"),
  },
  {
    field: "en",
    title: t("table_content_en"),
  },
  {
    field: "ru",
    title: t("table_content_ru"),
  },
  {
    field: "updatedAt",
    title: t("table_updated_at"),
    type: "Date",
  },
];
