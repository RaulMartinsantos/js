import { Request, Response } from "express";
import { AppError } from "../utils/AppError.js";
import { z } from "zod";

class ProductsController {
  //Index = Get para listar vários registros
  //Show = Get para exibir um registro especifico
  //Create = Post para criar um registro
  //Update = Put para atualizar um registro
  //Remove = Delete para deletar um registro

  index(request: Request, response: Response) {
    const { page, limit } = request.query;
    const { id } = request.params;

    response.send(`Página ${page}, de ${limit}, Id ${id}`);
  }

  create(request: Request, response: Response) {
    const bodySchema = z.object({
      name: z
        .string({ required_error: "Name is required" })
        .trim()
        .min(6, { message: "Name must have 6 characters" }),
      price: z
        .number({ required_error: "Price is required" })
        .positive({ message: "Price must be positive" })
        .gte(5, { message: "Value must be at least 5" }),
    });

    const { name, price } = bodySchema.parse(request.body); 

    /*
    if (!name) {
      throw new AppError("Nome do produto obrigatório!");
    }

    if (name.trim().length < 5) {
      throw new AppError(
        "O nome do produto precisa ter pelo menos 6 caracteres",
      );
    }

    if (!price) {
      throw new AppError("Preço do produto obrigatório!");
    }

    if (price < 0) {
      throw new AppError("O preço do produto precisa ser maior do que 1");
    }
      */

    response.status(201).json({ name, price, user_id: request.user_id });
  }
}

export { ProductsController };
