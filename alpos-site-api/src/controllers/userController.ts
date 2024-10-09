import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import prisma from "../client";

// Get authentificated user
export async function getCurrentUser(req: Request, res: Response) {
  try {
    // Assume that user is already verified
    if (!req.user?.userId) {
      res.sendStatus(StatusCodes.UNAUTHORIZED);

      return;
    }

    const user = await prisma.user.findUnique({
      where: {
        id: req.user.userId,
      },
    });

    if (!user) {
      res.sendStatus(StatusCodes.NOT_FOUND);

      return;
    }

    const { password, ...data } = user;

    res.json({ user: data });
  } catch (e) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      message: e.message,
    });

    return;
  }
}
