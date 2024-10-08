import { NextFunction, Request, Response } from "express";
import i18next from "i18next";

export async function getLocales(req: Request, res: Response) {
  const loc = await i18next.getResourceBundle(i18next.language, "translation");

  res.json(loc);
}

export const setLanguage = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.locals.lng = req.language;
  next();
};
