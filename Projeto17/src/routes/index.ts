import Router from "express";

import type { Request, Response } from "express";

const routes = Router();

routes.get("/health", async (req: Request, res: Response) => {
  return res.status(200).json({ message: "Server is running" });
});

export default routes;
