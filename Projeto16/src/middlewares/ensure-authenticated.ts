import { verify } from "jsonwebtoken";
import { authConfig } from "@/config/auth";
import { AppError } from "@/utils/AppError";
import { Request, Response, NextFunction } from "express";

interface TokenPayload {
  role: string;
  sub: string;
}

function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new AppError("JWT Token não encontrado", 401);
    }

    const [_, token] = authHeader.split(" ");

    const { role, sub: user_id } = verify(
      token,
      authConfig.jwt.secret,
    ) as TokenPayload;

    req.user = {
      id: user_id,
      role: role,
    };

    return next();
  } catch (err) {
    throw new AppError("JWT Token invalido", 401);
  }
}

export { ensureAuthenticated };
