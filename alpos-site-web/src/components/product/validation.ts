import { requiredString } from "@/utils/yupUtils";
import { object } from "yup";

export const productUpdateValidationSchema = (requiredMsg?: string) => {
  return object().shape({
    imagePath: requiredString(requiredMsg),
    name_en: requiredString(requiredMsg),
    name_lv: requiredString(requiredMsg),
    name_ru: requiredString(requiredMsg),
  });
};
