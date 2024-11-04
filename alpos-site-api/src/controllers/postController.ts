import { Request, Response } from "express";
import prisma from "../client";
import { StatusCodes } from "http-status-codes";

// Gets all the Posts
export async function getPosts(req: Request, res: Response) {
  try {
    const posts = await prisma.post.findMany({
      orderBy: {
        updatedAt: "desc",
      },
    });

    res.json(posts);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
}

// Gets active Posts
export async function getActivePosts(req: Request, res: Response) {
  try {
    const posts = await prisma.post.findMany({
      where: {
        isArchived: false,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });

    res.json(posts);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
}

// Gets archived Posts
export async function getArchivedPosts(req: Request, res: Response) {
  try {
    const posts = await prisma.post.findMany({
      where: {
        isArchived: true,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });

    res.json(posts);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
}

// Creates a new Post
export async function createPost(req: Request, res: Response) {
  const {
    title_en,
    title_lv,
    title_ru,
    description_en,
    description_lv,
    description_ru,
    content_en,
    content_lv,
    content_ru,
    isArchived,
  } = req.body;

  try {
    const post = await prisma.post.create({
      data: {
        title_en,
        title_lv,
        title_ru,
        description_en,
        description_lv,
        description_ru,
        content_en,
        content_lv,
        content_ru,
        isArchived,
      },
    });

    res.json(post);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
}

// Updates the Post
export async function updatePost(req: Request, res: Response) {
  const {
    title_en,
    title_lv,
    title_ru,
    description_en,
    description_lv,
    description_ru,
    content_en,
    content_lv,
    content_ru,
    isArchived,
  } = req.body;
  const { id } = req.params;

  try {
    const post = await prisma.post.update({
      where: {
        id,
      },
      data: {
        title_en,
        title_lv,
        title_ru,
        description_en,
        description_lv,
        description_ru,
        content_en,
        content_lv,
        content_ru,
        isArchived,
      },
    });
    res.json(post);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
}

// Deletes the Post
export async function deletePost(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const post = await prisma.post.delete({
      where: {
        id,
      },
    });
    res.json(post);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
}

// Publishes the Post
export async function publishPost(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const posts = await prisma.post.update({
      where: {
        id,
      },
      data: {
        isArchived: false,
      },
    });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Archives the Post
export async function archivePost(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const posts = await prisma.post.update({
      where: {
        id,
      },
      data: {
        isArchived: true,
      },
    });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
