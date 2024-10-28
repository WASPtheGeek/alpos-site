import moment from "moment";
import { AppConstants } from "../constants/appConstants";

export function parseDate(data?: Date | string, dateFormat?: string) {
  if (!data) return;

  return moment(data).format(dateFormat ?? AppConstants.dateFormat);
}
