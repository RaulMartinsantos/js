import { NextFunction, Request, Response } from "express";
import { db } from "@/database/knex.js";
import { z } from "zod";
import { AppError } from "@/utils/appError.js";
class ProductController {
  async index(request: Request, response: Response, next: NextFunction) {
    try {
      const { name } = request.query;

      const products = await db<ProductRepository>("products")
        .select()
        .whereLike("name", `%${name ?? ""}%`)
        .orderBy("id");

      return response.json(products);
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

  async update(request: Request, response: Response, next: NextFunction) {
    try {
      const id = z
        .string()
        .transform((value) => Number(value))
        .refine((value) => !isNaN(value), { message: "Id must be an number" })
        .parse(request.params.id);

      const bodySchema = z.object({
        name: z.string({ required_error: "Name is required!" }).trim().min(4),
        price: z.number().gt(0),
      });

      const { name, price } = bodySchema.parse(request.body);

      const product = await db<ProductRepository>("products")
        .select()
        .where({ id })
        .first();

      if (!product) {
        throw new AppError("product not found");
      }

      await db<ProductRepository>("products")
        .update({ name, price, updated_at: db.fn.now() })
        .where({ id });

      return response.json({ message: "Updated" });
    } catch (err) {
      next(err);
    }
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    try {
      const { id } = z
        .object({
          id: z.coerce.number(),
        })
        .parse(request.params);

      await db<ProductRepository>("products").where({ id }).delete();

      return response.json({ message: "Deleted" });
    } catch (err) {
      next(err);
    }
  }
}

export { ProductController };
