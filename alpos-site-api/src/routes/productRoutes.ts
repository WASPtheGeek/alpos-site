import express from "express";
import {
  ProductCreateInputSchema,
  ProductUpdateInputSchema,
} from "../../prisma/generated/zod-schemas";
import {
  createProduct,
  deleteProduct,
  getFullProduct,
  getProduct,
  getProducts,
  updateProduct,
} from "../controllers";
import { checkLanguage, validate, verifyToken } from "../middlewares";

const productRouter = express.Router();

/** Public */

// Gets the localized Product by id
productRouter.get("/:id", checkLanguage, getProduct);

/** Private */

// Gets the full Product by id
productRouter.get("/full/:id", verifyToken, getFullProduct);

// Gets all Products
productRouter.get("/", verifyToken, getProducts);

// Creates a Product & assignes to Category
productRouter.post(
  "/",
  verifyToken,
  validate(ProductCreateInputSchema),
  createProduct
);

// Updates the Product
productRouter.put(
  "/:id",
  verifyToken,
  validate(ProductUpdateInputSchema),
  updateProduct
);

// Deletes the Product
productRouter.delete("/:id", verifyToken, deleteProduct);

export default productRouter;
