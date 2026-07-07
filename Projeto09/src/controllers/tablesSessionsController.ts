import { Request, Response, NextFunction } from "express";
import { AppError } from "@/utils/appError.js";
import { db } from "@/database/knex.js";
import { z } from "zod";

class TablesSessionsController {
  async index(request: Request, response: Response, next: NextFunction) {
    try {
      const sessions =
        await db<TablesSessionsRepository>("tables_sessions").orderBy(
          "closed_at",
        );

      return response.json(sessions);
    } catch (err) {
      next(err);
    }
  }

  async create(request: Request, response: Response, next: NextFunction) {
    try {
      const bodySchema = z.object({
        table_id: z.number(),
      });

      const { table_id } = bodySchema.parse(request.body);

      const session = await db<TablesSessionsRepository>("tables_sessions")
        .where({ table_id })
        .orderBy("opened_at", "desc")
        .first();

      if (session && !session.closed_at) {
        throw new AppError("This table is already opened");
      }

      await db<TablesSessionsRepository>("tables_sessions").insert({
        table_id,
        opened_at: db.fn.now(),
      });

      return response.status(201).json({ message: "Works!" });
    } catch (err) {
      next(err);
    }
  }

  async update(request: Request, response: Response, next: NextFunction) {
    try {
      const id = z
        .string()
        .transform((value) => Number(value))
        .refine((value) => !isNaN(value), { message: "Id must be a number" })
        .parse(request.params.id);

      const session = await db<TablesSessionsRepository>("tables_sessions")
        .where({
          id,
        })
        .first();

      if (!session) {
        throw new AppError("Session table not found");
      }

      if (session.closed_at) {
        throw new AppError("This session table is already closed");
      }

      await db<TablesSessionsRepository>("tables_sessions")
        .update({
          closed_at: db.fn.now(),
        })
        .where({ id });

      return response.json({ message: `Table ${id} closed` });
    } catch (err) {
      next(err);
    }
  }
}

export { TablesSessionsController };
