import express from "express";
import {
  createTextToDisplay,
  deleteTextToDisplay,
  getTextByKey,
  getFullTextById,
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

textToDisplayRouter.get("/full/:id", verifyToken, getFullTextById);

// Creates a new TextToDisplay
textToDisplayRouter.post(
  "/",
  verifyToken,
  validate(TextToDisplayCreateInputSchema),
  createTextToDisplay
);

// Updates the TextToDisplay
textToDisplayRouter.put(
  "/:id",
  verifyToken,
  validate(TextToDisplayUpdateInputSchema),
  updateTextToDisplay
);

// Deletes the TextToDisplay
textToDisplayRouter.delete("/", verifyToken, deleteTextToDisplay);

export default textToDisplayRouter;
