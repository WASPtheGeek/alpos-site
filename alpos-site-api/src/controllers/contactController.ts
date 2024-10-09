import { Request, Response } from "express";
import prisma from "../client";
import { StatusCodes } from "http-status-codes";

// Gets all the contacts
export async function getContacts(req: Request, res: Response) {
  try {
    const contacts = await prisma.contact.findMany({
      orderBy: {
        name: "asc",
      },
    });

    res.json(contacts);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
}

// Creates a new Contact
export async function createContact(req: Request, res: Response) {
  const { email, name, phone, surname, position } = req.body;

  try {
    const contact = await prisma.contact.create({
      data: {
        email,
        name,
        phone,
        surname,
        position,
      },
    });

    res.json(contact);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
}

// Updates a Contact
export async function updateContact(req: Request, res: Response) {
  const { email, name, phone, surname, position } = req.body;
  const { id } = req.params;

  try {
    const contact = await prisma.contact.update({
      where: {
        id,
      },
      data: {
        email,
        name,
        phone,
        surname,
        position,
        // todo: check if updatedAt updates
      },
    });
    res.json(contact);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
}

// Deletes a Contact
export async function deleteContact(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const contact = await prisma.contact.delete({
      where: {
        id,
      },
    });
    res.json(contact);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
}
