import { AppError } from "@/utils/appError.js";
import { Request, Response, NextFunction } from "express";

export function errorHandling(
  error: any,
  request: Request,
  response: Response,
  _: NextFunction,
) {
  if (error instanceof AppError) {
    return response.status(error.statuscode).json({ message: error.message });
  }

  return response.status(500).json({ message: error.message });
}
