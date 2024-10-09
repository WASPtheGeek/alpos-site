import express from "express";
import {
  createTextToDisplay,
  deleteTextToDisplay,
  getTextByKey,
  getTexts,
  updateTextToDisplay,
} from "../controllers";
import { checkLanguage, validate, verifyToken } from "../middlewares";
import {
  TextToDisplayCreateInputSchema,
  TextToDisplayUpdateInputSchema,
} from "../../prisma/generated/zod-schemas";

const textToDisplayRouter = express.Router();

/** Public */

// Gets the text by key
textToDisplayRouter.get("/key", checkLanguage, getTextByKey);

/** Private */

// Gets all the TextToDisplay
textToDisplayRouter.get("/", verifyToken, getTexts);

// Creates a new TextToDisplay
textToDisplayRouter.post(
  "/",
  verifyToken,
  validate(TextToDisplayCreateInputSchema),
  createTextToDisplay
);

// Updates the TextToDisplay
textToDisplayRouter.put(
  "/",
  verifyToken,
  validate(TextToDisplayUpdateInputSchema),
  updateTextToDisplay
);

// Deletes the TextToDisplay
textToDisplayRouter.delete("/", verifyToken, deleteTextToDisplay);

export default textToDisplayRouter;
