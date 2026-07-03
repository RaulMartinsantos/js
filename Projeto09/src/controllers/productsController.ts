import { NextFunction, Request, Response } from "express";
import { AppError } from "@/utils/appError.js";

class ProductController {
  async index(request: Request, response: Response, next: NextFunction) {
    try {
      return response.json({ message: "Ok!" });
    } catch (err) {
      next(err);
    }
  }
}

export { ProductController };
