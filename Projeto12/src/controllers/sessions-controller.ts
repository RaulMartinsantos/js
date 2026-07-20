import { Request, Response } from "express";
import { AppError } from "@/utils/AppError";
import { authConfig } from "@/configs/auth";
import { sign } from "jsonwebtoken";

class SessionsController {
  async create(request: Request, response: Response) {
    const { userName, password } = request.body;

    const fakeUser = {
      id: "1",
      userName: "maria",
      password: "password",
      role: "customer",
    };

    if (userName !== fakeUser.userName || password !== fakeUser.password) {
      throw new AppError("Usuário e/ou senha incorretos", 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({ role: fakeUser.role }, secret, {
      expiresIn,
      subject: String(fakeUser.id),
    });

    return response.json({ token });
  }
}

export { SessionsController };
