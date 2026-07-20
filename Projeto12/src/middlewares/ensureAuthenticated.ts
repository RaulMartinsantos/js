import { AppError } from "@/utils/AppError";
import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { authConfig } from "@/configs/auth";

interface TokenPayload {
  role: string;
  sub: string;
}

function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError("User not authenticated", 401);
  }

  const [, token] = authHeader.split(" ");

  const { sub: user_id, role } = verify(
    token,
    authConfig.jwt.secret,
  ) as TokenPayload;

  req.user = {
    id: String(user_id),
    role,
  };


  return next();
}

export { ensureAuthenticated };
