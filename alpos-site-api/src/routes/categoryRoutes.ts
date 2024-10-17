import express from "express";
import {
  CategoryCreateInputSchema,
  CategoryUpdateInputSchema,
} from "../../prisma/generated/zod-schemas";
import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategory,
  getFullCategories,
  getFullCategory,
  getProductsByCategory,
  updateCategory,
} from "../controllers";
import { checkLanguage, validate, verifyToken } from "../middlewares";

const categoryRouter = express.Router();

/** Public */

// Gets all Categories
categoryRouter.get("/", checkLanguage, getCategories);

// Gets all Products by Category
categoryRouter.get("/:id/products", checkLanguage, getProductsByCategory);

// Gets the localized Category by id
categoryRouter.get("/:id", checkLanguage, getCategory);

/** Private */

// Gets the full Category by id
categoryRouter.get("/full/:id", verifyToken, getFullCategory);

// Gets all Categories - full
categoryRouter.get("/list/full", verifyToken, getFullCategories);

// Creates a new Category
categoryRouter.post(
  "/",
  verifyToken,
  validate(CategoryCreateInputSchema),
  createCategory
);

// Updates the Category
categoryRouter.put(
  "/:id",
  verifyToken,
  validate(CategoryUpdateInputSchema),
  updateCategory
);

// Deletes the Category (keeps associated Products)
categoryRouter.delete("/:id", verifyToken, deleteCategory);

export default categoryRouter;
