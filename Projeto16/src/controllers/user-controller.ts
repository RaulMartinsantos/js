import { z } from "zod";
import { hash } from "bcrypt";
import { UserRole } from "@prisma/client";
import { prisma } from "@/database/prisma";
import { AppError } from "@/utils/AppError";
import { Request, Response } from "express";

class UsersController {
  async create(req: Request, res: Response) {
    const bodySchema = z.object({
      name: z.string().trim().min(2, { message: "Nome é obrigatório" }),
      email: z
        .string()
        .trim()
        .toLowerCase()
        .email({ message: "email inválido" }),
      password: z
        .string()
        .min(6, { message: "Senha precisa ter 6 carácteres ou mais" }),
      role: z
        .enum([UserRole.employee, UserRole.manager])
        .default(UserRole.employee),
    });

    const { name, email, password, role } = bodySchema.parse(req.body);

    const userWithSameEmail = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (userWithSameEmail) {
      throw new AppError("Email já cadastrado");
    }

    const hashedPassword = await hash(password, 10);

    await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword,
        role: role,
      },
    });

    return res.status(201).json({ message: "Usuário criado" });
  }
}

export { UsersController };
