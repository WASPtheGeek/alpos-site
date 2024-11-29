import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import jwt, { VerifyErrors } from "jsonwebtoken";
import prisma from "../client";
import { generateAccessToken, generateRefreshToken } from "../middlewares";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../configs/constants";

// Refresh expired access token
export async function updateToken(req: Request, res: Response) {
  const token = req.signedCookies.refreshToken;

  if (token === null) {
    res.sendStatus(StatusCodes.UNAUTHORIZED);

    return;
  }

  try {
    const refreshToken = await prisma.token.findUnique({
      where: {
        value: token,
      },
    });

    if (!refreshToken) {
      res.sendStatus(StatusCodes.FORBIDDEN);

      return;
    }

    jwt.verify(
      refreshToken.value,
      process.env.REFRESH_TOKEN_SECRET!,
      (err: VerifyErrors | null, user: any) => {
        if (err) {
          res.status(StatusCodes.FORBIDDEN).json({ message: err.message });

          return;
        }

        const accessToken = generateAccessToken(user);

        if (!accessToken) {
          res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);

          return;
        }

        res.cookie(ACCESS_TOKEN, accessToken, {
          httpOnly: true,
          secure: true,
          domain: "localhost",
          path: "/",
          signed: true,
        });

        res.sendStatus(StatusCodes.OK);
      }
    );
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
}

// Register a new user
export async function register(req: Request, res: Response) {
  const { email, password } = req.body;
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPwd = await bcrypt.hash(password, salt);

    // default user with role=USER
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPwd,
      },
    });

    res.status(StatusCodes.CREATED).json({
      email: user.email,
    });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
}

// Authenticate User
export async function login(req: Request, res: Response) {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: `The user with email ${email} is not found` });

      return;
    }

    // validate password
    const isMatch = bcrypt.compare(password, user.password);

    if (!isMatch) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Invalid credentials" });

      return;
    }

    // create access token and refresh token
    const accessToken = generateAccessToken(user);

    if (!accessToken) {
      res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);

      return;
    }

    // find an existing refresh token
    let token = await prisma.token.findUnique({
      where: {
        userId: user.id,
      },
    });

    let refreshToken = token?.value;

    if (!refreshToken) {
      // create a new refresh token
      refreshToken = generateRefreshToken(user);

      if (!refreshToken) {
        res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);

        return;
      }

      token = await prisma.token.create({
        data: {
          value: refreshToken,
          userId: user.id,
        },
      });
    }

    if (!token) {
      res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);

      return;
    }

    res.cookie(ACCESS_TOKEN, accessToken, {
      httpOnly: true,
      secure: true,
      domain: "localhost",
      path: "/",
      signed: true,
    });

    res.cookie(REFRESH_TOKEN, token.value, {
      httpOnly: true,
      secure: true,
      path: "/",
      signed: true,
    });

    res.json({
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
}

// Logout & delete the refresh token
export async function logout(req: Request, res: Response) {
  try {
    const token = req.signedCookies.refreshToken;

    if (!token) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "No token provided" });
    }

    await prisma.token.delete({
      where: {
        value: token,
      },
    });

    res.clearCookie(ACCESS_TOKEN);
    res.clearCookie(REFRESH_TOKEN);

    res.sendStatus(StatusCodes.NO_CONTENT);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
}
