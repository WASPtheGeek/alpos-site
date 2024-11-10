import { requiredString } from "@/utils/yupUtils";
import { object } from "yup";

export const postUpdateValidationSchema = (requiredMsg?: string) => {
  return object().shape({
    title_en: requiredString(requiredMsg),
    title_lv: requiredString(requiredMsg),
    title_ru: requiredString(requiredMsg),
  });
};
