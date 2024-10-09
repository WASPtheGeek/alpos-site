import express from "express";
import { getCurrentUser } from "../controllers";
import { verifyToken } from "../middlewares";

const userRouter = express.Router();

// Get authentificated user
userRouter.post("/current", verifyToken, getCurrentUser);

export default userRouter;
