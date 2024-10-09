import express from "express";
import { login, logout, updateToken, register } from "../controllers";
import { validate } from "../middlewares";
import { UserCreateInputSchema } from "../../prisma/generated/zod-schemas";

const authRouter = express.Router();

// Login endpoint
authRouter.post("/login", validate(UserCreateInputSchema), login);
// Register endpoint
// todo: make sure only admin can register a new user
authRouter.post("/register", validate(UserCreateInputSchema), register);
// Refresh the access token
authRouter.post("/refreshToken", updateToken);
// Logout & delete the refresh token
authRouter.delete("/logout", logout);

export default authRouter;
