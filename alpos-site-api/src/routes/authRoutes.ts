import express from "express";
import { login, logout, updateToken, register } from "../controllers";
import { validate, verifyToken } from "../middlewares";
import { UserCreateInputSchema } from "../../prisma/generated/zod-schemas";

const authRouter = express.Router();

// Login endpoint
authRouter.post("/login", validate(UserCreateInputSchema), login);
// Register endpoint
authRouter.post(
  "/register",
  verifyToken,
  validate(UserCreateInputSchema),
  register
);
// Refresh the access token
authRouter.post("/refreshToken", updateToken);
// Logout & delete the refresh token
authRouter.delete("/logout", logout);

export default authRouter;
