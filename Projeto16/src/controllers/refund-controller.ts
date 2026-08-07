import { z } from "zod";
import { prisma } from "@/database/prisma";
import { Request, Response } from "express";
import { AppError } from "@/utils/AppError";

const CategoryEnums = z.enum([
  "food",
  "other",
  "services",
  "transport",
  "accommodation",
]);

class RefundController {
  async index(req: Request, res: Response) {
    const querySchema = z.object({
      name: z.string().optional().default(""),
    });

    const { name } = querySchema.parse(req.query);

    const refunds = await prisma.refunds.findMany({
      where: {
        user: {
          name: {
            contains: name.trim(),
          },
        },
      },

      orderBy: { createdAt: "desc" },

      include: {
        user: true,
      },
    });

    return res.status(200).json(refunds);
  }

  async create(req: Request, res: Response) {
    const bodySchema = z.object({
      name: z
        .string()
        .trim()
        .min(1, { message: "Informe o nome da solicitação" }),
      category: CategoryEnums,
      amount: z.number().positive({ message: "Digite um valor valido" }),
      filename: z.string().min(20),
    });

    const { name, category, amount, filename } = bodySchema.parse(req.body);

    if (!req.user?.id) {
      throw new AppError("Não autorizado", 401);
    }

    const refund = await prisma.refunds.create({
      data: {
        name: name,
        category: category,
        amount: amount,
        filename: filename,
        userID: req.user.id,
      },
    });

    return res.status(201).json(refund);
  }
}

export { RefundController };
