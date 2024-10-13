import axios, { CreateAxiosDefaults, HttpStatusCode } from "axios";
import { AppConstants } from "../constants/appConstants";

const baseUrl =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000/";

const apiConfig: CreateAxiosDefaults = {
  baseURL: baseUrl,
  withCredentials: true,
  headers: {
    "Accept-Language": "lv",
  },
};

export const api = axios.create(apiConfig);

api.interceptors.request.use(
  (config) => {
    let locale: string | undefined | null = localStorage.getItem(
      AppConstants.app_locale_key
    );
    locale = locale?.replace(/['"]+/g, "");

    if (locale) {
      config.headers.set("Accept-Language", locale);
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;

    if (
      error.response?.status === HttpStatusCode.Forbidden &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        await generateRefreshToken();

        return api(originalRequest);
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export const generateRefreshToken = async () => {
  try {
    await api.post(`/auth/refreshToken`);
  } catch (error) {
    console.error(error);
  }
};
