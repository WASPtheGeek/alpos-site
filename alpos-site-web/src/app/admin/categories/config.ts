import { GridColumnConfig } from "@WASPtheGeek/base-components";
import { Prisma } from "../../../api/generated/client";

export const columnConfig: GridColumnConfig<Prisma.CategoryCreateInput>[] = [
  {
    // todo: localize fields
    field: "name_en",
    title: "Name EN",
  },
  {
    field: "name_lv",
    title: "Name LV",
  },
  {
    field: "isActive",
    title: "Is active",
  },
  {
    field: "name_ru",
    title: "Name RU",
  },
  {
    field: "description_en",
    title: "Description EN",
  },
  {
    field: "description_lv",
    title: "Description LV",
  },
  {
    field: "description_ru",
    title: "Description RU",
  },
  {
    // todo: boolean field
    // field: "isActive",
    // title: "Is Active",
    // type: "",
  },
  {
    field: "updatedAt",
    title: "Datums",
    type: "Date",
  },
];
