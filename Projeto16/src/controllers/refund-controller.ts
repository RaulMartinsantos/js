import { Request, Response } from "express";

class RefundController {
  async create(req: Request, res: Response) {
    return res.json("works!");
  }
}

export { RefundController };
