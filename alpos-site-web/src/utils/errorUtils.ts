import { AxiosError } from "axios";

export async function handleAxiosError(error: AxiosError) {
  console.error(error);
  // todo: toast
  //   if (error.status === HttpStatusCode.Unauthorized && setUserContext) {
  //     setUserContext(undefined);
  //   }
}
