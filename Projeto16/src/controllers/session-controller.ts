import { z } from "zod";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { prisma } from "@/database/prisma";
import { authConfig } from "@/config/auth";
import { AppError } from "@/utils/AppError";
import { Request, Response } from "express";

class SessionsController {
  async create(req: Request, res: Response) {
    const dummy_hash =
      "$2y$10$z0wevCGuKLEd7MdltcP0BuRdoWDxJW3WBoTIbN0lg9YLu.qvVkiba";

    const bodySchema = z.object({
      email: z.string().email({ message: "Email inválido" }),
      password: z.string(),
    });

    const { email, password } = bodySchema.parse(req.body);

    const user = await prisma.user.findUnique({ where: { email } });

    const passwordHash = user?.password ?? dummy_hash;

    const passwordMatches = await compare(password, passwordHash);

    if (!user || !passwordMatches) {
      throw new AppError("Email ou senha incorretos", 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({ role: user.role }, secret, {
      subject: user.id,
      expiresIn: expiresIn,
    });

    const { password: _, ...userWithoutPassword } = user;

    res.json({ token, userWithoutPassword });
  }
}

export { SessionsController };
