import { NextFunction, Response, Request } from "express";
import i18next from "i18next";

export async function checkLanguage(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const currentLang = i18next.language;
  const contentLang = req.headers["accept-language"];

  if (currentLang !== contentLang) {
    await i18next.changeLanguage(contentLang, () => {
      next();
    });

    return;
  }

  next();
}
