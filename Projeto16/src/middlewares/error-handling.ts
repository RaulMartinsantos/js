import { ZodError } from "zod";
import { AppError } from "@/utils/AppError";
import { ErrorRequestHandler } from "express";

const errorHandling: ErrorRequestHandler = (error, req, res, next) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({ message: error.message });
  }

  if (error instanceof ZodError) {
    return res.status(400).json({
      message: "Validation error",
      issue: error.format(),
    });
  }
};

export { errorHandling };
