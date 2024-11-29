import { requiredString } from "@/utils/yupUtils";
import { object } from "yup";

export const textsUpdateValidationSchema = (requiredMsg?: string) => {
  return object().shape({
    key: requiredString(requiredMsg),
    // todo: update validation
  });
};
