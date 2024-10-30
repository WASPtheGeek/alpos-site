import { string } from "yup";

export const requiredString = (message?: string) => string().required(message);
