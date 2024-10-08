import express from "express";
import { getLocales, setLanguage } from "../controllers";
import { checkLanguage } from "../middlewares";

const localizationRouter = express.Router();

/**
 * Public
 * */

// Get all localizations
localizationRouter.get("/", checkLanguage, getLocales);
// localizationRouter.put("/", setLanguage);

export default localizationRouter;
