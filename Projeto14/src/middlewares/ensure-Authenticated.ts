import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

import { authConfig } from "@/configs/auth";
import { AppError } from "@/utils/appError";
import { prisma } from "@/database/prisma";

interface TokenPayload {
  sub: string;
}

async function ensureAuth(req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new AppError("JWT token not found", 401);
    }

    const [_, token] = authHeader.split(" ");

    const { sub: user_id } = verify(
      token,
      authConfig.jwt.secret,
    ) as TokenPayload;

    const updatedRole = await prisma.user.findUnique({
      where: {
        id: user_id,
      },
    });

    if (!updatedRole) {
      throw new AppError("User not found", 401);
    }

    req.user = {
      id: user_id,
      role: updatedRole.role,
    };

    return next();
  } catch (err) {
    throw new AppError("invalid jwt token", 401);
  }
}

export { ensureAuth };
