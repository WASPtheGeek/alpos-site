import express from "express";
import { validate } from "../middlewares";
import {
  ContactCreateInputSchema,
  ContactUpdateInputSchema,
} from "../../prisma/generated/zod-schemas";
import { verifyToken } from "../middlewares";
import {
  createContact,
  deleteContact,
  getContacts,
  updateContact,
} from "../controllers";

const contactRouter = express.Router();

/** Public */

// Gets all the Contacts
contactRouter.get("/", getContacts);

/**  Requires auth */

// Creates a new Contact
contactRouter.post(
  "/",
  verifyToken,
  validate(ContactCreateInputSchema),
  createContact
);
// Updates a Contact
contactRouter.put(
  "/:id",
  verifyToken,
  validate(ContactUpdateInputSchema),
  updateContact
);
// Deletes a Contact
contactRouter.delete("/:id", verifyToken, deleteContact);

export default contactRouter;
