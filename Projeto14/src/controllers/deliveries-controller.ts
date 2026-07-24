import { Request, Response } from "express";

class DeliversController {
  create(req: Request, res: Response) {
    return res.json({ message: "ok!" });
  }
}

export { DeliversController };
