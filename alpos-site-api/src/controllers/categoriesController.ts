import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import i18next from "i18next";
import prisma from "../client";
import { CategoryViewModel, ProductViewModel } from "../models";

// Gets all Categories - localized
export async function getCategories(req: Request, res: Response) {
  try {
    const currentLang = i18next.language;

    let orderBy = {};

    switch (currentLang) {
      case "en":
        orderBy = { name_en: "desc" };
        break;

      case "ru":
        orderBy = { name_ru: "desc" };
        break;

      case "lv":
      default:
        orderBy = { name_lv: "desc" };
        break;
    }

    const categories = await prisma.category.findMany();

    const mappedItems: CategoryViewModel[] =
      categories?.map(
        (c) =>
          ({
            id: c.id,
            imagePath: c.imagePath,
            createdAt: c.createdAt,
            updatedAt: c.updatedAt,
            name:
              currentLang === "en"
                ? c.name_en
                : currentLang === "ru"
                ? c.name_ru
                : c.name_lv,
            description:
              currentLang === "en"
                ? c.description_en
                : currentLang === "ru"
                ? c.description_ru
                : c.description_lv,
          } as CategoryViewModel)
      ) ?? [];

    res.json(mappedItems);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
}

// Gets all Products by Category
export async function getProductsByCategory(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const currentLang = i18next.language;

    let orderBy = {};

    switch (currentLang) {
      case "en":
        orderBy = { name_en: "desc" };
        break;

      case "ru":
        orderBy = { name_ru: "desc" };
        break;

      case "lv":
      default:
        orderBy = { name_lv: "desc" };
        break;
    }

    const products = await prisma.product.findMany({
      where: {
        categoryId: id,
      },
      orderBy,
    });

    const mappedItems: ProductViewModel[] =
      products?.map(
        (p) =>
          ({
            id: p.id,
            name:
              currentLang === "en"
                ? p.name_en
                : currentLang === "ru"
                ? p.name_ru
                : p.name_lv,
            description:
              currentLang === "en"
                ? p.description_en
                : currentLang === "ru"
                ? p.description_ru
                : p.description_lv,
            country: p.country,
            imagePath: p.imagePath,
            filePath: p.filePath,
            isActive: p.isActive,
            isAvailable: p.isAvailable,
            manufacturer: p.manufacturer,
            price: p.price,
            priceExcludingVAT: p.priceExcludingVAT,
            createdAt: p.createdAt,
            updatedAt: p.updatedAt,
          } as ProductViewModel)
      ) ?? [];

    res.json(mappedItems);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
}

// Gets the localized Category by id
export async function getCategory(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const c = await prisma.category.findUnique({
      where: {
        id,
      },
    });

    if (!c) {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Such product is not found" });

      return;
    }

    const currentLang = i18next.language;
    const mappedItem: CategoryViewModel = {
      id: c.id,
      imagePath: c.imagePath,
      createdAt: c.createdAt,
      updatedAt: c.updatedAt,
      name:
        currentLang === "en"
          ? c.name_en
          : currentLang === "ru"
          ? c.name_ru
          : c.name_lv,
      description:
        currentLang === "en"
          ? c.description_en
          : currentLang === "ru"
          ? c.description_ru
          : c.description_lv,
    } as CategoryViewModel;

    res.json(mappedItem);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
}

// Gets the full Category by id
export async function getFullCategory(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const c = await prisma.category.findUnique({
      where: {
        id,
      },
    });

    res.json(c);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
}

// Gets all Categories - full
export async function getFullCategories(req: Request, res: Response) {
  try {
    const categories = await prisma.category.findMany();

    res.json(categories);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
}

// Creates a new Category
export async function createCategory(req: Request, res: Response) {
  const {
    name_en,
    name_lv,
    name_ru,
    description_en,
    description_lv,
    description_ru,
    imagePath,
    isActive,
  } = req.body;
  const { id } = req.params;

  try {
    const category = await prisma.category.create({
      data: {
        name_en,
        name_lv,
        name_ru,
        description_en,
        description_lv,
        description_ru,
        imagePath,
        isActive,
      },
    });

    res.json(category);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
}

// Updates the Category
export async function updateCategory(req: Request, res: Response) {
  const {
    name_en,
    name_lv,
    name_ru,
    description_en,
    description_lv,
    description_ru,
    imagePath,
    isActive,
  } = req.body;
  const { id } = req.params;

  try {
    const category = await prisma.category.update({
      where: {
        id,
      },
      data: {
        name_en,
        name_lv,
        name_ru,
        description_en,
        description_lv,
        description_ru,
        imagePath,
        isActive,
      },
    });

    if (!category) {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Such category is not found" });
    }

    res.json(category);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
}

// Deletes the Category (keeps associated Products)
export async function deleteCategory(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const category = await prisma.category.delete({
      where: {
        id,
      },
    });
    res.json(category);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
}
