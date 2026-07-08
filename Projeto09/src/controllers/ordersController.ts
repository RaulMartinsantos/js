import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { db } from "@/database/knex.js";
import { AppError } from "@/utils/appError.js";

class OrdersController {
  async index(request: Request, response: Response, next: NextFunction) {
    try {
      const { table_session_id } = request.params;
      const order = await db("orders")
        .select(
          "orders.id",
          "orders.tables_session_id",
          "orders.product_id",
          "products.name",
          "orders.price",
          "orders.quantity",
          db.raw("(orders.price * orders.quantity) AS Total"),
          "orders.created_at",
          "orders.updated_at",
        )
        .orderBy("orders.created_at", "desc")
        .join("products", "products.id", "orders.product_id")
        .where({ tables_session_id: table_session_id });

      if (order.length === 0) {
        throw new AppError("This order does not exists");
      }

      return response.json(order);
    } catch (err) {
      next(err);
    }
  }

  async create(request: Request, response: Response, next: NextFunction) {
    try {
      const bodySchema = z.object({
        tables_session_id: z.number(),
        product_id: z.number(),
        quantity: z.number(),
      });

      const { tables_session_id, product_id, quantity } = bodySchema.parse(
        request.body,
      );

      const session = await db<TablesSessionsRepository>("tables_sessions")
        .where({ id: tables_session_id })
        .first();

      if (!session) {
        throw new AppError("Invalid session");
      }

      if (session.closed_at) {
        throw new AppError("This table is closed");
      }

      const product = await db<ProductRepository>("products")
        .where({ id: product_id })
        .first();

      if (!product) {
        throw new AppError("This product does not exists");
      }

      await db<OrderRepository>("orders").insert({
        product_id,
        tables_session_id,
        quantity,
        price: product.price,
      });

      return response.status(201).json(product);
    } catch (err) {
      next(err);
    }
  }

  async show(request: Request, response: Response, next: NextFunction) {
    try {
      const { table_session_id } = request.params;

      const order = await db("orders")
        .select(
          db.raw(
            "ROUND(COALESCE(SUM(orders.price * orders.quantity), 0), 2) AS Total",
          ),
        )
        .select(db.raw("ROUND(COALESCE(SUM(orders.quantity), 0), 2) AS Quantity"))
        .where({ tables_session_id: table_session_id })
        .first();

      return response.json({ order });
    } catch (err) {
      next(err);
    }
  }
}

export { OrdersController };
