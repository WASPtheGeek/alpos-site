import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import jwt, { VerifyErrors } from "jsonwebtoken";
import { Prisma } from "../../prisma/generated/client";

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

// Verifies a JWT token
export function verifyToken(req: Request, res: Response, next: NextFunction) {
  const token = req.signedCookies.accessToken;

  if (token == null) {
    res.sendStatus(StatusCodes.UNAUTHORIZED);

    return;
  }

  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET!,
    (err: VerifyErrors | null, user: any) => {
      if (err) {
        res.status(StatusCodes.FORBIDDEN).json({ message: err.message });

        return;
      }

      req.user = user;
      next();
    }
  );
}

// Generates a 10 minutes valid access token
export function generateAccessToken(user: Prisma.UserCreateInput) {
  return jwt.sign(
    {
      userId: user.id,
      email: user.email,
      role: user.role,
    },
    process.env.ACCESS_TOKEN_SECRET!,
    { expiresIn: 60 * 10 } // 10 min
  );
}

// Generates a refresh token
export function generateRefreshToken(user: Prisma.UserCreateInput) {
  return jwt.sign(
    {
      userId: user.id,
      email: user.email,
      role: user.role,
    },
    process.env.REFRESH_TOKEN_SECRET!,
    { expiresIn: 86400 * 30 } // 30 days
  );
}
