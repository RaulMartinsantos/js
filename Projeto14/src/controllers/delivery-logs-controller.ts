import { Request, response, Response } from "express";
import { AppError } from "@/utils/appError";
import { prisma } from "@/database/prisma";
import { z } from "zod";

class DeliveryLogsController {
  async create(req: Request, res: Response) {
    const bodySchema = z.object({
      delivery_id: z.string().uuid(),
      description: z.string().trim().min(1),
    });

    const { delivery_id, description } = bodySchema.parse(req.body);

    const delivery = await prisma.delivery.findUnique({
      where: { id: delivery_id },
    });

    if (!delivery) {
      throw new AppError("delivery not found", 404);
    }

    if (delivery.status === "processing") {
      throw new AppError("change status to shipped");
    }

    if (delivery.status === "delivered") {
      throw new AppError("this order has already delivered");
    }

    await prisma.deliveryLog.create({
      data: {
        deliveryId: delivery_id,
        description: description,
      },
    });

    return res.json({ message: "Ok!" });
  }

  async show(req: Request, res: Response) {
    const paramsSchema = z.object({
      delivery_id: z.string().uuid(),
    });

    const { delivery_id } = paramsSchema.parse(req.params);

    const delivery = await prisma.delivery.findUnique({
      where: { id: delivery_id },
      include: {
        logs: { select: { description: true } },
        user: { select: { name: true } },
      },
    });

    if (req.user?.role == "customer" && req.user?.id !== delivery?.userId) {
      throw new AppError("An user can only see their owns deliveries");
    }

    return res.json({ delivery });
  }
}

export { DeliveryLogsController };
