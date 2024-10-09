import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ZodError } from "zod";

export function validate(schema: Zod.ZodType<any>) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (!(error instanceof ZodError)) return;

      const errorMessages = error.errors.map((e) => ({
        field: e.path,
        message: e.message,
      }));

      res.status(StatusCodes.BAD_REQUEST).json({
        error: "Invalid data",
        details: errorMessages,
      });
    }
  };
}
