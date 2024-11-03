import { AxiosError } from "axios";
import { FormikHelpers } from "formik";

export async function handleAxiosError<T>(
  error: AxiosError,
  helpers?: FormikHelpers<T>
) {
  console.error(error);

  // error array
  const errorDetails = (error.response?.data as any)?.details;

  if (errorDetails && Array.isArray(errorDetails) && errorDetails.length > 0) {
    errorDetails.forEach((e) => {
      helpers?.setFieldError(e.field[0], e.message);
    });
  }
  // todo: toast
  //   if (error.status === HttpStatusCode.Unauthorized && setUserContext) {
  //     setUserContext(undefined);
  //   }
}
