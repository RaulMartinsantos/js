import { Request, Response } from "express";
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

    await prisma.deliveryLog.create({
      data: {
        deliveryId: delivery_id,
        description: description,
      },
    });

    return res.json({ message: "Ok!" });
  }
}

export { DeliveryLogsController };
