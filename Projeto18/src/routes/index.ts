import { Router, type Request, type Response } from "express";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  return res.json({ message: "Testes express" });
});

export default router;
