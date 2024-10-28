interface IAppConstants {
  user_storage_key: string;
  token_storage_key: string;
  app_locale_key: string;
  translations_key: string;
  dateFormat: string;
}

export const AppConstants: IAppConstants = {
  user_storage_key: "user_data",
  token_storage_key: "token",
  app_locale_key: "app_locale",
  translations_key: "app_translations",
  dateFormat: "DD/MM/YYYY HH:mm:ss",
};
