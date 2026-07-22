import { Request, Response, NextFunction, response } from "express";
import { AppError } from "@/utils/appError";
import { ZodError } from "zod";

function errorHandling(
  error: any,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (error instanceof AppError) {
    return res.status(error.errorCode).json({ message: error.message });
  }
  
  if (error instanceof ZodError) {
    return res.status(400).json({
      message: "Validation error",
      issues: error.format(),
    });
  }

  return response.status(500).json({ message: error.message });
}

export { errorHandling };
