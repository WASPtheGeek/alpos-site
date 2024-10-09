import express from "express";
import {
  PostCreateInputSchema,
  PostUpdateInputSchema,
} from "../../prisma/generated/zod-schemas";
import {
  archivePost,
  createPost,
  deletePost,
  getActivePosts,
  getArchivedPosts,
  getPosts,
  publishPost,
  updatePost,
} from "../controllers";
import { validate, verifyToken } from "../middlewares";

const postRouter = express.Router();

/** Public */

// Gets published posts
postRouter.get("/active", getActivePosts);

/** Requires auth */

// Gets archived posts
postRouter.get("/archived", verifyToken, getArchivedPosts);

// Gets all posts
postRouter.get("/", verifyToken, getPosts);

// Creates a new post
postRouter.post("/", verifyToken, validate(PostCreateInputSchema), createPost);

// Updates the post
postRouter.put(
  "/:id",
  verifyToken,
  validate(PostUpdateInputSchema),
  updatePost
);

// Publishes the post
postRouter.put("/publish/:id", verifyToken, publishPost);

// Archives the post
postRouter.put("/archive/:id", verifyToken, archivePost);

// Deletes the post
postRouter.delete("/:id", verifyToken, deletePost);

export default postRouter;
