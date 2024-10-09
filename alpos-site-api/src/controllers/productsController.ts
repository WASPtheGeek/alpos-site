import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import i18next from "i18next";
import prisma from "../client";
import { ProductViewModel } from "../models";

// Gets the localized Product by id
export async function getProduct(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const p = await prisma.product.findUnique({
      where: {
        id,
      },
    });

    if (!p) {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Such product is not found" });

      return;
    }

    const currentLang = i18next.language;
    const mappedItem: ProductViewModel = {
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
    } as ProductViewModel;

    res.json(mappedItem);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
}

// Gets the full Product by id
export async function getFullProduct(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const p = await prisma.product.findUnique({
      where: {
        id,
      },
    });

    res.json(p);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
}

// Gets all Products
export async function getProducts(req: Request, res: Response) {
  try {
    const products = await prisma.product.findMany({
      orderBy: {
        updatedAt: "desc",
      },
    });

    res.json(products);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
}

// Creates a new Product & assignes it to Category if provided
export async function createProduct(req: Request, res: Response) {
  const {
    name_en,
    name_lv,
    name_ru,
    description_en,
    description_lv,
    description_ru,
    manufacturer,
    filePath,
    imagePath,
    price,
    priceExcludingVAT,
    categoryId,
    country,
    isActive,
    isAvailable,
  } = req.body;

  try {
    const product = await prisma.product.create({
      data: {
        name_en,
        name_lv,
        name_ru,
        description_en,
        description_lv,
        description_ru,
        manufacturer,
        filePath,
        imagePath,
        price,
        priceExcludingVAT,
        categoryId,
        country,
        isActive,
        isAvailable,
      },
    });

    res.json(product);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
}

// Updates the Product
export async function updateProduct(req: Request, res: Response) {
  const {
    name_en,
    name_lv,
    name_ru,
    description_en,
    description_lv,
    description_ru,
    manufacturer,
    filePath,
    imagePath,
    price,
    priceExcludingVAT,
    categoryId,
    country,
    isActive,
    isAvailable,
  } = req.body;
  const { id } = req.params;

  try {
    const product = await prisma.product.update({
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
        manufacturer,
        filePath,
        imagePath,
        price,
        priceExcludingVAT,
        categoryId,
        country,
        isActive,
        isAvailable,
      },
    });

    if (!product) {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Such product is not found" });
    }

    res.json(product);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
}

// Deletes the Product
export async function deleteProduct(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const product = await prisma.product.delete({
      where: {
        id,
      },
    });
    res.json(product);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
}
