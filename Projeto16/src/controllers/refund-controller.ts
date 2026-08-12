import { coerce, z } from "zod";
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
      page: z.coerce.number().min(1).optional().default(1),
      perPage: z.coerce.number().min(1).max(100).optional().default(10),
    });

    const { name, page, perPage } = querySchema.parse(req.query);

    const skip = (page - 1) * perPage;

    const refunds = await prisma.refunds.findMany({
      skip,
      take: perPage,
      where: {
        user: {
          name: {
            contains: name,
          },
        },
      },

      orderBy: { createdAt: "desc" },

      include: {
        user: true,
      },
    });

    const totalRecords = await prisma.refunds.count({
      where: {
        user: {
          name: {
            contains: name,
          },
        },
      },
    });

    const totalPages = Math.ceil(totalRecords / perPage);

    return res.status(200).json({
      refunds,
      pagination: {
        page,
        perPage,
        totalRecords,
        totalPages: totalPages > 0 ? totalPages : 1,
      },
    });
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

  async show(req: Request, res: Response) {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    });

    const { id } = paramsSchema.parse(req.params);

    const refund = await prisma.refunds.findUnique({
      where: {
        id: id,
      },
      include: { user: true },
    });

    if (refund === null) {
      return res.json({ message: "UUID invalido" });
    }

    return res.json({ refund });
  }
}

export { RefundController };
