import { Router, Response } from "express";

const routes = Router();

routes.get("/", (res: Response) => {
  return res.json({ message: `Works!` });
});

export { routes };
