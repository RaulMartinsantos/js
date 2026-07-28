import { Request, Response } from "express";
import { authConfig } from "@/configs/auth";
import { AppError } from "@/utils/appError";
import { prisma } from "@/database/prisma";
import { sign } from "jsonwebtoken";
import { compare } from "bcrypt";
import { z } from "zod";

class SessionController {
  async create(req: Request, res: Response) {
    const BodySchema = z.object({
      email: z.string().toLowerCase().max(254).email(),
      password: z.string().min(6),
    });

    const { email, password } = BodySchema.parse(req.body);

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      throw new AppError("Invalid email or password", 401);
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError("Invalid email or password", 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({ role: user.role ?? "customer" }, secret, {
      subject: user.id,
      expiresIn,
    });

    const { password: _, ...UserWithoutPassword } = user;

    return res.json({ token, user: UserWithoutPassword });
  }
}

export { SessionController };
