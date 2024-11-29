import i18next from "i18next";
import prisma from "../client";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { TextToDisplayViewModel } from "../models";

// Gets the text value by key
export async function getTextByKey(req: Request, res: Response) {
  try {
    const { key } = req.body;
    const currentLang = i18next.language;

    const t = await prisma.textToDisplay.findUnique({
      where: {
        key,
      },
    });

    if (!t) {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Such key is not found" });

      return;
    }

    const mappedItem: TextToDisplayViewModel = {
      id: t.id,
      key: t.key,
      createdAt: t.createdAt,
      updatedAt: t.updatedAt,
      value: currentLang === "en" ? t.en : currentLang === "ru" ? t.ru : t.lv,
    } as TextToDisplayViewModel;

    res.json(mappedItem);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
}

// Gets the full Text by id
export async function getFullTextById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const t = await prisma.textToDisplay.findUnique({
      where: {
        id,
      },
    });

    res.json(t);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
}

// Gets all the TextToDisplay
export async function getTexts(req: Request, res: Response) {
  try {
    const texts = await prisma.textToDisplay.findMany({
      orderBy: {
        updatedAt: "desc",
      },
    });

    res.json(texts);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
}

// Creates a new TextToDisplay
export async function createTextToDisplay(req: Request, res: Response) {
  try {
    const { key, lv, en, ru } = req.body;

    const text = await prisma.textToDisplay.create({
      data: {
        key,
        lv,
        en,
        ru,
      },
    });

    res.json(text);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
}

// Updates the TextToDisplay
export async function updateTextToDisplay(req: Request, res: Response) {
  try {
    const { key, lv, en, ru } = req.body;
    const { id } = req.params;

    const text = await prisma.textToDisplay.update({
      where: {
        id,
      },
      data: {
        key,
        lv,
        en,
        ru,
      },
    });

    res.json(text);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
}

// Deletes the TextToDisplay
export async function deleteTextToDisplay(req: Request, res: Response) {
  try {
    const { key } = req.body;

    const text = await prisma.textToDisplay.delete({
      where: {
        key,
      },
    });

    res.json(text);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
}
