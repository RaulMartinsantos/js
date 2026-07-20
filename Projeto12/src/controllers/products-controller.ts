import { Request, Response } from "express";

class ProductsController {
  async index(request: Request, response: Response) {
    return response.json({ message: "Works!" });
  }

  async create(request: Request, response: Response) {
    return response.json({ message: "Works!" });
  }
}

export { ProductsController };
