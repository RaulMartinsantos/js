import { NextFunction, Request, Response } from "express";
import { db } from "@/database/knex.js";
import { z } from "zod";
class ProductController {
  async index(request: Request, response: Response, next: NextFunction) {
    try {
      return response.json({ message: "Ok!" });
    } catch (err) {
      next(err);
    }
  }

  async create(request: Request, response: Response, next: NextFunction) {
    try {
      const bodySchema = z.object({
        name: z.string({ required_error: "Name is required!" }).trim().min(4),
        price: z.number().gt(0),
      });

      const { name, price } = bodySchema.parse(request.body);

      await db<ProductRepository>("products").insert({ name, price });

      return response.status(201).json({ name, price });
    } catch (err) {
      next(err);
    }
  }
}

export { ProductController };
